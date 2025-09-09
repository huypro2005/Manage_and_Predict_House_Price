from rest_framework.serializers import ModelSerializer
from .models import Notification, Range


class RangeSerializer(ModelSerializer):
    class Meta:
        model = Range
        fields = ['offset', 'length']


class NotificationV1Serializer(ModelSerializer):
    ranges = RangeSerializer(many=True, read_only=True, source='highlight_ranges')
    class Meta:
        model = Notification
        fields = ['id', 'user', 'type', 'message', 'is_read', 'url', 'created_at', 'is_deleted', 'image_representation', 'ranges']
        read_only_fields = ['id', 'created_at', 'is_read', 'is_deleted', 'ranges']

    def create(self, validated_data):
        return Notification.objects.create(**validated_data)