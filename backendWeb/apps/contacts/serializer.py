from rest_framework import serializers
from apps.properties.serializer import PropertyV1Serializer
from .models import ContactRequest

class ContactRequestV1Serializer(serializers.ModelSerializer):

    property = PropertyV1Serializer(read_only=True)
    from_username = serializers.CharField(source='user.username', read_only=True)
    type = serializers.CharField(default='contact_request', read_only=True)
    timestamp = serializers.DateTimeField(source='created_at', read_only=True)


    class Meta:
        model = ContactRequest
        fields = ['type', 'property', 'message', 'created_at', 'from_username', 'timestamp']
        read_only_fields = ['created_at', 'from_username', 'timestamp']
