from typing import List

from django.conf import settings
from django.db import models

from ..authentication.models import User
from .exceptions import UserAlreadyInOrganizationException


class Organization(models.Model):
    name = models.CharField(max_length=225)

    def __str__(self):
        return f"{str(self.name)}"

    @classmethod
    def create(cls, name: str):
        org = cls.objects.create(name=name)
        org.save()  # usually call Memebership.create() after this.


class Membership(models.Model):
    class Meta:
        unique_together = [
            ("user", "organization"),
        ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="membership",
        on_delete=models.CASCADE,
    )

    is_owner = models.BooleanField(default=False)

    # let's make it so that admin and owner is the same. screw it.

    organization = models.ForeignKey(to=Organization, on_delete=models.CASCADE)

    def __str__(self):
        return f"{str(self.user.username)} {str(self.organization.name)}"

    @classmethod
    def create(cls, user: User, organization: Organization):
        membership = cls.objects.create(
            user=user, organization=organization, is_owner=True
        )
        membership.save()

    @classmethod
    def is_in_an_organization(cls, user: User) -> bool:
        user_organizations = cls.objects.filter(user=user).first()
        if user_organizations:
            return True
        return False

    @classmethod
    def user_organizations(cls, user: User) -> List:
        user_organizations = cls.objects.filter(user=user)
        return list(user_organizations)

    @classmethod
    def user_exists_in_organization(cls, user: User, organization: Organization):
        user_organization = cls.objects.filter(user=user, organization=organization)
        if user_organization:
            return True
        return False

    @classmethod
    def add_user_to_organization(
        cls,
        user: User,
        organization: Organization,
    ):
        user_organization = cls.objects.filter(
            user=user, organization=organization
        ).first()
        if user_organization is not None:
            raise UserAlreadyInOrganizationException()

        membership = cls(
            user=user,
            organization=organization,
            is_owner=False,
        )
        membership.save()
