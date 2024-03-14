from django.urls import path
from gestion_pacientes.api.logueo import (
    LoginAPIView,
    CrearUsuarioView,
    VisualizarUsuarioView,
    RefreshTokenAPIView,
    BuscarUsuarioAPIView,
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

from gestion_pacientes.api.evento import (
    EventoAPIView,
    RegistrarEventoAPIView,
)

from gestion_pacientes.api.examenMedico import (
    ExamenMedicoAPIView,
    RegistrarExamenMedicoAPIView,
)

from gestion_pacientes.api.hojaEvaluacion import (
    HojaEvaluacionClinicaAPIView,
    RegistrarHojaEvaluacionAPIView,
)


urlpatterns = [
    path("paciente/", PacienteAPIView.as_view()),
    path("registrar_paciente/", RegistrarPacienteAPIView.as_view()),
    path("buscar_paciente/", BuscarPacienteAPIView.as_view()),
    path("cita/", CitaAPIView.as_view()),
    path("agendar_cita/", AgendarCitaAPIView.as_view()),
    path("crear_usuario/", CrearUsuarioView.as_view()),
    path("buscar_usuario/", BuscarUsuarioAPIView.as_view()),
    path("visualizar_usuario/", VisualizarUsuarioView.as_view()),
    path("iniciosesion", LoginAPIView.as_view()),
    path("actualizartoken", RefreshTokenAPIView.as_view()),
    path("editar_paciente/<str:CURP>/", EditarPacienteAPIView.as_view()),
    path("registrar_historia_nutricion", RegistrarHistoriaNutricionAPIView.as_view()),
    path("registrar_fichapsi_nino", RegistrarFichaPsiNiñoAPIView.as_view()),
    path("registrar_fichapsi_adulto", RegistrarFichaPsiAdultoAPIView.as_view()),
    path("registrar_evento/", RegistrarEventoAPIView.as_view()),
    path("registrar_examen_medico/", RegistrarExamenMedicoAPIView.as_view()),
    path("examen_medico/", ExamenMedicoAPIView.as_view()),
    path("registrar_hoja_evaluacion/", RegistrarHojaEvaluacionAPIView.as_view()),
    path("hoja_evaluacion/", HojaEvaluacionClinicaAPIView.as_view()),
]
