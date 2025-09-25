from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache

class CheckLoginView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cache_key = f'User_{user.id}'
        cached_user = cache.get(cache_key)
        if cached_user:
            return Response(cached_user, status=status.HTTP_200_OK)

        user_data ={
            'is_authenticated': user.is_authenticated
        }
        cache.set(cache_key, user_data, timeout=300)  # Cache for 5 minutes
        return Response(user_data, status=status.HTTP_200_OK)
