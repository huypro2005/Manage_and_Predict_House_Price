from django.urls import path
from .views import PropertyDetailView, PropertyImageListView, PropertyListView, PropertyImageDetailView, MyPropertyListView, create_ViewsProperty_for_existing_properties
from .recommendations import PropertyRecommendationView

urlpatterns = [
    path('properties/', PropertyListView.as_view(), name='property-list'),
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),
    path('properties/<int:pk>/images/', PropertyImageListView.as_view(), name='property-image-list'),
    path('properties/<int:pk>/images/<int:image_pk>/', PropertyImageDetailView.as_view(), name='property-image-detail'),
    path('my-properties/', MyPropertyListView.as_view(), name='my-property-list'),
    path('properties/<int:property_id>/recommendations/', PropertyRecommendationView.as_view(), name='property-recommendations'),
    # path('properties/create-views-property-for-existing/', create_ViewsProperty_for_existing_properties.as_view(), name='create-views-property-for-existing'),
]
