from rest_framework import serializers as rfs

from .models import Server, ServerPingHistory


class SettingsSerializer(rfs.ModelSerializer):
    class Meta:
        model = Server
        fields = rfs.ALL_FIELDS


class ServerHistorySerializer(rfs.ModelSerializer):
    class Meta:
        model = ServerPingHistory
        fields = rfs.ALL_FIELDS
