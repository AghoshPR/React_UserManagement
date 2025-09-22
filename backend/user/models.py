from django.db import models
import os
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):

    phone = models.CharField(max_length=12,blank=True,null=True)
    profile_image = models.ImageField(upload_to='profiles/',blank=True,null=True)

    def save(self, *args, **kwargs):
        try:
            old_instance = CustomUser.objects.get(pk=self.pk)
            if old_instance.profile_image and old_instance.profile_image != self.profile_image:
                if os.path.isfile(old_instance.profile_image.path):
                    os.remove(old_instance.profile_image.path)
        except CustomUser.DoesNotExist:
            pass
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

