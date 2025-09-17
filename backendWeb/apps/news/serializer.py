from rest_framework.serializers import ModelSerializer
from .models import NewsArticle, Source, Comment, CustomUser
from rest_framework import serializers

class SourceV1Serializer(ModelSerializer):
    class Meta:
        model = Source
        fields = ['url']

class CommentV1Serializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ListNewsV1Serializer(ModelSerializer):
    author_name = serializers.SerializerMethodField()
    province_name = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'author_name', 'created_at', 'thumbnail', 'province_name', 'province', 'introduction']
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def get_author_name(self, obj):
        return obj.author.get_full_name()
    
    def get_province_name(self, obj):
        return obj.province.name if obj.province else None
    

class NewsV1Serializer(ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class NewsDetailV1Serializer(ModelSerializer):
    sources = SourceV1Serializer(many=True, required=True)
    comments = CommentV1Serializer(many=True, read_only=True)
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'content', 'author_name', 'created_at', 'updated_at', 'is_checked', 'is_approved', 'sources', 'comments', 'province']
        read_only_fields = ('id', 'created_at', 'updated_at', 'comments')
        depth = 1

    
    def get_author_name(self, obj):
        return obj.author.get_full_name()
    
    def get_sources(self, obj):
        return SourceV1Serializer(obj.sources, many=True).data
    

    def get_comments(self, obj):
        return CommentV1Serializer(obj.comments, many=True).data
    
    def create(self, validated_data):
        newsArticle = super().create(validated_data)
        return newsArticle