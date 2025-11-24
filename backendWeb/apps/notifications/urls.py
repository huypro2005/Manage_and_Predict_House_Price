from django.urls import path
from . import views
from .long_pooling import NotificationLP
# from .server_send_event import SSENotificationView


urlpatterns = [
    path('notifications/', views.NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:notification_id>/', views.NotificationDetailView.as_view(), name='notification-detail'),
    path('notifications/long-polling/', NotificationLP.as_view(), name='notification-long-polling'),
    path('notifications/not-read-count/', views.NotificationNotReadCountView.as_view(), name='notification-not-read-count'),
    # path('notifications/server-sent-events/', SSENotificationView.as_view(), name='notification-sse'),
    # path('notifications/server-sent-events/', sse_notification_view, name='notification-sse-view'),
]