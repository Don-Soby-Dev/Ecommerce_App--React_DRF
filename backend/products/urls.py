from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"", views.ProductModelAPIView, basename="product")

urlpatterns = [
    path("mine/", views.UsersProductListAPIView.as_view(), name="user_products"),
    path("", include(router.urls)),
]
