from rest_framework import serializers
from .models import Comment
from datetime import datetime, timedelta
from apps.utils import datetimeFormat
from zoneinfo import ZoneInfo

class CommentsV1Serializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    author_username = serializers.SerializerMethodField()   
    time = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['id', 'article', 'time', 'author', 'answer', 'author_username', 'content', 'author_avatar', 'replies']
        read_only_fields = ('id', 'time', 'replies', 'author_username', 'author_avatar')
        extra_kwargs = {
            'article': {'required': True},
            'author': {'required': False},
            'content': {'required': True},
            'answer': {'required': False, 'allow_null': True},
            'is_deleted': {'required': False, 'default': False}
        }

    def create(self, validated_data):
        content = validated_data.get('content', '').strip()
        if len(content) == 0:
            raise serializers.ValidationError("Content cannot be empty or just whitespace.")
        return super().create(validated_data)

    def get_replies(self, obj):
        replies = obj.replies.filter(is_deleted=False)
        return CommentsV1Serializer(replies, many=True).data

    def get_author_username(self, obj):
        return obj.author.username
    
    def get_author_avatar(self, obj):
        if obj.author.avatar:
            return obj.author.avatar.url
        return None

    def get_time(self, obj):
        # Lấy thời gian hiện tại
        now = datetime.now()
        # now = datetime.now().astimezone()
        print("Current time:", now)
        print("Object created_at:", obj.created_at)
        
        # Tính toán thời gian đã trôi qua so với thời điểm đăng
        delta = now - datetimeFormat(str(obj.created_at)) - timedelta(hours=7)

        # Trả về thời gian đã trôi qua theo dạng phù hợp
        if delta.days > 0:
            return f"{delta.days} ngày trước"
        elif delta.seconds // 3600 > 0:
            return f"{delta.seconds // 3600} giờ trước"
        elif delta.seconds // 60 > 0:
            return f"{delta.seconds // 60} phút trước"
        else:
            return f"{delta.seconds} giây trước"