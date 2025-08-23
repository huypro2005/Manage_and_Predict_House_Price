from rest_framework import serializers
from apps.accounts.models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from apps.accounts.signal.signal_login import user_logged_in

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        user_logged_in.send(sender=user.__class__, request=self.context['request'], user=user)
        refresh = self.get_token(user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)