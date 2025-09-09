from django.urls import path
from . import views
from .long_pooling import NotificationLP


urlpatterns = [
    path('notifications/', views.NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:notification_id>/', views.NotificationDetailView.as_view(), name='notification-detail'),
    path('notifications/long-polling/', NotificationLP.as_view(), name='notification-long-polling'),
    path('notifications/not-read-count/', views.NotificationNotReadCountView.as_view(), name='notification-not-read-count'),
]