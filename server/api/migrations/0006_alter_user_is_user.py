# Generated by Django 5.0.6 on 2024-07-24 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_user_organisation_delete_organisation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_user',
            field=models.BooleanField(default=True),
        ),
    ]
