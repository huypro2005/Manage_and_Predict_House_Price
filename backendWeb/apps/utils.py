from datetime import datetime
import os
from uuid import uuid4


def upload_to_app_model(instance, filename):
    app_label = instance._meta.app_label
    model_name = instance.__class__.__name__.lower()
    ext = filename.split('.')[-1] + str(datetime.now().timestamp()).replace('.', '_')
    new_filename = f"{uuid4().hex}.{ext}"

    return os.path.join(app_label, model_name, new_filename)

def datetimeFormat(Ttime):
    time_format = ["%Y-%m-%d %H:%M:%S.%f%z", "%Y-%m-%dT%H:%M:%S.%f%z"]
    for fmt in time_format:
        try:
            time_obj = datetime.strptime(Ttime, fmt)
            return time_obj.replace(tzinfo=None)
        except ValueError:
            continue
    raise ValueError("Invalid datetime format")

def datetime_to_timestamp(dt):
    if isinstance(dt, str):
        dt = datetimeFormat(dt)
    return dt.timestamp()