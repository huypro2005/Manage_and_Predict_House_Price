from .views import (
    NewsListView,
    NewsDetailView,
    RecommendedNewsView
)
from django.urls import path


urlpatterns = [
    path('news/', NewsListView.as_view(), name='news-list'),
    path('news/<int:pk>/', NewsDetailView.as_view(), name='news-detail'),
    path('news/recommended/', RecommendedNewsView.as_view(), name='recommended-news'),
]