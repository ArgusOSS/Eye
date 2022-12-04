import datetime as dt
from datetime import timedelta

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

        # Filter for a specific server
        server_id = self.request.query_params.get("server_id", None)
        if server_id is not None:
            queryset = queryset.filter(server_id=server_id)

        # Give an explicit mode
        mode = self.request.query_params.get("mode", None)
        if mode is not None:
            queryset = queryset.filter(mode=mode)

        # Filter for a specific date
        date = self.request.query_params.get("date", None)
        if date is not None:
            date = dt.date.fromisoformat(date)
            queryset = queryset.filter(created_at__date=date)

        # Filter for a datetime range
        start = self.request.query_params.get("start", None)
        end = self.request.query_params.get("end", None)  # always the greater date
        if start or end:
            defaultend = dt.datetime.today().date() + timedelta(1)
            defaultstart = defaultend - timedelta(1)
            start = defaultstart if None else start
            end = defaultend if None else end
            # ^ this wasy if only one is provided
            # we have default values ready to be assigned
            queryset = queryset.filter(created_at__range=[str(start), str(end)])

        queryset = queryset.order_by("-id")

        return queryset


class ListServerPingHistory(generics.ListAPIView):
    serializer_class = ServerHistorySerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [IsAuthenticated]
