from django.urls import path
from gestion_pacientes.api.api import PacienteAPIView, CitaAPIView, CrearUsuarioView, VisualizarUsuarioView

urlpatterns = [
    path("paciente/", PacienteAPIView.as_view()),
    path("cita/", CitaAPIView.as_view()),
    path("crearusuario/", CrearUsuarioView.as_view()),
    path("visualizarusuario/", VisualizarUsuarioView.as_view()),
]
