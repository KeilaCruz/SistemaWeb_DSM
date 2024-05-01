from django.urls import path
from gestion_pacientes.api.logueo import (
    LoginAPIView,
    CrearUsuarioView,
    VisualizarUsuarioView,
    RefreshTokenAPIView,
)
from gestion_pacientes.api.cita import (
    CitaActivasAPIView,
    CitaInactivasAPIView,
    AgendarCitaAPIView,
    VisualizarCitasPaciente,
    ReagendarCitasPaciente,
    MarcarAsistenciaCita,
)
from gestion_pacientes.api.paciente import (
    PacienteAPIView,
    RegistrarPacienteAPIView,
    BuscarPacienteAPIView,
    EditarPacienteAPIView,
    HistorialClinicoAPIView,
)
from gestion_pacientes.api.nutricion import (
    RegistrarHistoriaNutricionAPIView,
    CalculadoraIMCAPIVIEW,
    CalculadoraCircuferenciaCintura,
)
from gestion_pacientes.api.psicologia import (
    RegistrarFichaPsiNiñoAPIView,
    RegistrarFichaPsiAdultoAPIView,
    FichaPsicoAdultoAPIView,
    FichaPsicoNiñoAPIView,
    VisualizarFichaPsicoAdultoPaciente,
    VisualizarFichaPsicoNiñoPaciente,
)

urlpatterns = [
    path("paciente/", PacienteAPIView.as_view(), name="visualizar_pacientes"),
    path("registrar_paciente/", RegistrarPacienteAPIView.as_view(), name="registrar_paciente"),
    path("buscar_paciente/", BuscarPacienteAPIView.as_view(), name="buscar_paciente"),
    path("cita_activas/", CitaActivasAPIView.as_view(), name="citas_activas"),
    path("cita_inactivas/", CitaInactivasAPIView.as_view(), name="citas_inactivas"),
    path("agendar_cita/", AgendarCitaAPIView.as_view(), name="agendar_citas"),
    path("crearusuario/", CrearUsuarioView.as_view(), name="crear_usuarios"),
    path("visualizarusuario/", VisualizarUsuarioView.as_view(), name="visualizar_usuarios"),
    path("iniciosesion", LoginAPIView.as_view(), name="incio_sesion"),
    path("actualizartoken", RefreshTokenAPIView.as_view(), name="refrescar_token"),
    path("editar_paciente/<str:CURP>/", EditarPacienteAPIView.as_view(), name="editar_paciente"),
    path("registrar_historia_nutricion", RegistrarHistoriaNutricionAPIView.as_view(), name="registrar_historia_nutricion"),
    path("calcular_imc/<altura>/<int:peso>/", CalculadoraIMCAPIVIEW.as_view(), name="calculadora_imc"),
    path("calculadora_circuferencia/<str:genero>/<int:circuferencia>/", CalculadoraCircuferenciaCintura.as_view(), name="calculadora_circuferencia"),
    path("visualizar_fichapsi_adulto", FichaPsicoAdultoAPIView.as_view(), name="visualizar_fichapsico_adulto"),
    path("visualizar_fichapsi_nino", FichaPsicoNiñoAPIView.as_view(), name="visualizar_fichapsico_niño"),
    path("fichapsico_paciente_adulto/<str:idPaciente>/", VisualizarFichaPsicoAdultoPaciente.as_view(), name="fichapsico_paciente_adulto"),
    path("fichapsico_paciente_nino/<str:idPaciente>/", VisualizarFichaPsicoNiñoPaciente.as_view(), name="fichapsico_paciente_niño"),
    path("registrar_fichapsi_nino", RegistrarFichaPsiNiñoAPIView.as_view(), name="registrar_ficha_psico_niño"),
    path("registrar_fichapsi_adulto", RegistrarFichaPsiAdultoAPIView.as_view(), name="registrar_ficha_psico_adulto"),
    path("citas_paciente/<str:CURP>/", VisualizarCitasPaciente.as_view(), name='citas_paciente'),
    path("reagendar_cita/<int:idCita>/", ReagendarCitasPaciente.as_view(), name='reagendar_cita'),
    path("historial_clinico/<str:idPaciente>/", HistorialClinicoAPIView.as_view(), name='historial_clinico'),
    path("marcar_asistencia/<int:idCita>/", MarcarAsistenciaCita.as_view(), name='marcar_asistencia_cita'),
]
