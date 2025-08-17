from rest_framework import serializers
from .models import PropertyType, Province, District

class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = ['id', 'name', 'code']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active', 'deleted_at']

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ['id', 'name', 'code']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active', 'deleted_at']

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name', 'code']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active', 'deleted_at']