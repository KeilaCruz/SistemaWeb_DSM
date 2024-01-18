from rest_framework import serializers
from gestion_pacientes.models import Paciente, Cita, Notas


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"


class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = "__all__"
        
class NotasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notas
        fields = "__all__"
