from api_app.servers import crons
from api_app.servers.models import Server
from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task(soft_time_limit=10000)
def ping_servers():
    servers = Server.objects.all()
    for server in servers:
        crons.ping_server(server=server)
