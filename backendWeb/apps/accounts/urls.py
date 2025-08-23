from django.urls import path
from .views import CustomUserListView, CustomUserDetailView, CustomUserChangeAvatarView

urlpatterns = [
    path('users/', CustomUserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', CustomUserDetailView.as_view(), name='user-detail'),
    path('user/change_avatar/', CustomUserChangeAvatarView.as_view(), name='user-change-avatar')
]