from django.urls import path
from .views import PropertyTypeListView, PropertyTypeDetailView, ProvinceListView, ProvinceDetailView, DistrictListView, DistrictDetailView

urlpatterns = [
    path('property-types/', PropertyTypeListView.as_view(), name='property-type-list'),
    path('property-types/<int:pk>/', PropertyTypeDetailView.as_view(), name='property-type-detail'),
    path('provinces/', ProvinceListView.as_view(), name='province-list'),
    path('provinces/<int:pk>/', ProvinceDetailView.as_view(), name='province-detail'),
    path('districts/', DistrictListView.as_view(), name='district-list'),
    path('districts/<int:pk>/', DistrictDetailView.as_view(), name='district-detail'),
]