from django.urls import path
from gestion_pacientes.api.logueo import (
    LoginAPIView,
    CrearUsuarioView,
    VisualizarUsuarioView,
    RefreshTokenAPIView,
)
from gestion_pacientes.api.cita import CitaAPIView, AgendarCitaAPIView
from gestion_pacientes.api.paciente import (
    PacienteAPIView,
    RegistrarPacienteAPIView,
    BuscarPacienteAPIView,
    EditarPacienteAPIView,
)
from gestion_pacientes.api.nutricion import (
    HistoriaNutricionAPIView,
    RegistrarHistoriaNutricionAPIView,
)

urlpatterns = [
    path("paciente/", PacienteAPIView.as_view()),
    path("registrar_paciente/", RegistrarPacienteAPIView.as_view()),
    path("buscar_paciente/", BuscarPacienteAPIView.as_view()),
    path("cita/", CitaAPIView.as_view()),
    path("agendar_cita/", AgendarCitaAPIView.as_view()),
    path("crearusuario/", CrearUsuarioView.as_view()),
    path("visualizarusuario/", VisualizarUsuarioView.as_view()),
    path("iniciosesion", LoginAPIView.as_view()),
    path("actualizartoken", RefreshTokenAPIView.as_view()),
    path("editar_paciente/<str:CURP>/", EditarPacienteAPIView.as_view()),
    path("registrar_historia_nutricion", RegistrarHistoriaNutricionAPIView.as_view()),
]
