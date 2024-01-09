# Generated by Django 5.0.1 on 2024-01-08 17:55

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('idEvento', models.BigAutoField(primary_key=True, serialize=False)),
                ('datos_evento', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('CURP', models.CharField(default='', max_length=18, primary_key=True, serialize=False)),
                ('fecha_registro', models.DateField(default=datetime.date.today)),
                ('datos_personales', models.JSONField()),
                ('datos_direccion', models.JSONField()),
                ('datos_contacto', models.JSONField()),
                ('otros_datos', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('idRol', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre_rol', models.CharField(default='', max_length=30)),
                ('descripcion', models.CharField(default='', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('idUsuario', models.BigAutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(default='', max_length=60)),
                ('password', models.CharField(default='', max_length=60)),
                ('datos_usuario', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='HojaEvaluacionClinica',
            fields=[
                ('idHojaClinica', models.BigAutoField(primary_key=True, serialize=False)),
                ('fecha_revision', models.DateField(default=datetime.date.today)),
                ('nota_medica', models.TextField(default='')),
                ('datos_nota_enfermeria', models.JSONField()),
                ('idPaciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='gestion_pacientes.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='HistoriaNutricion',
            fields=[
                ('idHistoriaNutricion', models.BigAutoField(primary_key=True, serialize=False)),
                ('fecha_registro', models.DateTimeField(default=datetime.date.today)),
                ('datos_personales', models.JSONField()),
                ('indicadores_clinicos', models.JSONField()),
                ('anp', models.JSONField()),
                ('ago', models.JSONField()),
                ('indicadores_diabeticos', models.JSONField()),
                ('diagnostico', models.JSONField()),
                ('idPaciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='gestion_pacientes.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='FichaPsicologicaNiño',
            fields=[
                ('expedienteFicha', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('fecha_registro', models.DateField(default=datetime.date.today)),
                ('datos_generales', models.JSONField()),
                ('antecedentes_padecimiento', models.JSONField()),
                ('antecedentes_desarrollo', models.JSONField()),
                ('datos_escolares', models.JSONField()),
                ('idPaciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='gestion_pacientes.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='FichaPsicologicaAdulto',
            fields=[
                ('expedienteFicha', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('fecha_registro', models.DateField(default=datetime.date.today)),
                ('datos_generales', models.JSONField()),
                ('historia_actual_paciente', models.TextField(default='')),
                ('datos_desarrollo', models.JSONField()),
                ('datos_escolar', models.JSONField()),
                ('datos_laboral', models.JSONField()),
                ('datos_familiares', models.JSONField()),
                ('datos_medico_quirurgica', models.JSONField()),
                ('datos_sexual', models.JSONField()),
                ('idPaciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='gestion_pacientes.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='ExamenMedico',
            fields=[
                ('idExamenMedico', models.BigAutoField(primary_key=True, serialize=False)),
                ('fecha_revision', models.DateField(default=datetime.date.today)),
                ('antecedentes_heredofamiliares', models.JSONField()),
                ('datos_enfermedades', models.JSONField()),
                ('antecedentes_no_patologicos', models.JSONField()),
                ('antecedentes_gineco_obstreticos', models.JSONField()),
                ('antecedentes_personales_patologicos', models.JSONField()),
                ('datos_exploracion_fisica', models.JSONField()),
                ('datos_antropometria', models.JSONField()),
                ('datos_examen_medico', models.JSONField()),
                ('datos_examenes_laboratorio', models.JSONField()),
                ('idPaciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='gestion_pacientes.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='Cita',
            fields=[
                ('idCita', models.BigAutoField(primary_key=True, serialize=False)),
                ('datos_cita', models.JSONField(default=dict)),
                ('estado', models.BooleanField(default=False)),
                ('idPaciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='gestion_pacientes.paciente')),
            ],
        ),
    ]
