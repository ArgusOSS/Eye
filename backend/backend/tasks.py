import datetime

from celery import shared_task
from celery.utils.log import get_task_logger

from api_app.servers import crons
from api_app.servers.models import Server, ServerPingHistory

from .celery import app

logger = get_task_logger(__name__)


@app.task(name="CalculateUptime", soft_time_limit=100)
def CalculateUptime(server_id: int, mode: str = "frontend"):
    server = Server.objects.get(pk=server_id)
    logger.info(
        "Starting calculating uptime"
        # f"in the last 7 days for {server}"
    )

    # Ideally, take data from last 7 days.
    # or maybe even less.
    date_today = datetime.datetime.now()
    date_seven_days_ago = str((date_today - datetime.timedelta(days=7)).date())
    ping_history = ServerPingHistory.objects.filter(
        server=server, created_at__range=[date_seven_days_ago, str(date_today)]
    ).order_by("-created_at")

    total = 0
    up = 0
    for ping in ping_history:
        total += 1
        if ping.pinged_back:
            up += 1

    mean_uptime = up / total
    percentage_uptime = mean_uptime * 100

    if mode == "frontend":
        server.frontend_percentage_uptime = percentage_uptime
    else:
        server.api_percentage_uptime = percentage_uptime

    logger.info(
        f"Calculated percentage uptime for {server} " f"to be {percentage_uptime}%"
    )

    server.save()


@app.task(name="PingServer", soft_time_limit=100)
def PingServer(server_id: int, mode: str = "frontend"):
    # there are two modes.
    # "api" and "frontend"
    server = Server.objects.get(pk=server_id)
    logger.info(f"Starting to ping server {server}")
    crons.ping_server(server=server, mode=mode)


@shared_task(soft_time_limit=10000)
def PingServers():
    logger.info("Starting to ping servers..")
    servers = Server.objects.all()
    for server in servers:
        app.send_task("PingServer", kwargs=dict(server_id=server.id))  # type: ignore
        if server.api_ping_url:
            app.send_task(
                "PingServer", kwargs=dict(server_id=server.id, mode="api")  # type: ignore
            )
