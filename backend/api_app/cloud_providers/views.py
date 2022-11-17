from rest_framework import generics, permissions

from .serializers import CloudProviderSerializer


class CloudProviderListView(generics.ListAPIView):
    serializer_class = CloudProviderSerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_class = [permissions.IsAuthenticated]
