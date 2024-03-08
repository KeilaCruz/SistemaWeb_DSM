from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime


# Create your models here.
class Rol(models.Model):
    idRol = models.BigAutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=30, default="")
    descripcion = models.CharField(max_length=30, default="")

    def __str__(self):
        return str(self.idRol)


class Usuario(AbstractUser):
    idRol = models.ForeignKey(Rol, on_delete=models.DO_NOTHING)
    second_last_name = models.CharField(max_length=50, default="")
    
    last_login = None
    is_superuser = None
    is_staff = None
    date_joined = None
    groups = None
    user_permissions = None
    
    def __str__(self):
        return self.id


class Paciente(models.Model):
    CURP = models.CharField(max_length=18, default="", primary_key=True)
    fecha_registro = models.DateField(default=datetime.date.today)
    datos_personales = models.JSONField()
    datos_direccion = models.JSONField()
    datos_contacto = models.JSONField()
    otros_datos = models.JSONField()

    def __str__(self):
        return self.CURP


class Cita(models.Model):
    idCita = models.BigAutoField(primary_key=True)
    idPaciente = models.ForeignKey(Paciente, on_delete=models.DO_NOTHING)
    datos_cita = models.JSONField(default=dict)
    estado = models.BooleanField(default=False)

    def __str__(self):
        return self.idCita


class HistoriaNutricion(models.Model):
    idHistoriaNutricion = models.BigAutoField(primary_key=True)
    idPaciente = models.ForeignKey(Paciente, on_delete=models.DO_NOTHING)
    fecha_registro = models.DateField(default=datetime.date.today)
    datos_personales = models.JSONField()
    indicadores_clinicos = models.JSONField()
    anp = models.JSONField()
    ago = models.JSONField()
    indicadores_diabeticos = models.JSONField()
    diagnostico = models.JSONField()

    def __str__(self):
        return self.idHistoriaNutricion


class FichaPsicologicaAdulto(models.Model):
    expedienteFicha = models.CharField(max_length=20, primary_key=True)
    idPaciente = models.ForeignKey(Paciente, on_delete=models.DO_NOTHING)
    # idUsuario = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING)
    fecha_registro = models.DateField(default=datetime.date.today)
    datos_generales = models.JSONField()
    historia_actual_paciente = models.TextField(default="")
    datos_desarrollo = models.JSONField()
    datos_escolar = models.JSONField()
    datos_laboral = models.JSONField()
    datos_familiares = models.JSONField()
    datos_medico_quirurgica = models.JSONField()
    datos_sexual = models.JSONField()

    def __str__(self):
        return self.expedienteFicha


class FichaPsicologicaNiño(models.Model):
    expedienteFicha = models.CharField(max_length=20, primary_key=True)
    idPaciente = models.ForeignKey(Paciente, on_delete=models.DO_NOTHING)
    # idUsuario = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING)
    fecha_registro = models.DateField(default=datetime.date.today)
    datos_generales = models.JSONField()
    antecedentes_padecimiento = models.JSONField()
    antecedentes_desarrollo = models.JSONField()
    datos_escolares = models.JSONField()

    def __str__(self):
        return self.expedienteFicha


class HojaEvaluacionClinica(models.Model):
    idHojaClinica = models.BigAutoField(primary_key=True)
    fecha_revision = models.DateField(default=datetime.date.today)
    idPaciente = models.ForeignKey(Paciente, on_delete=models.DO_NOTHING)
    nota_medica = models.TextField(default="")
    datos_nota_enfermeria = models.JSONField()

    def __str__(self):
        return self.idHojaClinica


class ExamenMedico(models.Model):
    idExamenMedico = models.BigAutoField(primary_key=True)
    idPaciente = models.ForeignKey(Paciente, on_delete=models.DO_NOTHING)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING)
    fecha_revision = models.DateField(default=datetime.date.today)
    antecedentes_heredofamiliares = models.JSONField()
    datos_enfermedades = models.JSONField()
    antecedentes_no_patologicos = models.JSONField()
    antecedentes_gineco_obstreticos = models.JSONField()
    antecedentes_personales_patologicos = models.JSONField()
    datos_exploracion_fisica = models.JSONField()
    datos_antropometria = models.JSONField()
    datos_examen_medico = models.JSONField()
    datos_examenes_laboratorio = models.JSONField()

    def __str__(self):
        return self.idExamenMedico


class Evento(models.Model):
    idEvento = models.BigAutoField(primary_key=True)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING)
    datos_evento = models.JSONField()

    def __str__(self):
        return self.idEvento
