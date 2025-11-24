import json
import time
from apps.utils import datetime_to_timestamp
from django_redis import get_redis_connection
'''
USER_NOTIF_KEY = "user:{user_id}:notif:{page_number}" 
USER_NOTIF_NOT_READED_KEY = "user:{user_id}:notif:not_readed"
USER_NOTIF_AMOUNT_KEY = "user:{user_id}:notif:amount"
USER_NOTIF_LAST_VERSION = "user:{user_id}:notif:last_version"
NOTIF_TTL = 300  # 5 phút, tùy bạn

cache = get_redis_connection("default") 

# Hàm tạo key cho thông báo của user theo trang
def notif_key(user_id: int, page_number=1) -> str:
    return USER_NOTIF_KEY.format(user_id=user_id, page_number=page_number)

# Hàm tạo key cho số thông báo chưa đọc của user
def notif_not_read_key(user_id: int) -> str:
    return USER_NOTIF_NOT_READED_KEY.format(user_id=user_id)

def notif_amount_key(user_id):
    return USER_NOTIF_AMOUNT_KEY.format(user_id=user_id)

def notif_last_version_key(user_id):
    return USER_NOTIF_LAST_VERSION.format(user_id=user_id)

# Lấy số thông báo chưa đọc từ cache
def get_not_read_count_from_cache(user_id: int) -> int:
    count = cache.get(notif_not_read_key(user_id))
    return int(count) if count else 0

# Thêm thông báo mới vào cache
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
    amount_old = cache.get(notif_amount_key(user_id))
    if amount_old:
        cache.set(notif_amount_key(user_id), str(int(amount_old) + 1), ex=NOTIF_TTL)
    else:
        cache.set(notif_amount_key(user_id), '1', ex=NOTIF_TTL)


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
    cache.delete(notif_not_read_key(user_id))
    cache.delete(notif_amount_key(user_id))
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
    



'''


USER_NOTIF_ZSET_KEY = "notif:{user_id}:zset"
USER_NOTIF_UNREAD_COUNT_KEY = "notif:{user_id}:unread_count"
USER_NOTIF_TOTAL_COUNT_KEY = "notif:{user_id}:total_count"
USER_NOTIF_LAST_VERSION_KEY = "notif:{user_id}:last_version"
NOTIF_CACHE_TTL = 300  # 5 phút

r = get_redis_connection("default")

def notif_zset_key(user_id: int) -> str:
    return USER_NOTIF_ZSET_KEY.format(user_id=user_id)

def notif_unread_count_key(user_id: int) -> str:
    return USER_NOTIF_UNREAD_COUNT_KEY.format(user_id=user_id)

def notif_total_count_key(user_id: int) -> str:
    return USER_NOTIF_TOTAL_COUNT_KEY.format(user_id=user_id)

def notif_last_version_key(user_id: int) -> str:
    return USER_NOTIF_LAST_VERSION_KEY.format(user_id=user_id)

def set_a_notif_cache(user_id, notification):
    timestamp = notification.created_at
    r.zadd(notif_zset_key(user_id), {notification.id: datetime_to_timestamp(timestamp)})
    r.expire(notif_zset_key(user_id), NOTIF_CACHE_TTL)

def set_notifs_cache(user_id, notifications):
    if not notifications:
        return
    pipe = r.pipeline()
    for notification in notifications:
        timestamp = notification.created_at
        pipe.zadd(notif_zset_key(user_id), {notification.id: datetime_to_timestamp(timestamp)})
    pipe.expire(notif_zset_key(user_id), NOTIF_CACHE_TTL)
    pipe.execute()

def get_notif_ids_cache(user_id, start=0, end=-1):
    print('start:', start, 'end:', end)
    notif_ids = r.zrevrange(notif_zset_key(user_id), start, end)
    return [int(nid) for nid in notif_ids] if notif_ids else []

def set_unread_count_cache(user_id, count: int):
    r.setex(notif_unread_count_key(user_id), NOTIF_CACHE_TTL, str(count))

def get_unread_count_cache(user_id) -> int:
    count = r.get(notif_unread_count_key(user_id))
    return int(count) if count else 0

def set_total_count_cache(user_id, count: int):
    r.setex(notif_total_count_key(user_id), NOTIF_CACHE_TTL, str(count))

def get_total_count_cache(user_id) -> int:
    count = r.get(notif_total_count_key(user_id))
    return int(count) if count else 0

def set_last_version_cache(user_id, version: int):
    v_int = int(version)
    r.setex(notif_last_version_key(user_id), NOTIF_CACHE_TTL, str(v_int))

def get_last_version_cache(user_id) -> int:
    version = r.get(notif_last_version_key(user_id))
    if not version:
        return 0
    # Redis trả bytes -> decode rồi ép int
    if isinstance(version, bytes):
        version = version.decode()
    return int(version)

def seed_set_if_empty(user_id: int, notif_list, NOT_READ_COUNT=0, count_notifications=0):
    """
    Khi lần đầu gọi GET mà set chưa có (cache miss),
    có thể seed set từ DB để các lần sau toggle nhanh hơn.
    """
    if not notif_list:
        return 
    
    
    set_notifs_cache(user_id, notif_list)
    set_unread_count_cache(user_id, NOT_READ_COUNT)
    set_total_count_cache(user_id, count_notifications)

def remove_notif_from_cache(user_id: int, notification_id: int):
    r.zrem(notif_zset_key(user_id), notification_id)
