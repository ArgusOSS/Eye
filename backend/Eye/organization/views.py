from rest_framework.viewsets import GenericViewSet

from .models import Organization
from .serializers import OrganizationSerializer

__all__ = ["OrganizationViewSet"]


class OrganizationViewSet(GenericViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
