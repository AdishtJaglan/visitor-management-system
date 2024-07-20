from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Visitor


class SuperAdmin(UserAdmin):
    list_display = (
        "username",
        "email",
        "name",
        "role_in_company",
        "tenure",
        "is_super_admin",
        "is_user",
        "is_staff",
        "is_active",
    )
    list_filter = ("is_super_admin", "is_user", "is_staff", "is_active")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "email",
                    "password",
                    "name",
                    "role_in_company",
                    "tenure",
                )
            },
        ),
        (
            "Permissions",
            {"fields": ("is_super_admin", "is_user", "is_staff", "is_active")},
        ),
    )


admin.site.register(User, SuperAdmin)
admin.site.register(Visitor)
