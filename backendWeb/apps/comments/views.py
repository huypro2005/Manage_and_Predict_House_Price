from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Comment
from .serializer import CommentsV1Serializer
from apps.utils import datetime_to_timestamp
from rest_framework.pagination import PageNumberPagination

# Create your views here.

class CommentPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100
    # def get_paginated_response(self, data):
    #     return Response({
    #         'count': self.page.paginator.count,
    #         'next': self.get_next_link(),
    #         'previous': self.get_previous_link(),
    #         'results': data
    #     })


class CommentListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CommentPagination

    def get(self, request):
        # try:
        limit = int(request.query_params.get('limit', 10))
        article_id = request.query_params.get('article_id', None)
        # except (TypeError, ValueError):
            # limit = None
            # article_id = None
        if not article_id:
            return Response({'message': 'article_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        article_id = int(article_id)
        print("Article ID:", article_id)
        if limit:
            comments = Comment.objects.filter(is_deleted=False, article_id=article_id, answer__isnull=True).order_by('-created_at')[:limit]
        else:
            comments = Comment.objects.filter(is_deleted=False, article_id=article_id, answer__isnull=True).order_by('-created_at')
        page = self.pagination_class()
        results = page.paginate_queryset(comments, request)
        serializer = CommentsV1Serializer(results, many=True)
        return page.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        user = request.user
        if not user.is_authenticated:
            return Response({'message': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = CommentsV1Serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=user )
        return Response({'data': serializer.data, 'message': 'Comment created successfully'}, status=status.HTTP_201_CREATED)


    def delete(self, request):
        comment_id = request.query_params.get('comment_id', None)
        article_id = request.query_params.get('article_id', None)
        if not article_id:
            return Response({'message': 'article_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not comment_id:
            return Response({'message': 'comment_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            comment = Comment.objects.get(id=comment_id, is_deleted=False)
        except Comment.DoesNotExist:
            return Response({'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if comment.article.id != int(article_id):
            return Response({'message': 'Comment does not belong to the specified article'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        if not user.is_authenticated:
            return Response({'message': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if comment.author != user and not user.is_staff:
            return Response({'message': 'You do not have permission to delete this comment'}, status=status.HTTP_403_FORBIDDEN)
        
        comment.delete()
        return Response({'message': 'Comment deleted successfully'}, status=status.HTTP_200_OK)