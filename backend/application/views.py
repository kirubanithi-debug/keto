from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import response
from rest_framework import status , generics
from .models import Application
from .serializer import ApplicationSerializer

class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    parser_classes = (MultiPartParser, FormParser)