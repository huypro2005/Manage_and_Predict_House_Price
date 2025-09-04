from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from .serializer import NotificationV1Serializer
from rest_framework.permissions import IsAuthenticated
from django.http import Http404


class NotificationListView(APIView):
    pass