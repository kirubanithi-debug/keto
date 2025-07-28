from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
         model = Application
         fields = "__all__"

    def validate_phone(self, value):
           """Only allow 10 digit phone numbers (numbers only)"""
           import re
           phone = re.sub(r'\D', '', value)
           if len(phone) != 10:
               raise serializers.ValidationError("Phone number must be 10 digits.")
           return value
