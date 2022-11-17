from rest_framework import serializers as rfs

from .models import CloudProvider


class CloudProviderSerializer(rfs.ModelSerializer):
    class Meta:
        model = CloudProvider
        fields = ("name",)
