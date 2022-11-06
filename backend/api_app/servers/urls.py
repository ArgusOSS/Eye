from django.urls import include, path
from rest_framework import routers

from .views import ListServerPingHistory, ServerViewSet, ServerHistoryViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"settings", ServerViewSet, basename="servers")
router.register(r"history", ServerHistoryViewSet, basename="history")

urlpatterns = [
    path("", include(router.urls)),
    path("list", ListServerPingHistory.as_view(), name="list-server-ping"),
]
