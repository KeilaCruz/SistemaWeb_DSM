from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import HistoriaNutricion
from .serializers import HistoriaNutricionSerializer


@permission_classes([IsAuthenticated])
class HistoriaNutricion(APIView):
    def get(self, request):
        historias_nutricion = HistoriaNutricion.objects.all()
        historia_nutricion_serializer = HistoriaNutricionSerializer(
            historias_nutricion, many=True
        )
        return Response(historia_nutricion_serializer)


@permission_classes([IsAuthenticated])
class RegistrarHistoriaNutricion(APIView):
    def post(self, request, *args, **kwargs):
        historia_nutricion_serializer = HistoriaNutricionSerializer(data=request.data)
        if historia_nutricion_serializer.is_valid():
            historia_nutricion_serializer.save()
            return Response(
                historia_nutricion_serializer.data, status=status.HTTP_201_CREATED
            )
        return Response(
            historia_nutricion_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )
        

