from django.urls import path

from .views import UpdateShirtSize

urlpatterns = [
    path("accept-size", UpdateShirtSize.as_view(), name="accpet_size"),
]
