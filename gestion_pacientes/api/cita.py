from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import Cita
from .serializers import CitaSerializer
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404


class CitaAPIView(APIView):
    def get(self, request):
        citas = Cita.objects.all()
        cita_serializer = CitaSerializer(citas, many=True)
        return Response(cita_serializer.data)


class AgendarCitaAPIView(APIView):
    """Validacion para que no se agenden citas en horarios cercanos o en el mismo horario"""

    def post(self, request, *args, **kwargs):
        cita_data = request.data.get("datos_cita", {})
        fecha_cita = cita_data.get("fecha_cita")
        hora_cita = cita_data.get("horario_cita")
        especialidad = cita_data.get("especialidad")

        cita_fecha_hora = datetime.strptime(
            fecha_cita + " " + hora_cita, "%Y-%m-%d %H:%M"
        )

        ultima_cita = Cita.objects.filter(datos_cita__especialidad=especialidad).last()

        if ultima_cita:
            ultima_cita_fecha_hora = datetime.strptime(
                ultima_cita.datos_cita["fecha_cita"]
                + " "
                + ultima_cita.datos_cita["horario_cita"],
                "%Y-%m-%d %H:%M",
            )

            hora_cita = ultima_cita_fecha_hora + timedelta(minutes=40)
            if ultima_cita_fecha_hora <= cita_fecha_hora <= hora_cita:
                return Response(
                    {
                        "error": "La nueva cita debe estar programada al menos 40 minutos después de la última cita."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            hora_cita = cita_fecha_hora

        cita_serializer = CitaSerializer(data=request.data)
        if cita_serializer.is_valid():
            cita_serializer.save()
            return Response(cita_serializer.data, status=status.HTTP_201_CREATED)
        return Response(cita_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VisualizarCitasPaciente(APIView):
    def get(self, request, CURP):
        citas = self.get_citas(CURP)
        cita_serializer = CitaSerializer(citas, many=True)
        return Response(cita_serializer.data)

    def get_citas(self, CURP):
        try:
            return Cita.objects.filter(idPaciente=CURP)
        except Cita.DoesNotExist:
            raise "No existe"
