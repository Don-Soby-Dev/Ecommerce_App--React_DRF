from django.shortcuts import render

from .permissions import IsSellerOrReadOnly
from .models import Category, Product
from .serializers import ProductSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)


class ProductModelAPIView(ModelViewSet):

    queryset = Product.objects.filter(is_sold=False)
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsSellerOrReadOnly]
    lookup_field = "slug"

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params
        category_slug = params.get("category", None)
        min_price = params.get("min_price", None)
        max_price = params.get("max_price", None)
        search_query = params.get("search", None)

        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if search_query:
            queryset = queryset.filter(title__icontains=search_query)

        return queryset


class UsersProductListAPIView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(seller=self.request.user)


class CategoryListAPIView(ListAPIView):

    queryset = Category.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
