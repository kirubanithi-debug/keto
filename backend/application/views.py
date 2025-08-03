from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Application
from .serializer import ApplicationSerializer

class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    parser_classes = (MultiPartParser, FormParser)

class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    
    def get_queryset(self):
        email = self.request.query_params.get('email', None)
        if email:
            return Application.objects.filter(email=email).order_by('-id')
        return Application.objects.all()