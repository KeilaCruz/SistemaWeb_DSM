from rest_framework import serializers
from gestion_pacientes.models import Paciente, Cita, Usuario
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"


class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = "__all__"


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"


class LoginSessionInfoSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username

        return token
