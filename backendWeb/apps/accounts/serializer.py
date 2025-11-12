from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password
from apps.utils import upload_to_app_model

class CustomUserV1Serializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'phone', 'avatar', 'birth_date', 'is_active', 'is_verified', 'created', 'updated', 'description']
        read_only_fields = ['id', 'is_active', 'is_verified', 'created', 'updated']
        extra_kwargs = {'password': {'write_only': True, 'required': False},
                        'email': {'required': False},
                        'avatar': {'required': False, 'allow_null': True, 'use_url': True},
                        'username': {'required': False},
                        'description': {'required': False, 'allow_blank': True, 'default': ''},
                        'first_name': {'required': False},
                        'last_name': {'required': False},
                        'phone': {'required': False}
                       }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CustomUserUpdateAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['avatar']

    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance