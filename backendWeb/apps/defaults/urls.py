from django.urls import path
from .views import (
    PropertyTypeListView, 
    PropertyTypeDetailView, 
    ProvinceListView, 
    ProvinceDetailView, 
    DistrictListView, 
    DistrictDetailView,
    AttributeListView
    )

urlpatterns = [
    path('property-types/', PropertyTypeListView.as_view(), name='property-type-list'),
    path('property-types/<int:pk>/', PropertyTypeDetailView.as_view(), name='property-type-detail'),
    path('provinces/', ProvinceListView.as_view(), name='province-list'),
    path('provinces/<int:pk>/', ProvinceDetailView.as_view(), name='province-detail'),
    path('provinces/<int:province_pk>/districts/', DistrictListView.as_view(), name='district-list'),
    path('provinces/<int:province_pk>/districts/<int:pk>/', DistrictDetailView.as_view(), name='district-detail'),
    path('attributes/', AttributeListView.as_view(), name='attribute-list'),
]