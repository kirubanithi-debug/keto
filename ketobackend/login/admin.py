from django.contrib import admin
from django.urls import path, include

# Register your models here.
urlspatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Changed from 'login.urls' to 'api.urls'
]