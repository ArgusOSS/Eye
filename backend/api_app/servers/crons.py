import logging
import time

import requests
from requests.exceptions import ConnectionError, HTTPError, RequestException, Timeout

from .models import Server, ServerPingHistory

logger = logging.getLogger(__name__)


def ping_server(server: Server, mode="api"):
    # mode=api => will ping the API server
    # mode=page => will ping the frontend server
    url = server.url if mode == "api" else server.api_ping_url
    try:
        start_time = time.monotonic()
        r = requests.get(url)
        end_time = time.monotonic()
        time_taken = time.timedelta(seconds=end_time - start_time)
        server_ping = ServerPingHistory.objects.create(
            server=server,
            status_code=r.status_code,
            response_html=r.text,
            url_pinged=url,
            time_taken=time_taken,
        )
    except (Timeout, ConnectionError, RequestException, HTTPError):
        server_ping = ServerPingHistory.objects.create(pinged_back=False, server=server)

    server_ping.save()
