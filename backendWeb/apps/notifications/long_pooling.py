from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Notification
from apps.utils import datetime_to_timestamp
import asyncio, time


def get_current_notification_version(user_id):
    notif = Notification.objects.filter(user_id=user_id).order_by('-created_at').first()
    if notif:
        return datetime_to_timestamp(notif.created_at)
    return 0


class NotificationLP(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        last_version = get_current_notification_version(user.id)
        time_limit = 10
        start_time = time.time()
        while time.time() - start_time < time_limit:
            current_version = get_current_notification_version(user.id)
            if current_version > last_version:
                return Response({'message': 'New notifications available', 'v': current_version}, status=200)
            time.sleep(2)
        return Response({'message': 'No new notifications', 'v': last_version}, status=204)
    
