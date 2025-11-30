# favourite_cache.py
from .redis_client import r, fav_set_key, fav_list_key
import json

SET_TTL = 7 * 24 * 3600          # TTL 7 ngày
LIST_TTL = 300                   # TTL 5 phút

def add_fav(user_id, property_id):
    client = r()
    client.sadd(fav_set_key(user_id), property_id)
    client.expire(fav_set_key(user_id), SET_TTL)  # 7 days expiration
    client.delete(fav_list_key(user_id))  # Invalidate serialized list cache

def remove_fav(user_id, property_id):
    client = r()
    client.srem(fav_set_key(user_id), property_id)
    # client.delete(fav_list_key(user_id))  # Invalidate serialized list cache

def get_fav_ids(user_id):
    client = r()
    ids = client.smembers(fav_set_key(user_id))
    return [int(i) for i in ids] if ids else []

# def set_list_cache(user_id, data):
#     client = r()
#     client.setex(fav_list_key(user_id), LIST_TTL, json.dumps(data))

# def get_list_cache(user_id):
#     client = r()
#     data = client.get(fav_list_key(user_id))
#     if data:
#         return json.loads(data)
#     return None

def seed_set_if_empty(user_id: int, id_list: list[int]) -> None:
    """
    Seed set ID lần đầu (khi cache miss) để các lần toggle sau nhanh hơn.
    """
    if not id_list:
        return

    client = r()
    key = fav_set_key(user_id)

    if not client.exists(key):
        pipe = client.pipeline()
        pipe.sadd(key, *id_list)
        pipe.expire(key, LIST_TTL)
        pipe.execute()