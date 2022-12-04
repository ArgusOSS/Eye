from django.core.management.base import BaseCommand

from ...models import User


class Command(BaseCommand):
    help = "Setup cloud provider entry locally once"

    def handle(self, *args, **options):
        user = User.objects.create(
            username="demo",
            email="demo@demo.com",
            is_verified=True,
        )

        user.set_password("demo@demo12")

        user.save()

        print("Created demo user!")
        print(f"{user}")
