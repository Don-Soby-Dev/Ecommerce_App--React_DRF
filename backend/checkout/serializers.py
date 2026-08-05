from rest_framework import serializers
from cart.models import Cart, CartItem
from products.serializers import ProductSerializer
from .models import Order, OrderItem
from django.db import transaction


class OrderItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "price_at_purchase"]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "total_price", "status", "created_at", "items"]
        read_only_fields = [
            "id",
            "user",
            "total_price",
            "status",
            "created_at",
            "items",
        ]


class CheckoutSerializer(serializers.Serializer):

    cart_id = serializers.UUIDField(required=False, allow_null=True)

    def validate(self, attrs):
        cart_id = attrs.get("cart_id")
        user = self.context["request"].user

        if cart_id:
            try:
                cart = Cart.objects.get(id=cart_id, user=user)
            except Cart.DoesNotExist:
                raise serializers.ValidationError("Invalid cart ID.")
        else:
            cart = Cart.objects.filter(user=user).first()

        if not cart or not cart.items.exists():
            raise serializers.ValidationError("Your cart is empty.")

        attrs["cart"] = cart
        return attrs

    def create(self, validated_data):
        user = self.context["request"].user
        cart = validated_data["cart"]

        with transaction.atomic():

            cart_items = CartItem.objects.filter(cart=cart).select_related("product")

            product_ids = [item.product.id for item in cart_items]

            products = list(
                cart_items.model.product.field.related_model.objects.select_for_update().filter(
                    id__in=product_ids
                )
            )

            product_map = {product.id: product for product in products}

            sold_out_products = [p.title for p in products if p.is_sold]

            if sold_out_products:
                raise serializers.ValidationError(
                    f"The following products are sold out: {', '.join(sold_out_products)}"
                )

            total_price = sum(p.price for p in products)

            order = Order.objects.create(
                user=user, total_price=total_price, status="completed"
            )

            order_items = []

            for item in cart_items:
                product = product_map[item.product.id]

                order_items.append(
                    OrderItem(
                        order=order,
                        product=product,
                        price_at_purchase=product.price,
                    )
                )

                product.is_sold = True

            # Bulk create order items and update product status
            OrderItem.objects.bulk_create(order_items)
            cart_items.model.product.field.related_model.objects.bulk_update(
                products, ["is_sold"]
            )

            cart.items.all().delete()

            return order
