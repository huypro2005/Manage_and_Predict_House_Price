from .views import (
    CreateUserView,
    CustomTokenObtainPairView,
    ChangePasswordView,
    ForgotPasswordView
)
from apps.accounts.views import CustomUserListView
from .checkLoginViews import CheckLoginView
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

urlpatterns = [
    path('register/', CustomUserListView.as_view(), name='create-user'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('check/', CheckLoginView.as_view(), name='check-login'),
]