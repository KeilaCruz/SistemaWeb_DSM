from django.urls import path
from gestion_pacientes.api.api import PacienteAPIView, CitaAPIView

urlpatterns = [
    path("paciente/", PacienteAPIView.as_view()),
    path("cita/", CitaAPIView.as_view()),
]
