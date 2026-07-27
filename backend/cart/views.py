from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

from products.models import Product


class CartViewSet(viewsets.GenericViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def get_cart(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

    def list(self, request):
        cart = self.get_cart()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["post"],
        url_path="items",
        url_name="add_item",
        serializer_class=CartItemSerializer,
    )
    def add_item(self, request):
        cart = self.get_cart()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            return Response(
                {"detail": "Product is already in the cart."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        out_serializer = CartItemSerializer(cart_item, context={"request": request})
        return Response(out_serializer.data, status=status.HTTP_201_CREATED)

    @action(
        detail=False,
        methods=["delete"],
        url_path="items/(?P<item_id>[^/.]+)",
        url_name="remove_item",
    )
    def remove_item(self, request, item_id):
        cart = self.get_cart()
        try:
            cart_item = CartItem.objects.get(cart=cart, id=item_id)
        except CartItem.DoesNotExist:
            return Response(
                {"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND
            )

        cart_item.delete()
        return Response(
            {"detail": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT
        )

    @action(detail=False, methods=["delete"], url_path="clear", url_name="clear_cart")
    def clear_cart(self, request):
        cart = self.get_cart()
        cart.items.all().delete()
        return Response(
            {"detail": "Cart cleared successfully."}, status=status.HTTP_204_NO_CONTENT
        )
