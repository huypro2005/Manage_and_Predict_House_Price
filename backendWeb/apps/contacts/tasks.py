from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import redis

redis = redis.StrictRedis(host='localhost', port=6379, db=0)


@shared_task
def send_message_to_user(user_id, key_group, full_data):
    status_owner = redis.get(f'user_online_{user_id}')
    if status_owner == b'online':
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            key_group,
            {
                'type': 'send_notification',
                'message': full_data
            }
        )
    else:
        redis.lpush(key_group, str(full_data))