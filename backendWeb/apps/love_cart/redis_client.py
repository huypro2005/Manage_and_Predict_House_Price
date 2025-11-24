from django.core.cache import cache

def r():
    return cache.client.get_client()

def fav_set_key(user_id):
    return f"fav:{user_id}:ids"

def fav_list_key(user_id):
    return f"fav:{user_id}:list"