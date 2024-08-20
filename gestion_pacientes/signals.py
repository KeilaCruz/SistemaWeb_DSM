from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Rol

@receiver(post_migrate)
def crear_roles_iniciales(sender, **kwargs):
    if sender.name == 'gestion_pacientes':
        Rol.objects.get_or_create(nombre_rol='Psicologo',descripcion='Realiza la atencion psicologica')
        Rol.objects.get_or_create(nombre_rol='Recepcionista',descripcion='Lleva el control de los pacientes y sus citas')
        Rol.objects.get_or_create(nombre_rol='Medico',descripcion='Realiza las atencion de medico general')
        Rol.objects.get_or_create(nombre_rol='Odontologo',descripcion='Realiza las atencion dental')
        Rol.objects.get_or_create(nombre_rol='Nutriologo',descripcion='Realiza la atencion de nutricion')
        Rol.objects.get_or_create(nombre_rol='Auxiliar',descripcion='Es el segundo a mando en dirección')
        Rol.objects.get_or_create(nombre_rol='Director',descripcion='Es el administrador principal')