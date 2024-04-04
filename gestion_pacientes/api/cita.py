from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import Cita
from .serializers import CitaSerializer
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404


@permission_classes([IsAuthenticated])
class CitaAPIView(APIView):
    def get(self, request):
        citas = Cita.objects.filter(estado=True)
        cita_serializer = CitaSerializer(citas, many=True)
        return Response(cita_serializer.data)


@permission_classes([IsAuthenticated])
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


@permission_classes([IsAuthenticated])
class VisualizarCitasPaciente(APIView):
    def get(self, request, CURP):
        citas = self.get_citas(CURP)
        cita_serializer = CitaSerializer(citas, many=True)
        return Response(cita_serializer.data)

    def get_citas(self, CURP):
        try:
            return Cita.objects.filter(idPaciente=CURP, estado=True)
        except Cita.DoesNotExist:
            raise "No existe"


@permission_classes([IsAuthenticated])
class ReagendarCitasPaciente(APIView):
    def get(self, request, idCita):
        cita = get_object_or_404(Cita, idCita=idCita, estado=True)
        cita_serializer = CitaSerializer(cita)
        return Response(cita_serializer.data)

    def put(self, request, idCita, format=None):
        cita = get_object_or_404(Cita, idCita=idCita, estado=True)
        cita_data = request.data.get("datos_cita", {})
        fecha_cita = cita_data.get("fecha_cita")
        hora_cita = cita_data.get("horario_cita")
        especialidad = cita_data.get("especialidad")

        citas_programadas = Cita.objects.filter(
            datos_cita__especialidad=especialidad,
            datos_cita__fecha_cita=fecha_cita,
            datos_cita__horario_cita=hora_cita,
            estado=True
        ).exclude(idCita=idCita)

        if citas_programadas.exists():
            return Response(
                {"error": "Ya hay otra cita programa para esa fecha"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cita_serializer = CitaSerializer(cita, data=request.data)
        if cita_serializer.is_valid():
            cita_serializer.save()
            return Response(cita_serializer.data)
        return Response(cita_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
