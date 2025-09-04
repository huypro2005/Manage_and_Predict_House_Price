from rest_framework.serializers import ModelSerializer
from .models import Notification


class NotificationV1Serializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        return Notification.objects.create(**validated_data)