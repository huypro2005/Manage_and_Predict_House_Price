from rest_framework import serializers
from .models import Property, FavouriteProperty


class FavouritePropertyV1Serializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteProperty
        fields = ['id', 'user', 'property', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        favouriteProperty = super().create(validated_data)
        return favouriteProperty