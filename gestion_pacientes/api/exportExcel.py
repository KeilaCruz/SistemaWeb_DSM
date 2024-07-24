from rest_framework.views import APIView
from django.http import HttpResponse
from ..resources import PacienteResource, CitaResource
from ..models import Paciente, Cita
from tablib import Dataset


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


class ExportCitasVIEW(APIView):
    def get(self, request, *args, **kwargs):
        cita_resource = CitaResource()
        dataset = cita_resource.export(Cita.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format="cvs")
        excel_data = tablib_dataset.export("xlsx")
        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros-de-citas.xlsx'
        )
        return response
