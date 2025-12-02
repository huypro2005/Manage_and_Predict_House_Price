from django.core.cache import cache

PROPERTY_LIST_PREFIX = "property_list_"

def invalidate_property_cache(user_id=None):
    """
    Invalidate những cache liên quan đến property list.
    Tùy backend mà dùng delete_pattern hoặc clear/logic khác.
    """
    try:
        # Nếu dùng django-redis:
        from django_redis import get_redis_connection
        conn = get_redis_connection("default")
        # Xoá tất cả key list property
        for key in conn.scan_iter(f"{PROPERTY_LIST_PREFIX}*"):
            conn.delete(key)
    except Exception:
        # Fallback: xoá hết cache nếu không có scan_iter
        cache.clear()

    # Xoá cache danh sách property của user (nếu sau này bạn cache MyPropertyListView)
    if user_id:
        cache.delete(CACHE_KEY_PROPERTIES_OF_USER.format(user_id=user_id))
