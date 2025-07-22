from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    USER_TYPES = (
        ('general', 'General User'),
        ('college', 'College User'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='general')

    def __str__(self):
        return f"{self.user.username} - {self.user_type}"
