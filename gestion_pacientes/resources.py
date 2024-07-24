from import_export import resources, fields
from .models import Paciente, Cita


class PacienteResource(resources.ModelResource):
    # Datos personales
    nombre = fields.Field(column_name="Nombre")
    apePaterno = fields.Field(column_name="Apellido paterno")
    apeMaterno = fields.Field(column_name="Apellido materno")
    edad = fields.Field(column_name="Edad")
    estado_civil = fields.Field(column_name="Estado civil")
    escolaridad = fields.Field(column_name="Escolaridad")
    sexo = fields.Field(column_name="Sexo")
    # Datos direccion
    colonia = fields.Field(column_name="Direccion")
    calle = fields.Field(column_name="Calle")
    numero_exterior = fields.Field(column_name="Número exterior")
    CP = fields.Field(column_name="CP")
    referencia = fields.Field(column_name="Referencia")
    # Datos de contacto
    telefono = fields.Field(column_name="Telefono")
    derecho_habiencia = fields.Field(column_name="Derechohabiencia")
    unidad_salud = fields.Field(column_name="Unidad de salud")
    ultima_visita_medico = fields.Field(column_name="Última vista al medico")
    num_personas_vive = fields.Field(column_name="Número de personas con las que vive")
    # Otros datos
    participa_programa_federal = fields.Field(column_name="Participa programa Federal")
    nombre_programa_federal = fields.Field(column_name="Nombre del programa federal")
    participa_programa_estatal = fields.Field(
        column_name="Participa en programa estatal"
    )
    nombre_programa_estatal = fields.Field(column_name="Nombre del programa estatal")
    participa_programa_municipal = fields.Field(
        column_name="Participa en programa municipal"
    )
    nombre_programa_municipal = fields.Field(
        column_name="Nombre del programa municipal"
    )

    class Meta:
        model = Paciente
        fields = (
            "CURP",
            "fecha_registro",
            "nombre",
            "apePaterno",
            "apeMaterno",
            "edad",
            "estado_civil",
            "escolaridad",
            "sexo",
            "colonia",
            "calle",
            "numero_exterior",
            "CP",
            "referencia",
            "telefono",
            "derecho_habiencia",
            "unidad_salud",
            "ultima_visita_medico",
            "numero_personas_vive",
            "participa_programa_federal",
            "nombre_programa_federal",
            "participa_programa_estatal",
            "nombre_programa_estatal",
            "participa_programa_municipal",
            "nombre_programa_municipal",
        )
        export_order = (
            "CURP",
            "fecha_registro",
            "nombre",
            "apePaterno",
            "apeMaterno",
            "edad",
            "estado_civil",
            "escolaridad",
            "sexo",
            "colonia",
            "calle",
            "numero_exterior",
            "CP",
            "referencia",
            "telefono",
            "derecho_habiencia",
            "unidad_salud",
            "ultima_visita_medico",
            "numero_personas_vive",
            "participa_programa_federal",
            "nombre_programa_federal",
            "participa_programa_estatal",
            "nombre_programa_estatal",
            "participa_programa_municipal",
            "nombre_programa_municipal",
        )

    # Datos personales
    def dehydrate_nombre(self, paciente):
        return paciente.datos_personales.get("nombre", "")

    def dehydrate_apePaterno(self, paciente):
        return paciente.datos_personales.get("apePaterno", "")

    def dehydrate_apeMaterno(self, paciente):
        return paciente.datos_personales.get("apeMaterno", "")

    def dehydrate_edad(self, paciente):
        return paciente.datos_personales.get("edad", "")

    def dehydrate_estado_civil(self, paciente):
        return paciente.datos_personales.get("estado_civil", "")

    def dehydrate_escolaridad(self, paciente):
        return paciente.datos_personales.get("escolaridad", "")

    def dehydrate_sexo(self, paciente):
        return paciente.datos_personales.get("sexo", "")

    # Datos dirección
    def dehydrate_colonia(self, paciente):
        return paciente.datos_direccion.get("colonia", "")

    def dehydrate_calle(self, paciente):
        return paciente.datos_direccion.get("calle", "")

    def dehydrate_numero_exterior(self, paciente):
        return paciente.datos_direccion.get("numero_exterior", "")

    def dehydrate_CP(self, paciente):
        return paciente.datos_direccion.get("CP", "")

    def dehydrate_referencia(self, paciente):
        return paciente.datos_direccion.get("referencia", "")

    # Datos contacto
    def dehydrate_telefono(self, paciente):
        return paciente.datos_contacto.get("telefono", "")

    def dehydrate_derecho_habiencia(self, paciente):
        return paciente.datos_contacto.get("derecho_habiencia", "")

    def dehydrate_unidad_salud(self, paciente):
        return paciente.datos_contacto.get("unidad_salud", "")

    def dehydrate_ultima_visita_medico(self, paciente):
        return paciente.datos_contacto.get("ultima_visita_medico", "")

    def dehydrate_numero_personas_vive(self, paciente):
        return paciente.datos_contacto.get("numero_personas_vive", "")

    # Otros datos
    def dehydrate_participa_programa_federal(self, paciente):
        return paciente.otros_datos.get("participa_programa_federal", "")

    def dehydrate_nombre_programa_federal(self, paciente):
        return paciente.otros_datos.get("nombre_programa_federal", "")

    def dehydrate_participa_programa_estatal(self, paciente):
        return paciente.otros_datos.get("participa_programa_estatal", "")

    def dehydrate_nombre_programa_estatal(self, paciente):
        return paciente.otros_datos.get("nombre_programa_estatal", "")

    def dehydrate_participa_programa_municipal(self, paciente):
        return paciente.otros_datos.get("participa_programa_municipal", "")

    def dehydrate_nombre_programa_municipal(self, paciente):
        return paciente.otros_datos.get("nombre_programa_municipal", "")


class CitaResource(resources.ModelResource):
    # Datos cita
    fecha_cita = fields.Field(column_name="Fecha de cita")
    horario_cita = fields.Field(column_name="Horario de cita")
    especialidad = fields.Field(column_name="Especialidad")

    class Meta:
        model = Cita
        fields = (
            "idCita",
            "fecha_registro",
            "fecha_cita",
            "horario_cita",
            "especialidad",
            "estado",
            "idPaciente",
        )
        export_order = (
            "idCita",
            "fecha_registro",
            "fecha_cita",
            "horario_cita",
            "especialidad",
            "estado",
            "idPaciente",
        )

    # Datos de la cita
    def dehydrate_fecha_cita(self, cita):
        return cita.datos_cita.get("fecha_cita")

    def dehydrate_horario_cita(self, cita):
        return cita.datos_cita.get("horario_cita")
    
    def dehydrate_especialidad_cita(self, cita):
        return cita.datos_cita.get("especialidad")