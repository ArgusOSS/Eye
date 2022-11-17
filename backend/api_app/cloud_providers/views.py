from rest_framework import generics, permissions, viewsets

from .serializers import CloudProviderSerializer, ProjectProviderSerializer


class CloudProviderListView(generics.ListAPIView):
    serializer_class = CloudProviderSerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [permissions.IsAuthenticated]


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectProviderSerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [permissions.IsAuthenticated]
