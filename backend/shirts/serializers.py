from rest_framework import serializers as rfs
from django.contrib.auth import get_user_model

User = get_user_model()

class AddShirtsSizeSerializer(rfs.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "shirt_size",
        )
