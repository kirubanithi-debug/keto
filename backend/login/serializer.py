from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    userType = serializers.ChoiceField(choices=[('general','general'),('college','college')])
