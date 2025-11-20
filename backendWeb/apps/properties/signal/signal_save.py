from django.db.models.signals import post_save
from django.dispatch import receiver
from ..models import Property
from apps.notifications.models import Notification
from apps.notifications.views import create_notification

@receiver(post_save, sender=Property)
def property_status_change_signal(sender, instance, **kwargs):
    print('Signal triggered for Property status change')
    notification_message = f'Bài viết {instance.title if len(instance.title) < 20 else instance.title[:17] + "..."} của bạn {instance.get_status_display()}'
    space1 = len('Bài viết ')
    space2 = space1+ len(instance.title if len(instance.title) < 20 else instance.title[:17] + "...") + len(' của bạn ')
    ranges = [
        {
            'offset': space1,
            'length': len(instance.title if len(instance.title) < 20 else instance.title[:17] + "...")
        },
        {
            'offset': space2,
            'length': len(instance.get_status_display())
        }
    ]
    create_notification(user=instance.user, type='property_view', message=notification_message, ranges=ranges, url=f'/api/v1/properties/{instance.id}/')
