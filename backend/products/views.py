from django.shortcuts import render

from .permissions import IsSellerOrReadOnly
from .models import Category, Product
from .serializers import ProductSerializer, CategorySerializer
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
        queryset = Product.objects.filter(seller=self.request.user)
        is_sold_param = self.request.query_params.get("is_sold", None)
        if is_sold_param is not None:
            if is_sold_param.lower() in ["true", "1"]:
                queryset = queryset.filter(is_sold=True)
            elif is_sold_param.lower() in ["false", "0"]:
                queryset = queryset.filter(is_sold=False)
        return queryset


class CategoryListAPIView(ListAPIView):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
