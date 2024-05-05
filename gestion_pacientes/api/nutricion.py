from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import HistoriaNutricion
from .serializers import HistoriaNutricionSerializer


@permission_classes([IsAuthenticated])
class HistoriaNutricionAPIView(APIView):
    def get(self, request):
        historias_nutricion = HistoriaNutricion.objects.all()
        historia_nutricion_serializer = HistoriaNutricionSerializer(
            historias_nutricion, many=True
        )
        return Response(historia_nutricion_serializer)


@permission_classes([IsAuthenticated])
class RegistrarHistoriaNutricionAPIView(APIView):
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


@permission_classes([IsAuthenticated])
class CalculadoraIMCAPIVIEW(APIView):
    def get(self, request, altura, peso):
        altura = float(altura)
        equivalencia_cm_metros = 0.01
        cuadrado = 2

        metros = int(altura)
        centimetrosMetros = int((altura - metros) * 100) * equivalencia_cm_metros

        alturaCuadrado = (metros + centimetrosMetros) ** cuadrado

        imc = "{:.1f}".format(peso / alturaCuadrado)
        imc_float = float(imc)

        """  Valores retorno
               Sobrepeso: 1  Normopeso: 2   Sobrepeso: 3  Obesidad I: 4   Obesidad II: 5  Obesidad III: 6
        """

        if imc_float < 18.5:
            categoria = 1
        elif imc_float >= 18.5 and imc_float <= 24.9:
            categoria = 2
        elif imc_float >= 25.0 and imc_float <= 29.9:
            categoria = 3
        elif imc_float >= 30.0 and imc_float <= 34.9:
            categoria = 4
        elif imc_float >= 35.0 and imc_float <= 39.9:
            categoria = 5
        elif imc_float >= 40:
            categoria = 6
        else:
            "No se cumple evaluación"

        return Response(
            {
                "categoria": categoria,
                "imc": imc_float,
                "peso": peso,
                "altura": altura,
                "status": status.HTTP_200_OK,
            }
        )


@permission_classes([IsAuthenticated])
class CalculadoraCircuferenciaCintura(APIView):
    """Nivel riesgo
    Bajo: 1  Alto 2
    """

    def get(self, request, genero, circuferencia):
        if genero == "F" and circuferencia <= 80:
            riesgo = 1
        elif genero == "F" and circuferencia > 80:
            riesgo = 2
        elif genero == "M" and circuferencia <= 90:
            riesgo = 1
        elif genero == "M" and circuferencia > 90:
            riesgo = 2
        else:
            "No se cumple evaluación"

        return Response(
            {"riesgo": riesgo, "genero": genero, "circuferencia": circuferencia, "status": status.HTTP_200_OK}
        )
