from rest_framework import serializers
from .models import User, Visitor


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_super_admin",
            "is_user",
            "role_in_company",
            "tenure",
            "phone_number",
            "address",
            "organisation",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class VisitorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = Visitor
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "address",
            "date_of_visit",
            "time_of_visit",
            "purpose_of_visit",
            "user_id",
            "request_time",
            "approved",
            "rejected",
            "pass_status",
        ]
