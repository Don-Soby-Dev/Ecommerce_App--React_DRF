from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CheckoutSerializer, OrderSerializer
from .models import Order


class CheckoutAPIView(generics.GenericAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = CheckoutSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        response_serializer = OrderSerializer(order, context={"request": request})

        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ReadOnlyModelViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")
