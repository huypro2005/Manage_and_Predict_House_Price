from rest_framework import serializers
from .models import Property, FavouriteProperty
from apps.properties.serializer import PropertyDetailV1Serializer


class FavouritePropertyV1Serializer(serializers.ModelSerializer):
    property_detail = serializers.SerializerMethodField()
    class Meta:
        model = FavouriteProperty
        fields = ['id', 'user', 'property_detail', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    def get_property_detail(self, obj):
        return PropertyDetailV1Serializer(obj.property).data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        favouriteProperty = super().create(validated_data)
        return favouriteProperty

class FavouritePropertyV2Serializer(serializers.ModelSerializer):
    property_detail = serializers.SerializerMethodField()

    class Meta:
        model = FavouriteProperty
        fields = ['id', 'user', 'property', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']



    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        favouriteProperty = super().create(validated_data)
        return favouriteProperty