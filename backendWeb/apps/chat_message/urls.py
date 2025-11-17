from django.urls import path
from .views import MessagesListView, NumberMessagesUnreadPerConversationView


urlpatterns = [
    path('conversations/<int:conv_id>/messages/', MessagesListView.as_view(), name='messages'),
    path('messages/unread/', NumberMessagesUnreadPerConversationView.as_view(), name='messages_unread'),
]