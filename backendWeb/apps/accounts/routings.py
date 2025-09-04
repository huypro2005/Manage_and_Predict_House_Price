from django.urls import path
from .consumers import CustomUserConsumer

websocket_urlpatterns = [
    path('ws/status-user/', CustomUserConsumer.as_asgi()),
]