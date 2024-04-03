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
    ReagendarCitasPaciente
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
    path("paciente/", PacienteAPIView.as_view(), name="visualizar_pacientes"),
    path("registrar_paciente/", RegistrarPacienteAPIView.as_view(), name="registrar_paciente"),
    path("buscar_paciente/", BuscarPacienteAPIView.as_view(), name="buscar_paciente"),
    path("cita/", CitaAPIView.as_view(), name="citas"),
    path("agendar_cita/", AgendarCitaAPIView.as_view(), name="agendar_citas"),
    path("crearusuario/", CrearUsuarioView.as_view(), name="crear_usuarios"),
    path("visualizarusuario/", VisualizarUsuarioView.as_view(), name="visualizar_usuarios"),
    path("iniciosesion", LoginAPIView.as_view(), name="incio_sesion"),
    path("actualizartoken", RefreshTokenAPIView.as_view(), name="refrescar_token"),
    path("editar_paciente/<str:CURP>/", EditarPacienteAPIView.as_view(), name="editar_paciente"),
    path("registrar_historia_nutricion", RegistrarHistoriaNutricionAPIView.as_view(), name="registrar_historia_nutricion"),
    path("registrar_fichapsi_nino", RegistrarFichaPsiNiñoAPIView.as_view(), name="registrar_ficha_psico_niño"),
    path("registrar_fichapsi_adulto", RegistrarFichaPsiAdultoAPIView.as_view(), name="registrar_ficha_psico_adulto"),
    path("citas_paciente/<str:CURP>/", VisualizarCitasPaciente.as_view(), name='citas_paciente'),
    path("reagendar_cita/<int:idCita>/", ReagendarCitasPaciente.as_view(), name='reagendar_cita'),
]
