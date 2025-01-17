from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from .managers import UserManager


class User(AbstractUser):
    is_super_admin = models.BooleanField(default=False)
    is_user = models.BooleanField(default=True)
    role_in_company = models.CharField(max_length=255)
    tenure = models.IntegerField(help_text="Tenure in years")
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True, null=True)
    organisation = models.CharField(max_length=255)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_set",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_set",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    objects = UserManager()

    def __str__(self):
        return self.username


class Visitor(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    address = models.TextField(blank=True, null=True)
    date_of_visit = models.DateField()
    time_of_visit = models.TimeField()
    purpose_of_visit = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="visitors")
    request_time = models.DateTimeField(default=timezone.now)
    approved = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    pass_status = models.CharField(
        max_length=20,
        choices=[
            ("Pending", "Pending"),
            ("Approved", "Approved"),
            ("Rejected", "Rejected"),
        ],
        default="Pending",
    )

    def save(self, *args, **kwargs):
        if self.approved:
            self.pass_status = "Approved"
        elif self.rejected:
            self.pass_status = "Rejected"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
