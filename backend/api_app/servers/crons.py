import datetime
import time

import requests
from celery.utils.log import get_task_logger
from requests.exceptions import ConnectionError, HTTPError, RequestException, Timeout

from backend.celery import app

from .exceptions import LinkNotSetUpProperlyException
from .models import Server, ServerPingHistory

logger = get_task_logger(__name__)


def ping_server(server: Server, mode="api"):
    logger.info(f"Starting pinging for {server}")
    # mode=api => will ping the API server
    # mode=page => will ping the frontend server
    url = server.url if mode == "api" else server.api_ping_url
    try:
        if url is None:
            raise LinkNotSetUpProperlyException(
                f"URL to be pinged for {server} is null." "Raising exception."
            )
        logger.info("Started ping for server")
        try:
            start_time = time.monotonic()
            r = requests.get(url)
            end_time = time.monotonic()
            time_taken = datetime.timedelta(seconds=end_time - start_time)
            response_mimetype = r.headers.get("Content-Type")
            server_ping = ServerPingHistory.objects.create(
                server=server,
                status_code=r.status_code,
                url_pinged=url,
                time_taken=time_taken,
                response_mimetype=response_mimetype,
            )
        except (Timeout, ConnectionError, RequestException, HTTPError):
            # in the future, implement retrying thrice
            end_time = time.monotonic()
            time_taken = datetime.timedelta(seconds=end_time - start_time)
            server_ping = ServerPingHistory.objects.create(
                pinged_back=False,
                server=server,
                time_taken=time_taken,
                url_pinged=url,
            )
            if server.webhook_url:
                logger.info("Sending message to discord webhook for failure.")
                message = f"""
                Alert! Your service {server.name}"
                "didn't respond to our hit when we tried to ping
                {url}. Please check if everything is"
                " working fine. It took us {time_taken} to come
                to this conclusion.
                """
                r = requests.post(server.webhook_url, data=dict(content=message))
                # ^ add fail checks and repeats in the future.
        logger.info(f"Server ping result: {server_ping}")
        server_ping.save()
    except LinkNotSetUpProperlyException:
        logger.error(f"{server} doesn't have the url for mode {mode}")

    logger.info("Now triggering Calculate Uptime..")

    app.send_task("CalculateUptime", kwargs=dict(server_id=server.id, mode=mode))
