from django.urls import path

from .views import CloudProviderListView

urlpatterns = [
    path("list", CloudProviderListView.as_view()),
]
