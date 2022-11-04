from rest_framework import serializers as rfs

from .models import Server


class SettingsSerializer(rfs.ModelSerializer):
    class Meta:
        model = Server
        fields = rfs.ALL_FIELDS
