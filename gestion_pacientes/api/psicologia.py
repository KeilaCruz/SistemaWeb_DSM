from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import FichaPsicologicaNiño, FichaPsicologicaAdulto
from .serializers import FichaPsicoNiñoSerializer, FichaPsicoAdultoSerializer


class FichaPsicoNiñoAPIView(APIView):
    def get(self, request):
        fichas_psico_niño = FichaPsicologicaNiño.objects.all()
        ficha_psico_serializer = FichaPsicoNiñoSerializer(fichas_psico_niño, many=True)
        return Response(ficha_psico_serializer.data)


class RegistrarFichaPsiNiñoAPIView(APIView):
    def post(self, request, *args, **kwargs):
        ficha_psico_serializer = FichaPsicoNiñoSerializer(data=request.data)
        if ficha_psico_serializer.is_valid():
            ficha_psico_serializer.save()
            return Response(ficha_psico_serializer.data, status=status.HTTP_201_CREATED)
        return Response(ficha_psico_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FichaPsicoAdultoAPIView(APIView):
    def get(self, request):
        fichas_psico_adulto = FichaPsicologicaAdulto.objects.all()
        ficha_psico_serializer = FichaPsicoAdultoSerializer(fichas_psico_adulto, many=True)
        return Response(ficha_psico_serializer.data)


class RegistrarFichaPsiAdultoAPIView(APIView):
    def post(self, request, *args, **kwargs):
        ficha_psico_serializer = FichaPsicoAdultoSerializer(data=request.data)
        if ficha_psico_serializer.is_valid():
            ficha_psico_serializer.save()
            return Response(ficha_psico_serializer.data, status=status.HTTP_201_CREATED)
        return Response(ficha_psico_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

