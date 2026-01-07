import json
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification, Range
from .serializer import NotificationV1Serializer
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from django.db import transaction
from rest_framework.pagination import PageNumberPagination
from .caches import (
    get_notif_ids_cache,
    seed_set_if_empty,
    get_unread_count_cache,
    get_total_count_cache,
    set_unread_count_cache,
    set_total_count_cache,
    remove_notif_from_cache,
    set_a_notif_cache,
    set_last_version_cache,
    get_last_version_cache
)
from apps.utils import datetime_to_timestamp

PAGE_SIZE = 10
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': data.get('total', 0),
            'not_readed': data.get('not_readed', 0),
            'next': data['current_page'] + 1 if data['current_page'] * PAGE_SIZE < data['total'] else None,
            'results': data.get('data', []),
            'status_code': data['status'] if data['status'] else status.HTTP_200_OK,
        })


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    '''
    def get(self, request):
        print('NotificationListView GET called')
        page = int(request.query_params.get('page', 1))
        user = request.user 
        paginator = self.pagination_class()
        cached = get_notifications_from_cache(user.id, page_number=page)
        count_not_readed = get_not_read_count_from_cache(user.id)
        if cached and count_not_readed is not None:
            tmp = []
            for item in cached:
                tmp.append(item['notification'])
            print('From cache')
            return paginator.get_paginated_response({
                'not_readed': count_not_readed,
                'data': tmp,
                'message': 'Success (from cache)',
                'current_page': page,
                'status': status.HTTP_204_NO_CONTENT,
                'total': get_total_notifications(user.id)
            })

        print('From DB')
        notifications = Notification.objects.filter(user=user, is_deleted=False).order_by('-created_at')
        
        result_page = paginator.paginate_queryset(notifications, request)
        serializer = NotificationV1Serializer(result_page, many=True)
        count_not_read = notifications.filter(is_read=False, is_deleted=False).count()
        seed_set_if_empty(user.id, serializer.data, count_not_read, page_number=page, count_notifications=notifications.count())

        return paginator.get_paginated_response({'not_readed': count_not_read, 'data': serializer.data, 'message': 'Success (from DB)', 'status': status.HTTP_200_OK, 'current_page': page, 'total': get_total_notifications(user.id)})

    '''
    
    def get(self, request):
        page = int(request.query_params.get('page', 1))
        user = request.user 
        paginator = self.pagination_class()
        start = (page - 1) * PAGE_SIZE
        end = start + PAGE_SIZE - 1
        ids_cached = get_notif_ids_cache(user.id, start, end)
        count_not_readed = get_unread_count_cache(user.id)
        if ids_cached and count_not_readed is not None and len(ids_cached) >= count_not_readed - 1:
            notifications = Notification.objects.filter(id__in=ids_cached, user=user, is_deleted=False).order_by('-created_at')
            serializer = NotificationV1Serializer(notifications, many=True)
            tmp = serializer.data
            return paginator.get_paginated_response({
                'not_readed': count_not_readed,
                'data': tmp,
                'message': 'Success (from cache)',
                'current_page': page,
                'status': status.HTTP_204_NO_CONTENT,
                'total': get_total_count_cache(user.id)
            })

        notifications = Notification.objects.filter(user=user, is_deleted=False).order_by('-created_at')
        
        result_page = paginator.paginate_queryset(notifications, request)
        serializer = NotificationV1Serializer(result_page, many=True)
        count_not_read = notifications.filter(is_read=False, is_deleted=False).count()
        print(count_not_read)
        seed_set_if_empty(user.id, result_page, count_not_read, count_notifications=notifications.count())
        if notifications.exists():
            set_last_version_cache(user.id, datetime_to_timestamp(notifications.first().created_at))
        else:
            set_last_version_cache(user.id, 0)
        return paginator.get_paginated_response({'not_readed': count_not_read, 'data': serializer.data, 'message': 'Success (from DB)', 'status': status.HTTP_200_OK, 'current_page': page, 'total': get_total_count_cache(user.id)})


class NotificationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, notification_id):
        
        action = request.data.get('action')
        if action == 'readed':
            notification = self.mark_notification_as_read(notification_id)
            serializer = NotificationV1Serializer(notification)
            return Response({'data': serializer.data, 'message': 'Notification marked as read'}, status=status.HTTP_200_OK)
        elif action == 'deleted':
            notification = self.delete_notification(notification_id)
            serializer = NotificationV1Serializer(notification)
            return Response({'data': serializer.data, 'message': 'Notification deleted'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

    def mark_notification_as_read(self, notification_id):
        try:
            notification = Notification.objects.get(id=notification_id)
            if notification.is_read:
                return notification
            notification.is_read = True
            notification.save()
            serializer = NotificationV1Serializer(notification)
            unread_count_old = get_unread_count_cache(notification.user.id)
            set_unread_count_cache(notification.user.id, max(unread_count_old - 1, 0))
            return notification
        except Notification.DoesNotExist:
            raise Http404("Notification not found")
        
    def delete_notification(self, notification_id):
        try:
            notification = Notification.objects.get(id=notification_id)
            notification.is_deleted = True
            notification.save()
            remove_notif_from_cache(notification.user.id, notification.id)
            return notification
        except Notification.DoesNotExist:
            raise Http404("Notification not found")

@transaction.atomic
def create_notification(user, type, message, url=None, ranges=None, image_representation=None):
    try:
        notification = Notification.objects.create(
            user=user,
            type=type,
            message=message,
            url=url,
            image_representation=image_representation
        )
        if ranges:
            for range in ranges:
                Range.objects.create(
                    notification=notification,
                    offset=range['offset'],
                    length=range['length']
                )
        serializer = NotificationV1Serializer(notification)
        set_a_notif_cache(user.id, notification)
        unread_count_old = get_unread_count_cache(user.id)
        set_unread_count_cache(user.id, unread_count_old + 1)
        total_count_old = get_total_count_cache(user.id)
        set_total_count_cache(user.id, total_count_old + 1)
        if notification:
            set_last_version_cache(user.id, datetime_to_timestamp(notification.created_at))
        return notification
    except Exception as e:
        raise Exception('Notification creation failed: ' + str(e))


class NotificationNotReadCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        count_not_read = get_unread_count_cache(user.id)
        if count_not_read is not None:
            return Response({'not_readed': count_not_read, 'message': 'Success (from cache)'}, status=status.HTTP_200_OK)
        count_not_read = Notification.objects.filter(user=user, is_read=False, is_deleted=False).count()
        return Response({'not_readed': count_not_read, 'message': 'Success (from DB)'}, status=status.HTTP_200_OK)



def get_current_notification_version(user_id):
    last_version = get_last_version_cache(user_id)
    if last_version:
        # đã có trong cache, trả luôn int
        return last_version

    notif = Notification.objects.filter(user_id=user_id).order_by('-created_at').first()
    if notif:
        ts = datetime_to_timestamp(notif.created_at)
        set_last_version_cache(user_id, ts)
        return int(ts)
    else:
        set_last_version_cache(user_id, 0)
        return 0