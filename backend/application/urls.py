from django.urls import path
from .views import ApplicationCreateView, ApplicationListView

urlpatterns = [
    path('apply/', ApplicationCreateView.as_view(), name='job_application_create'),
    path('apply/list/', ApplicationListView.as_view(), name='job_application_list'),
]