from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from apps.permission import AdminGetListOrUserCreateAccountPermission
from .models import CustomUser
from apps.predicts.models import Dashboard
from django.http import Http404
from .serializer import CustomUserV1Serializer, CustomUserUpdateAvatarSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.cache import cache
# Create your views here.


class CustomUserListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserV1Serializer(users, many=True)
        return Response({'message': 'User list retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CustomUserV1Serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            try:
                dashboard = Dashboard.objects.create(user=serializer.instance)
                dashboard.save()
            except Exception as e:
                return Response({'message': 'Error created dashboard, please contact admin to assit.', 'errors': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'User created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)  
        return Response({'message': 'User creation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CustomUserDetailView(APIView):
    # permission_classes = [IsAdminUser]
    def get_object(self, pk):
        try:
            return CustomUser.objects.filter(pk=pk, is_active=True).first()
        except CustomUser.DoesNotExist:
            raise Http404('User not found')

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = CustomUserV1Serializer(user)
        return Response({'message': 'User retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        user = self.get_object(pk)
        cache_key = f'User_{user.id}'
        serializer = CustomUserV1Serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            cache.delete(cache_key)  # Invalidate cache
            return Response({'message': 'User updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'User update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.is_active = False
        user.save()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    

class CustomUserChangeAvatarView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

        
    def put(self, request):
        user = request.user
        serializer = CustomUserUpdateAvatarSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            cache_key = f'User_{user.id}'
            cache.delete(cache_key)  # Invalidate cache
            return Response({'message': 'User avatar updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'User avatar update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = CustomUserV1Serializer(user)
        return Response({'message': 'User profile retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)


    def put(self, request):
        user = request.user
        serializer = CustomUserV1Serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            cache_key = f'User_{user.id}'
            cache.delete(cache_key)  # Invalidate cache
            return Response({'message': 'User updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'User update failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)