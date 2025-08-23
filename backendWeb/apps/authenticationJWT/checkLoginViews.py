from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class CheckLoginView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            'full_name': user.get_full_name(),
            'id': user.id,
            'is_authenticated': user.is_authenticated,
            'is_active': user.is_active,
            'avatar': user.avatar.url if user.avatar else None,
        }, status=status.HTTP_200_OK)
