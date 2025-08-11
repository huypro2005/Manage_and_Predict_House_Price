from django.urls import path
from .views import PropertyDetailView, PropertyImageListView, PropertyListView, PropertyImageDetailView

urlpatterns = [
    path('properties/', PropertyListView.as_view(), name='property-list'),
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),
    path('properties/<int:pk>/images/', PropertyImageListView.as_view(), name='property-image-list'),
    path('properties/<int:pk>/images/<int:image_pk>/', PropertyImageDetailView.as_view(), name='property-image-detail'),
]
