from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import SettingsSerializer


class ServerViewSet(viewsets.ModelViewSet):
    serializer_class = SettingsSerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [IsAuthenticated]
