from celery import shared_task

from celery.utils.log import get_task_logger
from api_app.servers.models import Server
from api_app.servers.crons import ping_server as ps

logger = get_task_logger(__name__)

@shared_task
def ping_server(server: Server):
    logger.info(f"Running server ping for {server}")
    ps(server=server)
