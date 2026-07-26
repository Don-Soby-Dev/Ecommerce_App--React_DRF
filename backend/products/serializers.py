import uuid
from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Product
from django.utils.text import slugify


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = (
            "id",
            "slug",
            "is_sold",
            "created_at",
            "updated_at",
            "seller",
        )

    def validate_price(self, value):
        if value < 0:
            raise ValidationError("Price must be a non-negative value.")
        return value

    def create(self, validated_data):

        validated_data["seller"] = self.context["request"].user

        return super().create(validated_data)
