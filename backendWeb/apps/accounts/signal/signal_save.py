from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.predicts.models import Dashboard
from ..models import CustomUser

@receiver(post_save, sender=CustomUser)
def create_dashboard(sender, instance, created, **kwargs):
    if created:
        Dashboard.objects.create(user=instance)
        instance.dashboard = Dashboard.objects.get(user=instance)
        instance.save()
    else:
        instance.dashboard.save()
