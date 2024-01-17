from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import Cita
from .serializers import CitaSerializer


@permission_classes([IsAuthenticated])
class CitaAPIView(APIView):
    def get(self, request):
        citas = Cita.objects.all()
        cita_serializer = CitaSerializer(citas, many=True)
        return Response(cita_serializer.data)


@permission_classes([IsAuthenticated])
class AgendarCitaAPIView(APIView):
    def post(self, request, *args, **kwargs):
        cita_serializer = CitaSerializer(data=request.data)
        if cita_serializer.is_valid():
            cita_serializer.save()
            return Response(cita_serializer.data, status=status.HTTP_201_CREATED)
        return Response(cita_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
