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
    time_format = "%Y-%m-%d %H:%M:%S.%f%z"
    time_obj = datetime.strptime(Ttime, time_format)
    time_obj = time_obj.replace(tzinfo=None)
    return time_obj