from rest_framework import serializers
from .models import PropertyType, Province, District, Attribute, PropertyType_Attribute

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


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['id', 'name', 'unit']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active', 'deleted_at']


class PropertyTypeAttributeSerializer(serializers.ModelSerializer):
    attribute = AttributeSerializer(read_only=True)

    class Meta:
        model = PropertyType_Attribute
        fields = ['id', 'property_type', 'attribute']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active', 'deleted_at']