# Generated by Django 4.2.5 on 2024-02-12 18:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_pacientes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historianutricion',
            name='fecha_registro',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
