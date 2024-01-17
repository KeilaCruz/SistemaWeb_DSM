from django.urls import path
from gestion_pacientes.api.logueo import LoginAPIView, CrearUsuarioView,VisualizarUsuarioView
from gestion_pacientes.api.cita import CitaAPIView,AgendarCitaAPIView
from gestion_pacientes.api.paciente import PacienteAPIView, RegistrarPacienteAPIView, BuscarPacienteAPIView

urlpatterns = [
    path("paciente/", PacienteAPIView.as_view()),
    path("registrar_paciente/", RegistrarPacienteAPIView.as_view()),
    path("buscar_paciente/", BuscarPacienteAPIView.as_view()),
    path("cita/", CitaAPIView.as_view()),
    path("agendar_cita/", AgendarCitaAPIView.as_view()),
    path("crearusuario/", CrearUsuarioView.as_view()),
    path("visualizarusuario/", VisualizarUsuarioView.as_view()),
    path("iniciosesion", LoginAPIView.as_view()),
]
