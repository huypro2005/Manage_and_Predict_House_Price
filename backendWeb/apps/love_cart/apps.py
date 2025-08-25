from django.apps import AppConfig


class LoveCartConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.love_cart'

    def ready(self):
        from .jobs import start_scheduler_thread
        start_scheduler_thread()