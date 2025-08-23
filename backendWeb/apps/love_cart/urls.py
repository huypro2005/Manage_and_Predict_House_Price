from django.urls import path

from .views import FavouritePropertyListView


urlpatterns =  [
    path('favourites/', FavouritePropertyListView.as_view(), name='favourite-property-list'),
]