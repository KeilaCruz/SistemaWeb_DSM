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
from django.db.models import Q


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

@permission_classes([IsAuthenticated])
class BuscarUsuarioAPIView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get("query", "")

        usuarios = Usuario.objects.filter(
            Q(username__icontains=query)
            | Q(first_name__icontains=query)
            | Q(last_name__icontains=query)
            | Q(second_last_name__icontains=query)
        )
        
        if not usuarios.exists():
            return Response(
                {"error": "No se encontraron usuarios que coincidan con la consulta"},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        usuario_serializer = UsuarioSerializer(usuarios, many=True)  # Ajusta el nombre del serializador según el que estés utilizando
        return Response(usuario_serializer.data, status=status.HTTP_200_OK)
