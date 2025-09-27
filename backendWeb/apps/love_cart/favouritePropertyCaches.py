# favourite_cache.py
from django.core.cache import cache

SET_KEY = "user:{user_id}:fav:set"
LIST_KEY = "user:{user_id}:fav:list"
LIST_TTL = 60  # 1 phút, tùy bạn

def fav_set_key(user_id: int) -> str:
    return SET_KEY.format(user_id=user_id)

def fav_list_key(user_id: int) -> str:
    return LIST_KEY.format(user_id=user_id)

def add_to_cache(user_id: int, property_id: int):
    # Thêm vào set ID
    cache.sadd(fav_set_key(user_id), property_id)
    # Invalidate cache list đã serialize
    cache.delete(fav_list_key(user_id))

def remove_from_cache(user_id: int, property_id: int):
    cache.srem(fav_set_key(user_id), property_id)
    cache.delete(fav_list_key(user_id))

def get_ids_from_cache(user_id: int):
    return cache.smembers(fav_set_key(user_id))  # trả về set/ list tùy backend

def set_serialized_list_cache(user_id: int, data):
    cache.set(fav_list_key(user_id), data, timeout=LIST_TTL)

def get_serialized_list_cache(user_id: int):
    return cache.get(fav_list_key(user_id))

def seed_set_if_empty(user_id: int, id_list):
    """
    Khi lần đầu gọi GET mà set chưa có (cache miss),
    có thể seed set từ DB để các lần sau toggle nhanh hơn.
    """
    key = fav_set_key(user_id)
    # nếu set rỗng thì seed
    client = cache.client.get_client()
    if not client.exists(key) and id_list:
        pipe = client.pipeline()
        pipe.sadd(key, *id_list)
        pipe.expire(key, LIST_TTL)
        pipe.execute()