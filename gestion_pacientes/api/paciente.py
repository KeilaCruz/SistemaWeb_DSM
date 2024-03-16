from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import Paciente
from django.db.models import Q
from .serializers import PacienteSerializer
from django.shortcuts import get_object_or_404


@permission_classes([IsAuthenticated])
class PacienteAPIView(APIView):
    def get(self, request):
        pacientes = Paciente.objects.all()
        paciente_serializer = PacienteSerializer(pacientes, many=True)
        return Response(paciente_serializer.data)


@permission_classes([IsAuthenticated])
class RegistrarPacienteAPIView(APIView):
    def post(self, request, *args, **kwargs):
        paciente_serializer = PacienteSerializer(data=request.data)
        if paciente_serializer.is_valid():
            paciente_serializer.save()
            return Response(paciente_serializer.data, status=status.HTTP_201_CREATED)
        return Response(paciente_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class BuscarPacienteAPIView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get("query", "")

        pacientes = Paciente.objects.filter(
            Q(datos_personales__nombre__icontains=query)
            | Q(datos_contacto__telefono__icontains=query)
            | Q(CURP__icontains=query)
        )
        if not pacientes.exists():
            return Response(
                {"error": "No se encontraron pacientes que coincidan con la consulta"},
                status=status.HTTP_404_NOT_FOUND,
            )
        paciente_serializer = PacienteSerializer(pacientes, many=True)
        return Response(paciente_serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class EditarPacienteAPIView(APIView):
    def get(self, request, CURP):
        paciente = get_object_or_404(Paciente, CURP=CURP)
        paciente_serializer = PacienteSerializer(paciente)
        return Response(paciente_serializer.data)

    def put(self, request, CURP, format=None):
        paciente = get_object_or_404(Paciente, CURP=CURP)
        paciente_serializer = PacienteSerializer(paciente, data=request.data)
        if paciente_serializer.is_valid():
            paciente_serializer.save()
            return Response(paciente_serializer.data)
        return Response(paciente_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_paciente(self, CURP):
        try:
            return Paciente.objects.get(CURP=CURP)
        except Paciente.DoesNotExist:
            raise "No existe"
