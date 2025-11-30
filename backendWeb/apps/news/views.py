from .models import NewsArticle, Source, CustomUser
from .serializer import NewsV1Serializer, NewsDetailV1Serializer, SourceV1Serializer, ListNewsV1Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.db import transaction
from apps.utils import datetime_to_timestamp
from django.db.models import Case, When, IntegerField, Value, F
from apps.comments.models import Comment
from rest_framework.pagination import PageNumberPagination
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


class NewsPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'limit'
    max_page_size = 1000
class NewsListView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(cache_page(60*10))  # Cache for 10 minutes
    def get(self, request):
        try:
            limit = int(request.query_params.get('limit'))
        except (TypeError, ValueError):
            limit = None
        if limit:
            articles = NewsArticle.objects.filter(is_deleted=False, is_approved=True).order_by('-created_at')[:limit]
        else:
            articles = NewsArticle.objects.filter(is_deleted=False, is_approved=True).order_by('-created_at')
        
        paginator = NewsPagination()
        paginated_articles = paginator.paginate_queryset(articles, request)
        serializer = ListNewsV1Serializer(paginated_articles, many=True)
        return paginator.get_paginated_response(serializer.data)

    @transaction.atomic
    def post(self, request):
        data = request.data
        
class NewsDetailView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(cache_page(60*10))  # Cache for 10 minutes
    def get(self, request, pk):
        try:
            article = NewsArticle.objects.get(pk=pk, is_deleted=False, is_approved=True)
        except NewsArticle.DoesNotExist:
            return Response({'message': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)
        article.views += 1
        article.save()
        serializer = NewsDetailV1Serializer(article)
        return Response({'data': serializer.data, 'message': 'Success'}, status=status.HTTP_200_OK)
    
    @transaction.atomic
    def put(self, request, pk):
        try:
            article = NewsArticle.objects.get(pk=pk, is_deleted=False, is_approved=True)
        except NewsArticle.DoesNotExist:
            return Response({'message': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data
        # partial là để cập nhật một phần
        # ý nghĩa là không cần phải gửi đầy đủ tất cả các trường
        serializer = NewsDetailV1Serializer(article, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Article updated successfully'}, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors, 'message': 'Validation failed'}, status=status.HTTP_400_BAD_REQUEST)
    

class RecommendedNewsView(APIView):
    permission_classes = [AllowAny]

    def get_params(self, request):
        return {
            'province': request.query_params.get('province', None),
            'limit': int(request.query_params.get('limit', 5)),
            'current_article_id': request.query_params.get('current_article_id', None)
        }

    def get(self, request):
        params = self.get_params(request)
        limited = params['limit'] if params['limit'] and params['limit'] > 0 else 5
        current_article_id = params['current_article_id']
        print(params)
        if params['province']:
            province_id = params['province']
            print(1)
            articles = (
                NewsArticle.objects
                .filter(is_deleted=False, is_approved=True)
                .exclude(id=current_article_id)
                .annotate(
                    province_priority=Case(
                        When(province_id=province_id, then=Value(1)),
                        default=Value(2),
                        output_field=IntegerField()
                    )
                )
                .order_by('province_priority', '-created_at')[:limited]
            )
        else:
            print(2)
            articles = NewsArticle.objects.all().exclude(id=current_article_id).order_by('-created_at')[:limited]
        serializer = ListNewsV1Serializer(articles, many=True)
        return Response({'data': serializer.data, 'message': 'Success'}, status=status.HTTP_200_OK)

