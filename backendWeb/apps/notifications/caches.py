import redis
import json
import time
from apps.utils import datetime_to_timestamp

USER_NOTIF_KEY = "user:{user_id}:notif:{page_number}"
USER_NOTIF_NOT_READED_KEY = "user:{user_id}:notif:not_readed"
USER_NOTIF_AMOUNT_KEY = "user:{user_id}:notif:amount"
NOTIF_TTL = 300  # 5 phút, tùy bạn

cache = redis.StrictRedis(host='localhost', port=6379, db=1, decode_responses=True)

def notif_key(user_id: int, page_number=1) -> str:
    return USER_NOTIF_KEY.format(user_id=user_id, page_number=page_number)

def notif_not_read_key(user_id: int) -> str:
    return USER_NOTIF_NOT_READED_KEY.format(user_id=user_id)

def get_not_read_count_from_cache(user_id: int) -> int:
    count = cache.get(notif_not_read_key(user_id))
    return int(count) if count else 0

def add_to_cache(user_id: int, notification_id: int, notification: dict):
    if not cache.exists(notif_key(user_id)):
        return
    timestamp = notification.get('created_at', time.time())
    notification_json = json.dumps({
        'id': notification_id,
        'notification': notification
    })
    cache.zadd(notif_key(user_id), {notification_json: datetime_to_timestamp(timestamp)})
    cache.expire(notif_key(user_id), NOTIF_TTL)
    count = cache.get(notif_not_read_key(user_id))
    cache.set(notif_not_read_key(user_id), str(int(count) + 1), ex=NOTIF_TTL)
    amount_old = cache.get(USER_NOTIF_AMOUNT_KEY.format(user_id=user_id))
    if amount_old:
        cache.set(USER_NOTIF_AMOUNT_KEY.format(user_id=user_id), str(int(amount_old) + 1), ex=NOTIF_TTL)
    else:
        cache.set(USER_NOTIF_AMOUNT_KEY.format(user_id=user_id), '1', ex=NOTIF_TTL)


def update_cache(user_id: int, notification_id: int, new_data: dict):
    # Xoá rồi thêm lại để cập nhật thời gian tồn tại
    if not cache.exists(notif_key(user_id)):
        return
    
    page_number = 1
    while True:
        key = notif_key(user_id, page_number)
        cache_page = cache.zrange(key, 0, -1, withscores=True)
        if not cache_page:
            break
        cached_json_start = json.loads(cache_page[0][0])
        cached_json_end = json.loads(cache_page[-1][0])
        id_start = cached_json_start.get('id')
        id_end = cached_json_end.get('id')
        if id_start <= notification_id <= id_end:
            for notif_json, timestamp in cache_page:
                notif = json.loads(notif_json)
                if notif['id'] == notification_id:
                    updated_notification_json = json.dumps({ 
                        'id': notification_id, 
                        'notification': new_data 
                    })
                    cache.zrem(key, notif_json)
                    cache.zadd(key, {updated_notification_json: timestamp})
                    cache.expire(key, NOTIF_TTL)
                    break
            break
    count = get_not_read_count_from_cache(user_id)
    cache.set(notif_not_read_key(user_id), str(count - 1), ex=NOTIF_TTL)

def seed_set_if_empty(user_id: int, notif_list, NOT_READ_COUNT=0, page_number=1, count_notifications=0):
    """
    Khi lần đầu gọi GET mà set chưa có (cache miss),
    có thể seed set từ DB để các lần sau toggle nhanh hơn.
    """
    page_size = 10
    print(len(notif_list))
    key = notif_key(user_id, page_number)
    cache.delete(key)  # đảm bảo xoá sạch trước khi seed
    if notif_list:
        for notif in notif_list:
            notif_json = json.dumps({
                'id': notif.get('id'),
                'notification': notif
            })
            timestamp = notif.get('created_at', time.time())
            cache.zadd(key, {notif_json: datetime_to_timestamp(timestamp)})

    cache.expire(key, NOTIF_TTL)
    cache.set(notif_not_read_key(user_id), str(NOT_READ_COUNT), ex=NOTIF_TTL)
    set_total_notifications(user_id, count_notifications)


def set_total_notifications(user_id: int, amount: int):
    key = USER_NOTIF_AMOUNT_KEY.format(user_id=user_id)
    cache.set(key, str(amount), ex=NOTIF_TTL)        


def get_total_notifications(user_id: int) -> int:
    return int(cache.get(USER_NOTIF_AMOUNT_KEY.format(user_id=user_id)) or 0)

# Lấy danh sách thông báo đã serialize từ cache (theo thứ tự mới nhất) và deserialize
# (start, end) là chỉ số trong sorted set

def get_notifications_from_cache(user_id: int, page_number=1):
    notifications = cache.zrevrange(notif_key(user_id, page_number), 0, -1)
    result = []
    for notif_json in notifications:
        notif = json.loads(notif_json)
        result.append(notif)
    return result


def remove_from_cache(user_id: int, notification_id: int):
    notifications = cache.zrange(notif_key(user_id), 0, -1)
    for notif_json in notifications:
        notif = json.loads(notif_json)
        if notif['id'] == notification_id:
            cache.zrem(notif_key(user_id), notif_json)
            break
    



