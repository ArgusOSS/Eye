import logging
import requests
from .models import Server, ServerPingHistory
from requests.exceptions import Timeout, ConnectionError, RequestException, HTTPError

logger = logging.getLogger(__name__)

def ping_server(server: Server):
    try:
        r = requests.get(server.url)
        server_ping = ServerPingHistory.objects.create(
            server=server,
            status_code=r.status_code,
            response_html=r.text,
        )
    except (Timeout, ConnectionError, RequestException, HTTPError):
        server_ping = ServerPingHistory.objects.create(
            pinged_back=False,
            server=server
        )

    server_ping.save()
