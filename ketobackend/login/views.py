from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow unauthenticated access for login
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user_type = request.data.get("userType", "general")

    if not email or not password:
        return Response({
            "success": False,
            "message": "Email and password are required"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Find user by email
        user = User.objects.get(email=email)
        
        # Authenticate using username (since Django authenticates with username)
        auth_user = authenticate(username=user.username, password=password)
        
        if auth_user:
            # Create or get token
            token, created = Token.objects.get_or_create(user=auth_user)
            
            return Response({
                "success": True,
                "message": f"Login successful as {user_type} user",
                "token": token.key,
                "user": {
                    "id": auth_user.id,
                    "username": auth_user.username,
                    "email": auth_user.email,
                },
                "userType": user_type
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)
            
    except User.DoesNotExist:
        return Response({
            "success": False,
            "message": "User not found"
        }, status=status.HTTP_404_NOT_FOUND)