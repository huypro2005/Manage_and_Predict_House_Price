from django.db.models.signals import post_save
from django.dispatch import receiver
from ..models import Message


@receiver(post_save, sender=Message)
def save_message_signal(sender, instance, **kwargs):
    pass