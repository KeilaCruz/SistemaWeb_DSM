from rest_framework import serializers
from gestion_pacientes.models import (
    Paciente,
    Cita,
    Usuario,
    HistoriaNutricion,
    FichaPsicologicaNiño,
    FichaPsicologicaAdulto,
    Evento,
    HojaEvaluacionClinica,
    ExamenMedico,
)
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


class HistoriaNutricionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoriaNutricion
        fields = "__all__"


class FichaPsicoNiñoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaPsicologicaNiño
        fields = "__all__"


class FichaPsicoAdultoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaPsicologicaAdulto
        fields = "__all__"
        
class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = "__all__"
        

class HojaEvaluacionClinicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HojaEvaluacionClinica
        fields = "__all__"
        

class ExamenMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenMedico
        fields = "_all__"


class LoginSessionInfoSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["idRol_id"] = user.idRol_id
        return token
    

