"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from products.views import CategoryListAPIView
from checkout.views import CheckoutAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("users.urls")),  # Included the users app URLs
    path("api/products/", include("products.urls")),  # Included the products app URLs
    path("api/cart/", include("cart.urls")),  # Included the cart app URLs
    path("api/orders/", include("checkout.urls")),
    path(
        "api/checkout/", CheckoutAPIView.as_view(), name="checkout"
    ),  # Included the checkout app URLs
    path("api/categories/", CategoryListAPIView.as_view(), name="category_list"),
]
