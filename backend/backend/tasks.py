from api_app.servers import crons
from api_app.servers.models import Server
from celery import shared_task
from celery.utils.log import get_task_logger

from .celery import app

logger = get_task_logger(__name__)


@app.task(name="PingServer", soft_time_limit=100)
def PingServer(server_id: int, type: str = "url"):
    server = Server.objects.get(pk=server_id)
    logger.info(f"Starting to ping server {server}")
    crons.ping_server(server=server)


@shared_task(soft_time_limit=10000)
def PingServers():
    logger.info("Starting to ping servers..")
    servers = Server.objects.all()
    for server in servers:
        app.send_task("PingServer", kwargs=dict(server_id=server.id))
        if server.api_ping_url:
            app.send_task("PingServer", kwargs=dict(server_id=server.id, type="api"))
