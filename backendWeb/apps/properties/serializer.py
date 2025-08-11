from rest_framework import serializers
from .models import Property, PropertyImage



class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = '__all__'

class PropertyV1Serializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = '__all__'


class PropertyDetailV1Serializer(serializers.ModelSerializer):

    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = '__all__'