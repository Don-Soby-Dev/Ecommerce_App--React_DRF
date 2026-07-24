from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully.",
                    "user": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):

        refresh_token = request.data.get("refresh_token")

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "User logged out successfully."}, status=status.HTTP_200_OK)
