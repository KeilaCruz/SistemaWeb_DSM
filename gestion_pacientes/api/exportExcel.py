from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from ..resources import (
    PacienteResource,
    CitaResource,
    HistoriaNutricionResource,
    FichaPsiAdultoResource,
    FichaPsicoNinoResource,
    HistoriaClinicaResource,
    ExamenMedicoResource,
)
from ..models import (
    Paciente,
    Cita,
    HistoriaNutricion,
    FichaPsicologicaAdulto,
    FichaPsicologicaNiño,
    HojaEvaluacionClinica,
    ExamenMedico,
)
from tablib import Dataset


@permission_classes([IsAuthenticated])
class ExportPacientesVIEW(APIView):
    def get(self, request, *args, **kwargs):
        paciente_resource = PacienteResource()
        dataset = paciente_resource.export(Paciente.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="csv")
        excel_data = tablib_dataset.export("xlsx")

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-pacientes-actuales.xlsx'
        )
        return response

@permission_classes([IsAuthenticated])
class ExportCitasVIEW(APIView):
    def get(self, request, *args, **kwargs):
        cita_resource = CitaResource()
        dataset = cita_resource.export(Cita.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="csv")
        excel_data = tablib_dataset.export("xlsx")

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-citas-actuales.xlsx'
        )
        return response

@permission_classes([IsAuthenticated])
class ExportHistoriaNutricionVIEW(APIView):
    def get(self, request, *args, **kwargs):
        historia_nutricion_resource = HistoriaNutricionResource()
        dataset = historia_nutricion_resource.export(HistoriaNutricion.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="csv")
        excel_data = tablib_dataset.export("xlsx")

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-historias-nutricion.xlsx'
        )
        return response


class ExportFichaPsicoAdultoVIEW(APIView):
    def get(self, request, *args, **kwargs):
        ficha_adulto_resource = FichaPsiAdultoResource()
        dataset = ficha_adulto_resource.export(FichaPsicologicaAdulto.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="csv")
        excel_data = tablib_dataset.export("xlsx")

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-fichas-psicologicas-adulto.xlsx'
        )
        return response


class ExportFichaPsicoNinoVIEW(APIView):
    def get(self, request, *args, **kwargs):
        ficha_nino_resource = FichaPsicoNinoResource()
        dataset = ficha_nino_resource.export(FichaPsicologicaNiño.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="csv")
        excel_data = tablib_dataset.export("xlsx")

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-fichas-psicologicas-niño.xlsx'
        )
        return response


class ExportHojaEvaluacionVIEW(APIView):
    def get(self, request, *args, **kwargs):
        hoja_evaluacion_resource = HistoriaClinicaResource()
        dataset = hoja_evaluacion_resource.export(HojaEvaluacionClinica.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="csv")
        excel_data = tablib_dataset.export("xlsx")

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-hojas-evaluacion-clinica.xlsx'
        )
        return response


class ExportExamenMedicoVIEW(APIView):
    def get(self, request, *args, **kwargs):
        examen_medico_resource = ExamenMedicoResource()
        dataset = examen_medico_resource.export(ExamenMedico.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="csv")
        excel_data = tablib_dataset.export("xlsx")

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-examen-medico.xlsx'
        )
        return response
