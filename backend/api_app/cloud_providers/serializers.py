from rest_framework import serializers as rfs

from .models import CloudProvider, Project


class CloudProviderSerializer(rfs.ModelSerializer):
    class Meta:
        model = CloudProvider
        fields = ("name",)


class ProjectProviderSerializer(rfs.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
