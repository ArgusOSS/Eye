from django.db import models


class AWSServices(models.TextChoices):
    LAMBDA_FUNCTIONS = "lambdafunctions"
    DYNAMO_DB = "dynamodb"
    RDS = "rds"
    EC2 = "ec2"
