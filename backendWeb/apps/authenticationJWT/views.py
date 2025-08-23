from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from .serializer import CustomTokenObtainPairSerializer, ForgotPasswordSerializer, ChangePasswordSerializer
from apps.accounts.models import CustomUser as User
from apps.accounts.views import CustomUserListView, CustomUserDetailView
from django.core.mail import send_mail
import random
from django.contrib.auth.signals import user_logged_in
from apps.predicts.models import Dashboard
from apps.accounts.serializer import CustomUserV1Serializer


class CreateUserView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = CustomUserV1Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            try:
                dashboard = Dashboard.objects.create(user=serializer.instance)
                dashboard.save()
            except Exception as e:
                return Response({'message': 'Error created dashboard, please contact admin to assit.', 'errors': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'User created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'User creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            # Handle password reset logic
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                new_password = ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=10))
                user.set_password(new_password)
                user.save()
                send_mail(
                    'Password Reset',
                    f'Your new password is: {new_password}',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return Response({"detail": "Password reset email sent."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated)

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({"Error": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)