import re

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User

EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"
PASSWORD_REGEX = r"^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$"


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_active", "date_joined", "password"]
        read_only_fields = ("id", "date_joined", "is_active")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user

    def validate_email(self, value):
        # Check if the email is unique
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        if not value or not re.match(EMAIL_REGEX, value):
            raise serializers.ValidationError("Invalid email format.")
        return value

    def validate_username(self, value):
        # Check if the username is unique
        if not value:
            raise serializers.ValidationError("Username cannot be empty.")
        return value

    def validate_password(self, value):
        # Check if the password is not empty
        if not value:
            raise serializers.ValidationError("Password cannot be empty.")
        if not re.match(PASSWORD_REGEX, value):
            raise serializers.ValidationError(
                "Password must be at least 8 characters long, contain no spaces, "
                "and include at least one uppercase letter, one number, and one special character."
            )
        return value


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    username_field = User.EMAIL_FIELD
