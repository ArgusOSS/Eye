from api_app.core.models import BaseMixin
from django.db import models

class Server(BaseMixin):
    name = models.CharField(default="Server", max_length=125)
    provider = models.CharField(default="", blank=True, max_length=125)
    url = models.CharField(max_length=225)

    def __str__(self): 
        return f"{self.name}:{self.url}"

class ServerPingHistory(BaseMixin):
    # pinged_back == true means that the server was up.
    pinged_back = models.BooleanField(default=True)
    server = models.ForeignKey(to=Server, on_delete=models.CASCADE)
    status_code = models.IntegerField(null=True)
    response_html = models.CharField(max_length=255, null=True)

    def __str__(self): 
        return f"{self.server} - Reachable: {self.status_code}"