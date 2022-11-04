from django.urls import include, path
from rest_framework import routers

from .views import ServerViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"settings", ServerViewSet, basename="servers")

urlpatterns = [path("", include(router.urls))]
