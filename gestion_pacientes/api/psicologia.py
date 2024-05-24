from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import (
    FichaPsicologicaNiño,
    FichaPsicologicaAdulto,
    EvaluaciónPsicologicaAdultos,
    EvaluaciónPsicologicaNiños,
)
from .serializers import (
    FichaPsicoNiñoSerializer,
    FichaPsicoAdultoSerializer,
    EvaluacionPsicoAdultoSerializer,
    EvaluacionPsicoNiñoSerializer,
)
from django.db.models import Max


@permission_classes([IsAuthenticated])
class FichaPsicoNiñoAPIView(APIView):
    def get(self, request):

        fichas_psico_niño = FichaPsicologicaNiño.objects.values("idPaciente").annotate(
            max_fecha=Max("fecha_registro")
        )

        ficha_psico_sin_duplicados = FichaPsicologicaNiño.objects.filter(
            fecha_registro__in=[ficha["max_fecha"] for ficha in fichas_psico_niño]
        )
        ficha_psico_serializer = FichaPsicoNiñoSerializer(
            ficha_psico_sin_duplicados, many=True
        )

        return Response(ficha_psico_serializer.data)


@permission_classes([IsAuthenticated])
class RegistrarFichaPsiNiñoAPIView(APIView):
    def post(self, request, *args, **kwargs):
        ficha_psico_serializer = FichaPsicoNiñoSerializer(data=request.data)
        if ficha_psico_serializer.is_valid():
            ficha_psico_serializer.save()
            return Response(ficha_psico_serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            ficha_psico_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


@permission_classes([IsAuthenticated])
class FichaPsicoAdultoAPIView(APIView):
    def get(self, request):

        fichas_psico_adulto = FichaPsicologicaAdulto.objects.values(
            "idPaciente"
        ).annotate(max_fecha=Max("fecha_registro"))

        ficha_psico_sin_duplicados = FichaPsicologicaAdulto.objects.filter(
            fecha_registro__in=[ficha["max_fecha"] for ficha in fichas_psico_adulto]
        )
        ficha_psico_serializer = FichaPsicoAdultoSerializer(
            ficha_psico_sin_duplicados, many=True
        )

        return Response(ficha_psico_serializer.data)


@permission_classes([IsAuthenticated])
class RegistrarFichaPsiAdultoAPIView(APIView):
    def post(self, request, *args, **kwargs):
        ficha_psico_serializer = FichaPsicoAdultoSerializer(data=request.data)
        if ficha_psico_serializer.is_valid():
            ficha_psico_serializer.save()
            return Response(ficha_psico_serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            ficha_psico_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


@permission_classes([IsAuthenticated])
class VisualizarFichaPsicoAdultoPaciente(APIView):
    def get(self, request, idPaciente):
        fichas = self.get_fichas(idPaciente)
        fichas_serializer = FichaPsicoAdultoSerializer(fichas, many=True)
        return Response(fichas_serializer.data)

    def get_fichas(self, idPaciente):
        try:
            return FichaPsicologicaAdulto.objects.filter(idPaciente=idPaciente)
        except FichaPsicologicaAdulto.DoesNotExist:
            raise "No existe"


@permission_classes([IsAuthenticated])
class VisualizarFichaPsicoNiñoPaciente(APIView):
    def get(self, request, idPaciente):
        fichas = self.get_fichas(idPaciente)
        fichas_serializer = FichaPsicoNiñoSerializer(fichas, many=True)
        return Response(fichas_serializer.data)

    def get_fichas(self, idPaciente):
        try:
            return FichaPsicologicaNiño.objects.filter(idPaciente=idPaciente)
        except FichaPsicologicaNiño.DoesNotExist:
            raise "No existe"


@permission_classes([IsAuthenticated])
class RegistrarEvaluacionAdulto(APIView):
    def post(self, request, *args, **kwargs):
        evaluacion_serializer = EvaluacionPsicoAdultoSerializer(data=request.data)
        if evaluacion_serializer.is_valid():
            evaluacion_serializer.save()
            return Response(evaluacion_serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            evaluacion_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


@permission_classes([IsAuthenticated])
class VisualizarEvaluacionAdulto(APIView):
    def get(self, request, CURP):
        evaluaciones = self.get_evaluaciones(CURP)
        evaluacion_serializer = EvaluacionPsicoAdultoSerializer(evaluaciones, many=True)
        return Response(evaluacion_serializer.data)

    def get_evaluaciones(self, CURP):
        try:
            return EvaluaciónPsicologicaAdultos.objects.filter(CURP=CURP).order_by(
                "-fecha"
            )
        except EvaluaciónPsicologicaAdultos.DoesNotExist:
            raise "No existe"


@permission_classes([IsAuthenticated])
class RegistrarEvaluacionNiño(APIView):
    def post(self, request, *args, **kwargs):
        evaluacion_serializer = EvaluacionPsicoNiñoSerializer(data=request.data)
        if evaluacion_serializer.is_valid():
            evaluacion_serializer.save()
            return Response(evaluacion_serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            evaluacion_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


@permission_classes([IsAuthenticated])
class VisualizarEvaluacionNiño(APIView):
    def get(self, request, CURP):
        evaluaciones = self.get_evaluaciones(CURP)
        evaluacion_serializer = EvaluacionPsicoNiñoSerializer(evaluaciones, many=True)
        return Response(evaluacion_serializer.data)

    def get_evaluaciones(self, CURP):
        try:
            return EvaluaciónPsicologicaNiños.objects.filter(CURP=CURP).order_by(
                "-fecha"
            )
        except EvaluaciónPsicologicaNiños.DoesNotExist:
            raise "No existe"
