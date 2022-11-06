import datetime
import time

import requests
from celery.utils.log import get_task_logger
from requests.exceptions import ConnectionError, HTTPError, RequestException, Timeout

from .exceptions import LinkNotSetUpProperlyException
from .models import Server, ServerPingHistory

logger = get_task_logger(__name__)


def ping_server(server: Server, mode="api"):

    logger.info(f"Starting pinging for {server}")
    # mode=api => will ping the API server
    # mode=page => will ping the frontend server
    url = server.url if mode == "api" else server.api_ping_url
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
            response_html=r.text,
            url_pinged=url,
            time_taken=time_taken,
            response_mimetype=response_mimetype,
        )
    except (Timeout, ConnectionError, RequestException, HTTPError):
        # in the future, implement retrying thrice
        end_time = datetime.monotonic()
        time_taken = datetime.timedelta(seconds=end_time - start_time)
        server_ping = ServerPingHistory.objects.create(
            pinged_back=False,
            server=server,
            time_taken=time_taken,
            url_pinged=url,
        )
    logger.info(f"Server ping result: {server_ping}")
    server_ping.save()
