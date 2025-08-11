from rest_framework import serializers
from .models import ContactRequest

class ContactRequestV1Serializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'
