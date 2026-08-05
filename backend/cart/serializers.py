from rest_framework import serializers

from .models import Cart, CartItem
from products.models import Product
from products.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source="product", write_only=True
    )

    class Meta:
        model = CartItem
        fields = ("id", "product", "product_id", "created_at", "updated_at")

    def create(self, validated_data):
        product = validated_data["product"]
        request = self.context["request"]

        if request and request.user != product.seller:
            raise serializers.ValidationError(
                "You cannot add your own product to the cart."
            )

        return super().create(validated_data)


class CartSerializer(serializers.ModelSerializer):
    # Nest all items attached to this cart
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ("id", "user", "items", "created_at", "updated_at")
        read_only_fields = ("id", "user", "created_at", "updated_at")
