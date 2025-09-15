from .views import (
    NewsListView,
)
from django.urls import path


urlpatterns = [
    path('news/', NewsListView.as_view(), name='news-list'), 
]