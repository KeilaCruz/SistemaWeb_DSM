from import_export import resources
from .models import Paciente


class PacienteResource(resources.ModelResource):
    class Meta:
        model = Paciente

