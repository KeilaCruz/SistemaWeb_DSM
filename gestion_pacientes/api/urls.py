from django.urls import path
from gestion_pacientes.api.logueo import (
    LoginAPIView,
    CrearUsuarioView,
    VisualizarUsuarioView,
    RefreshTokenAPIView,
    BuscarUsuarioAPIView,
    EditarUsuario,
)
from gestion_pacientes.api.cita import (
    CitaActivasAPIView,
    CitaInactivasAPIView,
    AgendarCitaAPIView,
    VisualizarCitasPaciente,
    ReagendarCitasPaciente,
    MarcarAsistenciaCita,
    BuscarCitas,
)
from gestion_pacientes.api.paciente import (
    PacienteAPIView,
    RegistrarPacienteAPIView,
    BuscarPacienteAPIView,
    EditarPacienteAPIView,
    HistorialClinicoAPIView,
    NewExamenMedicoAPIView
)
from gestion_pacientes.api.nutricion import (
    RegistrarHistoriaNutricionAPIView,
    CalculadoraIMCAPIVIEW,
    CalculadoraCircuferenciaCintura,
    HistoriaNutricionAPIView,
    VisualizarFichaNutricionPaciente,
    BuscarHistoriaNutricion,
)
from gestion_pacientes.api.psicologia import (
    RegistrarFichaPsiNiñoAPIView,
    RegistrarFichaPsiAdultoAPIView,
    FichaPsicoAdultoAPIView,
    FichaPsicoNiñoAPIView,
    VisualizarFichaPsicoAdultoPaciente,
    VisualizarFichaPsicoNiñoPaciente,
    RegistrarEvaluacionAdulto,
    RegistrarEvaluacionNiño,
    VisualizarEvaluacionAdulto,
    VisualizarEvaluacionNiño,
    BuscarFichasPsicologiaAdulto,
    BuscarFichasPsicologiaNiño,
)

from gestion_pacientes.api.evento import (
    EventoAPIView,
    RegistrarEventoAPIView,
    EditarEventoAPIView

)

from gestion_pacientes.api.examenMedico import (
    ExamenMedicoAPIView,
    RegistrarExamenMedicoAPIView,
    EditarExamenMedicoAPIView,
)

from gestion_pacientes.api.hojaEvaluacion import (
    HojaEvaluacionClinicaAPIView,
    RegistrarHojaEvaluacionAPIView,
    EditarHojaEvaluacionAPIView,
)

