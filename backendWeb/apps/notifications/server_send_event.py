from django.http import StreamingHttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Notification
from apps.utils import datetime_to_timestamp
import time
from channels.db import database_sync_to_async
from .views import get_current_notification_version
from django.http import StreamingHttpResponse, HttpResponseForbidden
from rest_framework.renderers import JSONRenderer
from .sse_render import ServerSentEventRenderer
from rest_framework_simplejwt.tokens import AccessToken
import time

@database_sync_to_async
def get_current_version(user_id):
    return get_current_notification_version(user_id)


# class SSENotificationView(APIView):
#     permission_classes = []
#     renderer_classes=[ServerSentEventRenderer, JSONRenderer]

#     def get(self, request):
#         token_str = request.GET.get("token")
#         if not token_str:
#             return HttpResponseForbidden("No token")

#         try:
#             token = AccessToken(token_str)
#             user_id = token["user_id"]
#         except Exception:
#             return HttpResponseForbidden("Invalid token")


#         def event_stream():
#             """
#             Generator sync cho SSE.
#             Mỗi 1s check version, nếu tăng thì gửi event.
#             """
#             print('SSE connection established for user:', user_id)
#             last_version = get_current_notification_version(user_id)
#             yield f"data: connected, last_version={last_version}\n\n"
#             print('Initial version sent:', last_version)
#             while True:
#                 current_version = get_current_notification_version(user_id)
#                 if current_version > last_version:
#                     yield "data: New notifications available\n\n"
#                     last_version = current_version
#                 # keep-alive để tránh proxy/nginx cắt
#                 yield ": keep-alive\n\n"
#                 time.sleep(1)

#         response = StreamingHttpResponse(event_stream(), content_type='text/event-stream')
#         response["X-Accel-Buffering"] = "no"  # Disable buffering in nginx
#         response["Cache-Control"] = "no-cache"  # Ensure clients don't cache the data
#         return response



