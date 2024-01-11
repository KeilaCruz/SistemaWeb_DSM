from django.urls import path
from gestion_pacientes.api.api import PacienteAPIView, PacienteDetailAPIView, CitaAPIView
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path("paciente/", PacienteAPIView.as_view()),
    path("paciente/<int:pk>/", PacienteDetailAPIView.as_view()),
    path("cita/", CitaAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

