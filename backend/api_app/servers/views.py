from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import ServerHistorySerializer, SettingsSerializer


class ServerViewSet(viewsets.ModelViewSet):
    serializer_class = SettingsSerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [IsAuthenticated]

class ServerHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ServerHistorySerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()

        server_id = self.request.query_params.get('server_id', None)
        if server_id is not None:
            queryset = queryset.filter(server_id=server_id)

        return queryset

class ListServerPingHistory(generics.ListAPIView):
    serializer_class = ServerHistorySerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [IsAuthenticated]
