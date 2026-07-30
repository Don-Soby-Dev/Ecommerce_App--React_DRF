from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("login/", views.CustomTokenObtainPairView.as_view(), name="login"),
    path(
        "token/refresh/", views.CustomTokenRefreshView.as_view(), name="token_refresh"
    ),
    path("register/", views.RegisterAPIView.as_view(), name="register"),
    path("logout/", views.LogoutAPIView.as_view(), name="logout"),
    path("user/", views.GetUserAPIView.as_view(), name="get_user"),
]
