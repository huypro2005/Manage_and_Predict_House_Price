from django.urls import path

from .views import FavouritePropertyListView, FavouritePropertyV2View


urlpatterns =  [
    path('v1/favourites/', FavouritePropertyListView.as_view(), name='favourite-property-list'),
    path('v1/favourites/listID/', FavouritePropertyV2View.as_view(), name='favourite-property-list-id'),
]