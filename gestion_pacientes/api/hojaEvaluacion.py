from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import HojaEvaluacionClinica
from .serializers import HojaEvaluacionClinicaSerializer
from django.shortcuts import get_object_or_404



@permission_classes([IsAuthenticated])
class HojaEvaluacionClinicaAPIView(APIView):
    def get(self, request):
        hojaEvaluacion = HojaEvaluacionClinica.objects.all()
        hojaEvaluacion_serializer = HojaEvaluacionClinicaSerializer(hojaEvaluacion, many=True)
        return Response(hojaEvaluacion_serializer.data)
    
@permission_classes([IsAuthenticated])
class RegistrarHojaEvaluacionAPIView(APIView):
    def post(self, request, *args, **kwargs):
        hojaEvaluacion_serializer = HojaEvaluacionClinicaSerializer(data=request.data)
        if hojaEvaluacion_serializer.is_valid():
            hojaEvaluacion_serializer.save()
            return Response(hojaEvaluacion_serializer.data, status=status.HTTP_201_CREATED)
        return Response(hojaEvaluacion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@permission_classes([IsAuthenticated])
class EditarExamenMedicoAPIView(APIView):
    def get(self, request, idHojaClinica, format=None):
        hojaEvaluacion = get_object_or_404(HojaEvaluacionClinica, idHojaClinica=idHojaClinica)
        hojaEvaluacion_serializer = HojaEvaluacionClinicaSerializer(hojaEvaluacion)
        return Response(hojaEvaluacion_serializer.data)
    
