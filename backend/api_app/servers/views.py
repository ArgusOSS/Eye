# from rest_framework import serializers as rfs
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import ServerHistorySerializer, SettingsSerializer


class ServerViewSet(viewsets.ModelViewSet):
    serializer_class = SettingsSerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [IsAuthenticated]


class ListServerPingHistory(generics.ListAPIView):
    serializer_class = ServerHistorySerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [IsAuthenticated]
