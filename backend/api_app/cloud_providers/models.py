# from api_app.cloud_providers.AWS.models import AWSServices
from api_app.core.models import BaseMixin
from django.db import models


class Services(BaseMixin):
    # enum field for service_name
    pass


class Project(BaseMixin):
    name = models.CharField(max_length=225)


class CloudProvider(BaseMixin):
    name = models.CharField(max_length=225)
    # pretty sure there would be
    # a variety of secrets to store.
    # this seems to be the best way.
    secrets = models.JSONField()
