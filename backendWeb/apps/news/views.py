from .models import NewsArticle, Comment, Source, CustomUser
from .serializer import NewsV1Serializer, NewsDetailV1Serializer, CommentV1Serializer, SourceV1Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db import transaction

class NewsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        articles = NewsArticle.objects.filter(is_deleted=False).order_by('-created_at')
        serializer = NewsV1Serializer(articles, many=True)
        return Response({'data': serializer.data, 'message': 'Success'}, status=status.HTTP_200_OK)
    
    @transaction.atomic
    def post(self, request):
        data = request.data
        