from rest_framework import serializers
from .models import ContactRequest

class ContactRequestV1Serializer(serializers.ModelSerializer):

    # user not required
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ContactRequest
        fields = ['id', 'user', 'property', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
        
