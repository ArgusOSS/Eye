from rest_flex_fields.serializers import FlexFieldsModelSerializer
from rest_framework import serializers as rfs

from .models import Membership, Organization


class _UserMemberSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Membership

    joined = rfs.DateTimeField(source="created_at")
    username = rfs.CharField(source="user.username")


class OrganizationSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Organization
        expandable_fields = {
            "members": (_UserMemberSerializer, {"many": True, "read_only": True}),
        }

    member_count = rfs.IntegerField(read_only=True)
    owner = _UserMemberSerializer
