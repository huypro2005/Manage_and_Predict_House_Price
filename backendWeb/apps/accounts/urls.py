from django.urls import path
from .views import CustomUserListView, CustomUserDetailView, CustomUserChangeAvatarView, MeView

urlpatterns = [
    path('users/', CustomUserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', CustomUserDetailView.as_view(), name='user-detail'),
    path('user/change_avatar/', CustomUserChangeAvatarView.as_view(), name='user-change-avatar'),
    path('me/', MeView.as_view(), name='me'),  # New endpoint for current user profile
]