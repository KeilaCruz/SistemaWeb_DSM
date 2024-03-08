from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import ExamenMedico
from .serializers import ExamenMedicoSerializer
from django.shortcuts import get_object_or_404


@permission_classes([IsAuthenticated])
class ExamenMedicoAPIView(APIView):
    def get(self, request):
        examenMedico = ExamenMedico.objects.all()
        examenMedico_serializer = ExamenMedicoSerializer(examenMedico, many=True)
        return Response(examenMedico_serializer.data)
    
class RegistrarExamenMedicoAPIView(APIView):
    def post(self, request, *args, **kwargs):
        examenMedico_serializer = ExamenMedicoSerializer(data=request.data)
        if examenMedico_serializer.is_valid():
            examenMedico_serializer.save()
            return Response(examenMedico_serializer.data, status=status.HTTP_201_CREATED)
        return Response(examenMedico_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

@permission_classes([IsAuthenticated])
class EditarExamenMedicoAPIView(APIView):
    def get(self, request, idExamenMedico, format=None):
        examenMedico = get_object_or_404(ExamenMedico, idExamenMedico=idExamenMedico)
        examenMedico_serializer = ExamenMedicoSerializer(examenMedico)
        return Response(examenMedico_serializer.data)
