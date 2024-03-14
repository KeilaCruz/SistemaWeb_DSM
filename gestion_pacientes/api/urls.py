from django.urls import path
from gestion_pacientes.api.logueo import (
    LoginAPIView,
    CrearUsuarioView,
    VisualizarUsuarioView,
    RefreshTokenAPIView,
)
from gestion_pacientes.api.cita import (
    CitaAPIView,
    AgendarCitaAPIView,
    VisualizarCitasPaciente,
)
from gestion_pacientes.api.paciente import (
    PacienteAPIView,
    RegistrarPacienteAPIView,
    BuscarPacienteAPIView,
    EditarPacienteAPIView,
)
from gestion_pacientes.api.nutricion import (
    RegistrarHistoriaNutricionAPIView,
)
from gestion_pacientes.api.psicologia import (
    RegistrarFichaPsiNiñoAPIView,
    RegistrarFichaPsiAdultoAPIView,
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
    path("registrar_fichapsi_nino", RegistrarFichaPsiNiñoAPIView.as_view()),
    path("registrar_fichapsi_adulto", RegistrarFichaPsiAdultoAPIView.as_view()),
    path("citas_paciente/<str:CURP>/", VisualizarCitasPaciente.as_view(), name='citas_paciente'),
]
