from rest_framework import permissions, generics
from rest_framework.response import Response

from .serializers import AddShirtsSizeSerializer, User

class UpdateShirtSize(generics.UpdateAPIView):
    serializer_class = AddShirtsSizeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "success"})

        else:
            return Response({"message": "failed", "details": serializer.errors})
