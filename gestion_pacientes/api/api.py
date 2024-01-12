from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from gestion_pacientes.models import Paciente, Cita, Usuario
from django.db.models import Q
from rest_framework import status
from .serializers import PacienteSerializer, CitaSerializer, UsuarioSerializer


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


class VisualizarUsuarioView(APIView):
    def get(self, request):
        usuarios = Usuario.objects.all()
        usuario_serializer = UsuarioSerializer(usuarios, many=True)
        return Response(usuario_serializer.data)


class CrearUsuarioView(CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.password = make_password(serializer.validated_data["password"])
        instance.save()
        return instance
