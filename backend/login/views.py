from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Profile

class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user_type = request.data.get("userType")

        if not (email and password and user_type):
            return Response({"detail": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Check password
        user_auth = authenticate(username=user.username, password=password)
        if not user_auth:
            return Response({"detail": "Incorrect credentials."}, status=status.HTTP_400_BAD_REQUEST)

        # Check user type
        if not hasattr(user, "profile") or user.profile.user_type != user_type:
            return Response({"detail": f"Incorrect user type. Expected {user.profile.user_type}."}, status=status.HTTP_400_BAD_REQUEST)

        # For production, send a token. Here, we just confirm login.
        return Response({
            "message": "Login successful.",
            "username": user.username,
            "email": user.email,
            "user_type": user.profile.user_type,
        })

