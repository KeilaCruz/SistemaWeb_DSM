from rest_framework.response import Response
from rest_framework.views import APIView
from gestion_pacientes.models import Paciente, Cita
from rest_framework import status
from .serializers import PacienteSerializer, CitaSerializer


class PacienteAPIView(APIView):
    def get(self, request):
        pacientes = Paciente.objects.all()
        paciente_serializer = PacienteSerializer(pacientes, many=True)
        return Response(paciente_serializer.data)

    def post(self, request, *args, **kwargs):
        paciente_serializer = PacienteSerializer(data=request.data)
        if paciente_serializer.is_valid():
            paciente_serializer.save()
            return Response(paciente_serializer.data, status=status.HTTP_201_CREATED)
        return Response(paciente_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BuscarPacienteAPIView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get("query", "")

        pacientes = Paciente.objects.filter(
            Q(datos_personales__nombre__icontains=query)
            | Q(datos_contacto__telefono__contains=query)
            | Q(CURP__icontains=query)
        )

        paciente_serializer = PacienteSerializer(pacientes, many=True)
        return Response(paciente_serializer.data, status=status.HTTP_200_OK)


class CitaAPIView(APIView):
    def get(self, request):
        citas = Cita.objects.all()
        cita_serializer = CitaSerializer(citas, many=True)
        return Response(cita_serializer.data)

    def post(self, request, *args, **kwargs):
        cita_serializer = CitaSerializer(data=request.data)
        if cita_serializer.is_valid():
            cita_serializer.save()
            return Response(cita_serializer.data, status=status.HTTP_201_CREATED)
        return Response(cita_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
