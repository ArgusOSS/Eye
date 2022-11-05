import os

from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
app = Celery("backend")

app.config_from_object("django.conf:settings")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    "ping_servers": {
        "task": "backend.tasks.ping_servers",
        "schedule": crontab(minute=settings.PING_SERVERS_MINUTES),
        "options": {"queue": "default"},
    },
}