from gestion_pacientes.api.exportExcel import (
    ExportPacientesVIEW,
)
urlpatterns = [
    path("paciente/", PacienteAPIView.as_view(), name="visualizar_pacientes"),
    path("registrar_paciente/", RegistrarPacienteAPIView.as_view(), name="registrar_paciente"),
    path("buscar_paciente/", BuscarPacienteAPIView.as_view(), name="buscar_paciente"),
    path("cita_activas/", CitaActivasAPIView.as_view(), name="citas_activas"),
    path("cita_inactivas/", CitaInactivasAPIView.as_view(), name="citas_inactivas"),
    path("agendar_cita/", AgendarCitaAPIView.as_view(), name="agendar_citas"),
    path("crear_usuario/", CrearUsuarioView.as_view(), name="crear_usuarios"),
    path("buscar_usuario/", BuscarUsuarioAPIView.as_view()),
    path("visualizar_usuario/", VisualizarUsuarioView.as_view(), name="visualizar_usuarios"),
    path("editar_usuario/<str:id>/", EditarUsuario.as_view()),
    path("iniciosesion", LoginAPIView.as_view(), name="incio_sesion"),
    path("actualizartoken", RefreshTokenAPIView.as_view(), name="refrescar_token"),
    path("editar_paciente/<str:CURP>/", EditarPacienteAPIView.as_view(), name="editar_paciente"),
    path("registrar_historia_nutricion", RegistrarHistoriaNutricionAPIView.as_view(), name="registrar_historia_nutricion"),
    path("visualizar_historia_nutricion", HistoriaNutricionAPIView.as_view(), name="visualizar_historia_nutricion"),
    path("visualizar_historia_nutricion/<str:idPaciente>/", VisualizarFichaNutricionPaciente.as_view(), name="visualizar_historia_nutricion_paciente"),
    path("calcular_imc/<altura>/<int:peso>/", CalculadoraIMCAPIVIEW.as_view(), name="calculadora_imc"),
    path("calculadora_circuferencia/<str:genero>/<int:circuferencia>/", CalculadoraCircuferenciaCintura.as_view(), name="calculadora_circuferencia"),
    path("visualizar_fichapsi_adulto", FichaPsicoAdultoAPIView.as_view(), name="visualizar_fichapsico_adulto"),
    path("visualizar_fichapsi_nino", FichaPsicoNiñoAPIView.as_view(), name="visualizar_fichapsico_niño"),
    path("fichapsico_paciente_adulto/<str:idPaciente>/", VisualizarFichaPsicoAdultoPaciente.as_view(), name="fichapsico_paciente_adulto"),
    path("fichapsico_paciente_nino/<str:idPaciente>/", VisualizarFichaPsicoNiñoPaciente.as_view(), name="fichapsico_paciente_niño"),
    path("historia_nutricion/", HistoriaNutricionAPIView.as_view()),
    path("registrar_evolucion_nino", RegistrarEvaluacionNiño.as_view(), name="registrar_evolucion_psico_niño"),
    path("registrar_evolucion_adulto", RegistrarEvaluacionAdulto.as_view(), name="registrar_evolucion_psico_adulto"),
    path("visualizar_evolucion_adulto/<str:CURP>/", VisualizarEvaluacionAdulto.as_view(), name="visualizar_evaluacion_adulto"),
    path("visualizar_evolucion_ninio/<str:CURP>/", VisualizarEvaluacionNiño.as_view(), name="visualizar_evaluacion_niño"),
    path("registrar_fichapsi_nino", RegistrarFichaPsiNiñoAPIView.as_view(), name="registrar_ficha_psico_niño"),
    path("registrar_fichapsi_adulto", RegistrarFichaPsiAdultoAPIView.as_view(), name="registrar_ficha_psico_adulto"),
    path("registrar_evento/", RegistrarEventoAPIView.as_view()),
    path("evento/", EventoAPIView.as_view()),
    path("editar_evento/<str:idEvento>/", EditarEventoAPIView.as_view()),
    path("buscar_historia_nutricion/<str:idPaciente>/", BuscarHistoriaNutricion.as_view(), name="buscar_historia_nutricion"),
    path("buscar_cita/<str:idPaciente>/", BuscarCitas.as_view(), name="buscar_citas"),
    path("buscar_ficha_psico_adulto/<str:idPaciente>/", BuscarFichasPsicologiaAdulto.as_view(), name="buscar_fichas_adulto"),
    path("buscar_ficha_psico_ninio/<str:idPaciente>/", BuscarFichasPsicologiaNiño.as_view(), name="buscar_fichas_niño"),


    path("registrar_examen_medico/", RegistrarExamenMedicoAPIView.as_view()),
    path("examen_medico/", ExamenMedicoAPIView.as_view()),
    path("editar_examen_medico/<str:idExamenMedico>/", EditarExamenMedicoAPIView.as_view()),
    path("registrar_hoja_evaluacion/", RegistrarHojaEvaluacionAPIView.as_view()),
    path("hoja_evaluacion/", HojaEvaluacionClinicaAPIView.as_view()),
    path("editar_hoja_evaluacion/<str:idHojaClinica>/", EditarHojaEvaluacionAPIView.as_view()),


    
    
    path("citas_paciente/<str:CURP>/", VisualizarCitasPaciente.as_view(), name='citas_paciente'),
    path("reagendar_cita/<int:idCita>/", ReagendarCitasPaciente.as_view(), name='reagendar_cita'),
    path("historial_clinico/<str:idPaciente>/", HistorialClinicoAPIView.as_view(), name='historial_clinico'),
    path("examen_medico_new/<str:idPaciente>/", NewExamenMedicoAPIView.as_view(), name='historial_clinico'),
    path("marcar_asistencia/<int:idCita>/", MarcarAsistenciaCita.as_view(), name='marcar_asistencia_cita'),
    
    
    path("exportar/pacientes/", ExportPacientesVIEW.as_view(), name='exportar_pacientes'),
]
