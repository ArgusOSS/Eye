from django.core.management.base import BaseCommand

from api_app.cloud_providers.models import CloudProvider


def createAWS():
    print("Making an entry for AWS in the db..")
    aws = CloudProvider.objects.create(
        name="AWS",
        secrets={
            "AWS_ACCESS_KEY_ID": "",
            "AWS_SECRET_ACCESS_KEY": "",
        },
    )
    aws.save()
    print("Success!")


class Command(BaseCommand):
    help = "Setup cloud provider entry locally once"

    def handle(self, *args, **options):
        existing_providers = {"AWS": createAWS}
        print("Checking for not created instances..")
        created_new = 0
        for provider in existing_providers:
            lookup = CloudProvider.objects.filter(name=provider).first()
            if lookup is None:
                print(f"Found {provider} to not exist yet in the db.\n" "adding..")
                existing_providers[provider]()
                created_new += 1
        if created_new == 0:
            print("Did not create any new entry in the db. Exiting..")
