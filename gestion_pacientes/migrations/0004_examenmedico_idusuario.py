# Generated by Django 5.0.1 on 2024-03-06 18:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_pacientes', '0003_evento_idusuario'),
    ]

    operations = [
        migrations.AddField(
            model_name='examenmedico',
            name='idUsuario',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
