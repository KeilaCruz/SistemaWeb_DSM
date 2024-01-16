from rest_framework.response import Response
from rest_framework.views import APIView
from gestion_pacientes.models import Paciente, Cita
from django.db.models import Q
from rest_framework import status
from .serializers import PacienteSerializer, CitaSerializer
from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
    routes=[
        'api/token',
        'api/token/refresh',
    ]
    return Response(routes)



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

class PacienteDetailAPIView(APIView):
    def get_object(self, curp):
        try:
            return Paciente.objects.get(CURP = curp)
        except Paciente.DoesNotExist:
            raise Http404
    
    def get(self, request, curp, format=None):
        paciente = self.get_object(curp)
        paciente_serializer = PacienteSerializer(paciente)
        return Response(paciente_serializer.data, status=status.HTTP_200_OK)

    def put(self, request, curp, format=None):
        paciente = self.get_object(curp)
        paciente_serializer = PacienteSerializer(instance=paciente, data=request.data)

        if paciente_serializer.is_valid():
            paciente_serializer.save()
            return Response(paciente_serializer.data, status=status.HTTP_200_OK)

        return Response(paciente_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, curp, format=None):
        paciente = self.get_object(curp)
        paciente.delete()
        return Response({"message": "Paciente eliminado correctamente"}, status=status.HTTP_204_NO_CONTENT)

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