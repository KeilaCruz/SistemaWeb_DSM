from rest_framework import serializers
from gestion_pacientes.models import Paciente, Cita


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"


class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fiels = "__all__"
