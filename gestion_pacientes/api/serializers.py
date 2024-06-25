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
    EvaluaciónPsicologicaNiños,
    EvaluaciónPsicologicaAdultos,
    ExamenMedico
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


class HistorialClinicoSerializer(serializers.ModelSerializer):
    
    archivo = serializers.FileField(required=False)

    class Meta:
        model = HojaEvaluacionClinica
        fields = "__all__"

    def create(self, validated_data):
        archivo = validated_data.pop("archivo", None)
        historial = HojaEvaluacionClinica.objects.create(**validated_data)

        if archivo:
            historial.archivo = archivo
            historial.save()

        return historial
    
    


class LoginSessionInfoSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["idRol_id"] = user.idRol_id
        return token
    

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = "__all__"
        
class ExamenMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenMedico
        fields = "__all__"


class EvaluacionPsicoAdultoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluaciónPsicologicaAdultos
        fields = "__all__"


class EvaluacionPsicoNiñoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluaciónPsicologicaNiños
        fields = "__all__"
