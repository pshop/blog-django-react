from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import SetupSession

urlpatterns = [
    path('geography/setup', SetupSession.as_view(), name='setup_session'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
