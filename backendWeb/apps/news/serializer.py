from rest_framework.serializers import ModelSerializer
from .models import NewsArticle, Source, CustomUser
from rest_framework import serializers
from apps.comments.models import Comment
from apps.comments.serializer import CommentsV1Serializer
from datetime import datetime, timedelta
from apps.utils import datetimeFormat
class SourceV1Serializer(ModelSerializer):
    class Meta:
        model = Source
        fields = ['url']




class ListNewsV1Serializer(ModelSerializer):
    author_name = serializers.SerializerMethodField()
    province_name = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'author_name', 'created_at', 'thumbnail', 'province_name', 'province', 'introduction', 'views']
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
    comments = CommentsV1Serializer(many=True, read_only=True)
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'content', 'author_name', 'created_at', 'updated_at', 'is_checked', 'is_approved', 'sources', 'comments', 'province']
        read_only_fields = ('id', 'created_at', 'updated_at', 'comments', 'author_name')
        depth = 1

    
    def get_author_name(self, obj):
        return obj.author.get_full_name()
    
    def get_sources(self, obj):
        return SourceV1Serializer(obj.sources, many=True).data
    

    def get_comments(self, obj):
        return CommentsV1Serializer(obj.comments, many=True).data
    
    def create(self, validated_data):
        newsArticle = super().create(validated_data)
        return newsArticle