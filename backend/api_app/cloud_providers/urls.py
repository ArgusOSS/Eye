from django.urls import include, path
from rest_framework import routers

from .views import CloudProviderListView, ProjectViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"projects", ProjectViewSet, basename="projects")

urlpatterns = [
    path("", include(router.urls)),
    path("list", CloudProviderListView.as_view()),
]
