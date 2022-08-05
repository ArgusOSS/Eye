# Create your models here.
from typing import Tuple

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken

from backend.Eye.authentication.exceptions import (
    UserAlreadyInOrganizationException,
    UserNotInOrganizationException,
)


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError("Users should have a username")
        if email is None:
            raise TypeError("Users should have a Email")

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError("Password should not be none")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


AUTH_PROVIDERS = {"email": "email"}


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, db_index=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_verified = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(
        max_length=255, blank=False, null=False, default=AUTH_PROVIDERS.get("email")
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


class Organization(models.Model):
    name = models.CharField(max_length=225)

    def __str__(self):
        return f"{str(self.name)}"


class Roles(models.TextChoices):
    OWNER = "owner"
    ADMIN = "admin"
    MEMBER = "member"


class OrganizationUser(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    organization = models.ForeignKey(to=Organization, on_delete=models.CASCADE)
    role = models.CharField(
        null=False,
        choices=Roles.choices,
    )

    def __str__(self):
        return f"{str(self.user.username)} {str(self.organization.name)}"

    @classmethod
    def is_in_an_organization(cls, user: User) -> bool:
        user_organizations = cls.objects.filter(user=user).first()
        if user_organizations:
            return True
        return False

    @classmethod
    def user_organizations(cls, user: User) -> Tuple:
        user_organizations = cls.objects.filter(user=user)
        return user_organizations

    @classmethod
    def user_exists_in_organization(cls, user: User, organization: Organization):
        user_organization = cls.objects.filter(user=user, organization=organization)
        if user_organization:
            return True
        return False

    @classmethod
    def add_user_to_organization(
        cls, user: User, organization: Organization, role: Roles = Roles.MEMBER
    ):
        user_organization = cls.objects.filter(
            user=user, organization=organization
        ).first()
        if user_organization is not None:
            raise UserAlreadyInOrganizationException()

        OU = cls(
            user=user,
            organization=organization,
            role=Roles.MEMBER,
        )
        OU.save()

    @classmethod
    def get_user_role_in_organization(cls, user: User, organization: Organization):
        user_organization = cls.objects.filter(
            user=user, organization=organization
        ).first()

        if user_organization is None:
            raise UserNotInOrganizationException()

        return user_organization.role
