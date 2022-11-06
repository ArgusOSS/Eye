import os

from celery import Celery
from celery.schedules import crontab
from django.conf import settings
from kombu import Exchange, Queue

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
app = Celery("backend")

app.config_from_object("django.conf:settings")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    "ping_servers": {
        "task": "backend.tasks.PingServers",
        "schedule": crontab(minute=settings.PING_SERVERS_MINUTES),
        "options": {"queue": "default"},
    },
}

app.conf.update(
    task_default_queue="default",
    task_queues=[
        Queue(
            key,
            Exchange(key),
            routing_key=key,
        )
        for key in settings.CELERY_QUEUES
    ],
    task_time_limit=1800,
    broker_url=settings.BROKER_URL,
    result_backend=settings.CELERY_RESULT_BACKEND,
    accept_content=["application/json"],
    task_serializer="json",
    result_serializer="json",
    imports=("backend.tasks",),
    worker_redirect_stdouts=False,
    worker_hijack_root_logger=False,
    # these two are needed to enable priority and correct tasks execution
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    # this is to avoid RAM issues caused by long usage of this tool
    worker_max_tasks_per_child=200,
    # value is in kilobytes
    worker_max_memory_per_child=4000,
)
