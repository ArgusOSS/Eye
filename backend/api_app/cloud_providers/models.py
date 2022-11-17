from api_app.core.models import BaseMixin
from django.db import models


class Project(BaseMixin):
    name = models.CharField(max_length=225)


class CloudProvider(BaseMixin):
    name = models.CharField(max_length=225)
    # pretty sure there would be
    # a variety of secrets to store.
    # this seems to be the best way.
    secrets = models.JSONField()
