from django.db import models

class ShirtSize(models.TextChoices):
    XS = 'xs'
    S = 's'
    M = 'm'
    L = 'l'
    XL = 'xl'
