from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.utils.timezone import now
import logging

logger = logging.getLogger(__name__)

@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    # Ghi log thông tin đăng nhập
    logger.info(f"User logged in: {user.username} at {now()}")

    # Cập nhật thời gian đăng nhập
    user.last_login = now()
    user.save(update_fields=['last_login'])
    user.save()

    # Ghi log thông tin đăng nhập
    ip = get_client_ip(request)
    logger.info(f"User {user.username} logged in from IP: {ip}")
    
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip