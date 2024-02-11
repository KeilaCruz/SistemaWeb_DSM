from rest_framework.request import Request
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import Usuario
from .serializers import UsuarioSerializer, LoginSessionInfoSerializer

class LoginAPIView(TokenObtainPairView):
    serializer_class = LoginSessionInfoSerializer


class RefreshTokenAPIView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            token_access = response.data["access"]
            token_refresh = response.data["refresh"]
            return Response(
                {
                    "access": token_access,
                    "refresh": token_refresh,
                },
                status=status.HTTP_200_OK,
            )
        return response


@permission_classes([IsAuthenticated])
class VisualizarUsuarioView(APIView):
    def get(self, request):
        usuarios = Usuario.objects.all()
        usuario_serializer = UsuarioSerializer(usuarios, many=True)
        return Response(usuario_serializer.data)


@permission_classes([IsAuthenticated])
class CrearUsuarioView(CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.password = make_password(serializer.validated_data["password"])
        instance.save()
        return instance
