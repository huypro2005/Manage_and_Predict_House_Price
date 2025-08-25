from .models import FavouriteProperty
import schedule
import time
import threading

def clean_favourite_properties():
    FavouriteProperty.objects.filter(is_active=False).delete()


def run_scheduler():
    schedule.every().day.at("00:00").do(clean_favourite_properties)
    while True:
        schedule.run_pending()
        time.sleep(1)


def start_scheduler_thread():
    thread = threading.Thread(target=run_scheduler, daemon=True)
    thread.start()