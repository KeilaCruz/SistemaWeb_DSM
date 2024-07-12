from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from ..resources import PacienteResource
from ..models import Paciente
from tablib import Dataset


class ExportPacientesVIEW(APIView):
    def get(self, request, *args, **kwargs):
        paciente_resource = PacienteResource()
        dataset = paciente_resource.export(Paciente.objects.all())

        tablib_dataset = Dataset().load(dataset.csv, format='csv')
        excel_data = tablib_dataset.export('xlsx')

        response = HttpResponse(
            excel_data,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="registros_pacientes_actuales.xlsx'
        )
        return response
