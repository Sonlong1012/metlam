from django.db import models

class Member(models.Model):
    name = models.CharField(max_length=255, null=True)
    description = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
