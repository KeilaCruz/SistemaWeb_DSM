from import_export import resources, fields
from .models import (
    Paciente,
    Cita,
    HistoriaNutricion,
    FichaPsicologicaNiño,
    FichaPsicologicaAdulto,
    HojaEvaluacionClinica,
    ExamenMedico,
)


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

    def dehydrate_especialidad(self, cita):
        return cita.datos_cita.get("especialidad")


class HistoriaNutricionResource(resources.ModelResource):
    archivo = fields.Field(column_name="Archivo")
    fecha_registro = fields.Field(column_name="Fecha de Registro")
    num_expediente = fields.Field(column_name="Número de Expediente")
    fecha_nacimiento = fields.Field(column_name="Fecha de Nacimiento")
    municipio_nacimiento = fields.Field(column_name="Municipio de Nacimiento")
    estado_nacimiento = fields.Field(column_name="Estado de Nacimiento")
    sexo = fields.Field(column_name="Sexo")
    motivo_consulta = fields.Field(column_name="Motivo de Consulta")
    ahf_diabetes = fields.Field(column_name="AHF Diabetes")
    quien_diabetes = fields.Field(column_name="Quién Diabetes")
    ahf_hipertension = fields.Field(column_name="AHF Hipertensión")
    quien_hipertension = fields.Field(column_name="Quién Hipertensión")
    ahf_dislipidemias = fields.Field(column_name="AHF Dislipidemias")
    quien_dislipidemias = fields.Field(column_name="Quién Dislipidemias")
    ap_diabetes_mellitus = fields.Field(column_name="AP Diabetes Mellitus")
    ap_hipertension = fields.Field(column_name="AP Hipertensión")
    ap_dislipidemias = fields.Field(column_name="AP Dislipidemias")
    problema_gastrointestinal = fields.Field(column_name="Problema Gastrointestinal")
    cual_problema_gastrointestinal = fields.Field(
        column_name="Cuál Problema Gastrointestinal"
    )
    observaciones_patologicas = fields.Field(column_name="Observaciones Patológicas")
    intervencion_quirurgica = fields.Field(column_name="Intervención Quirúrgica")
    cual_intervencion_quirurgica = fields.Field(
        column_name="Cuál Intervención Quirúrgica"
    )
    alergia_alimento = fields.Field(column_name="Alergia a Alimento")
    cual_alergia_alimento = fields.Field(column_name="Cuál Alergia a Alimento")
    consume_farmaco_alergia = fields.Field(column_name="Consume Fármaco por Alergia")
    cual_alergia_farmaco = fields.Field(column_name="Cuál Alergia a Fármaco")
    desde_cuando_farmaco = fields.Field(column_name="Desde Cuándo Farmaco")
    realiza_actividad_fisica = fields.Field(column_name="Realiza Actividad Física")
    cual_actividad_fisica = fields.Field(column_name="Cuál Actividad Física")
    duracion = fields.Field(column_name="Duración")
    consume_alcohol = fields.Field(column_name="Consume Alcohol")
    consume_tabaco = fields.Field(column_name="Consume Tabaco")
    consume_droga = fields.Field(column_name="Consume Droga")
    numero_gestas = fields.Field(column_name="Número de Gestas")
    numero_partos_cesarea = fields.Field(column_name="Número de Partos Cesárea")
    numero_abortos = fields.Field(column_name="Número de Abortos")
    fecha_ultima_menstruacion = fields.Field(column_name="Fecha Última Menstruación")
    actualmente_lactando = fields.Field(column_name="Actualmente Lactando")
    presenta_menoupasia = fields.Field(column_name="Presenta Menoupasia")
    frecuencia_cereales = fields.Field(column_name="Frecuencia Cereales")
    frecuencia_frutas = fields.Field(column_name="Frecuencia Frutas")
    frecuencia_verduras = fields.Field(column_name="Frecuencia Verduras")
    frecuencia_carne_roja = fields.Field(column_name="Frecuencia Carne Roja")
    frecuencia_pollo = fields.Field(column_name="Frecuencia Pollo")
    frecuencia_lacteos = fields.Field(column_name="Frecuencia Lácteos")
    frecuencia_leguminosas = fields.Field(column_name="Frecuencia Leguminosas")
    frecuencia_azucar = fields.Field(column_name="Frecuencia Azúcar")
    frecuencia_grasas = fields.Field(column_name="Frecuencia Grasas")
    frecuencia_pescado = fields.Field(column_name="Frecuencia Pescado")
    cuantas_veces_come = fields.Field(column_name="Cuántas Veces Come")
    quien_prepara_alimentos = fields.Field(column_name="Quién Prepara Alimentos")
    litro_consume_agua = fields.Field(column_name="Litros Consumo Agua")
    litro_consume_refresco = fields.Field(column_name="Litros Consumo Refresco")
    tipo_grasa_preparar_alimentos = fields.Field(
        column_name="Tipo de Grasa Preparar Alimentos"
    )
    litro_consume_cafe = fields.Field(column_name="Litros Consumo Café")
    alimentos_causan_malestar = fields.Field(column_name="Alimentos Causan Malestar")
    r24_desayuno = fields.Field(column_name="R24 Desayuno")
    r24_colacion_uno = fields.Field(column_name="R24 Colación Uno")
    r24_comida = fields.Field(column_name="R24 Comida")
    r24_colacion_dos = fields.Field(column_name="R24 Colación Dos")
    r24_cena = fields.Field(column_name="R24 Cena")
    diagnostico_nutricio = fields.Field(column_name="Diagnóstico Nutricio")
    tratamiento_nutricional = fields.Field(column_name="Tratamiento Nutricional")
    idPaciente = fields.Field(column_name="ID Paciente")

    class Meta:
        model = HistoriaNutricion
        fields = (
            "idHistoriaNutricion",
            "archivo",
            "fecha_registro",
            "fecha_registro",
            "num_expediente",
            "fecha_nacimiento",
            "municipio_nacimiento",
            "estado_nacimiento",
            "sexo",
            "motivo_consulta",
            "ahf_diabetes",
            "quien_diabetes",
            "ahf_hipertension",
            "quien_hipertension",
            "ahf_dislipidemias",
            "quien_dislipidemias",
            "ap_diabetes_mellitus",
            "ap_hipertension",
            "ap_dislipidemias",
            "problema_gastrointestinal",
            "cual_problema_gastrointestinal",
            "observaciones_patologicas",
            "intervencion_quirurgica",
            "cual_intervencion_quirurgica",
            "alergia_alimento",
            "cual_alergia_alimento",
            "consume_farmaco_alergia",
            "cual_alergia_farmaco",
            "desde_cuando_farmaco",
            "realiza_actividad_fisica",
            "cual_actividad_fisica",
            "duracion",
            "consume_alcohol",
            "consume_tabaco",
            "consume_droga",
            "numero_gestas",
            "numero_partos_cesarea",
            "numero_abortos",
            "fecha_ultima_menstruacion",
            "actualmente_lactando",
            "presenta_menoupasia",
            "frecuencia_cereales",
            "frecuencia_frutas",
            "frecuencia_verduras",
            "frecuencia_carne_roja",
            "frecuencia_pollo",
            "frecuencia_lacteos",
            "frecuencia_leguminosas",
            "frecuencia_azucar",
            "frecuencia_grasas",
            "frecuencia_pescado",
            "cuantas_veces_come",
            "quien_prepara_alimentos",
            "litro_consume_agua",
            "litro_consume_refresco",
            "tipo_grasa_preparar_alimentos",
            "litro_consume_cafe",
            "alimentos_causan_malestar",
            "r24_desayuno",
            "r24_colacion_uno",
            "r24_comida",
            "r24_colacion_dos",
            "r24_cena",
            "diagnostico_nutricio",
            "tratamiento_nutricional",
            "idPaciente",
        )
        export_order = (
            "idHistoriaNutricion",
            "archivo",
            "fecha_registro",
            "num_expediente",
            "fecha_nacimiento",
            "municipio_nacimiento",
            "estado_nacimiento",
            "sexo",
            "motivo_consulta",
            "ahf_diabetes",
            "quien_diabetes",
            "ahf_hipertension",
            "quien_hipertension",
            "ahf_dislipidemias",
            "quien_dislipidemias",
            "ap_diabetes_mellitus",
            "ap_hipertension",
            "ap_dislipidemias",
            "problema_gastrointestinal",
            "cual_problema_gastrointestinal",
            "observaciones_patologicas",
            "intervencion_quirurgica",
            "cual_intervencion_quirurgica",
            "alergia_alimento",
            "cual_alergia_alimento",
            "consume_farmaco_alergia",
            "cual_alergia_farmaco",
            "desde_cuando_farmaco",
            "realiza_actividad_fisica",
            "cual_actividad_fisica",
            "duracion",
            "consume_alcohol",
            "consume_tabaco",
            "consume_droga",
            "numero_gestas",
            "numero_partos_cesarea",
            "numero_abortos",
            "fecha_ultima_menstruacion",
            "actualmente_lactando",
            "presenta_menoupasia",
            "frecuencia_cereales",
            "frecuencia_frutas",
            "frecuencia_verduras",
            "frecuencia_carne_roja",
            "frecuencia_pollo",
            "frecuencia_lacteos",
            "frecuencia_leguminosas",
            "frecuencia_azucar",
            "frecuencia_grasas",
            "frecuencia_pescado",
            "cuantas_veces_come",
            "quien_prepara_alimentos",
            "litro_consume_agua",
            "litro_consume_refresco",
            "tipo_grasa_preparar_alimentos",
            "litro_consume_cafe",
            "alimentos_causan_malestar",
            "r24_desayuno",
            "r24_colacion_uno",
            "r24_comida",
            "r24_colacion_dos",
            "r24_cena",
            "diagnostico_nutricio",
            "tratamiento_nutricional",
            "idPaciente",
        )

    def dehydrate_archivo(self, historia):
        return historia.archivo

    def dehydrate_fecha_registro(self, historia):
        return historia.fecha_registro

    def dehydrate_num_expediente(self, historia):
        return historia.datos_personales.get("num_expediente", "")

    def dehydrate_fecha_nacimiento(self, historia):
        return historia.datos_personales.get("fecha_nacimiento", "")

    def dehydrate_municipio_nacimiento(self, historia):
        return historia.datos_personales.get("municipio_nacimiento", "")

    def dehydrate_estado_nacimiento(self, historia):
        return historia.datos_personales.get("estado_nacimiento", "")

    def dehydrate_sexo(self, historia):
        return historia.datos_personales.get("sexo", "")

    def dehydrate_motivo_consulta(self, historia):
        return historia.datos_personales.get("motivo_consulta", "")

    def dehydrate_ahf_diabetes(self, historia):
        return historia.indicadores_clinicos.get("AHF_diabetes", "")

    def dehydrate_quien_diabetes(self, historia):
        return historia.indicadores_clinicos.get("quien_diabetes", "")

    def dehydrate_ahf_hipertension(self, historia):
        return historia.indicadores_clinicos.get("AHF_hipertension", "")

    def dehydrate_quien_hipertension(self, historia):
        return historia.indicadores_clinicos.get("quien_hipertension", "")

    def dehydrate_ahf_dislipidemias(self, historia):
        return historia.indicadores_clinicos.get("AHF_dislipidemias", "")

    def dehydrate_quien_dislipidemias(self, historia):
        return historia.indicadores_clinicos.get("quien_dislipidemias", "")

    def dehydrate_ap_diabetes_mellitus(self, historia):
        return historia.indicadores_clinicos.get("AP_diabetes_mellitus", "")

    def dehydrate_ap_hipertension(self, historia):
        return historia.indicadores_clinicos.get("AP_hipertension", "")

    def dehydrate_ap_dislipidemias(self, historia):
        return historia.indicadores_clinicos.get("AP_dislipidemias", "")

    def dehydrate_problema_gastrointestinal(self, historia):
        return historia.indicadores_clinicos.get("problema_gastrointestinal", "")

    def dehydrate_cual_problema_gastrointestinal(self, historia):
        return historia.indicadores_clinicos.get("cual_problema_gastrointestinal", "")

    def dehydrate_observaciones_patologicas(self, historia):
        return historia.indicadores_clinicos.get("observaciones_patologicas", "")

    def dehydrate_intervencion_quirurgica(self, historia):
        return historia.indicadores_clinicos.get("intervencion_quirurgica", "")

    def dehydrate_cual_intervencion_quirurgica(self, historia):
        return historia.indicadores_clinicos.get("cual_intervencion_quirurgica", "")

    def dehydrate_alergia_alimento(self, historia):
        return historia.indicadores_clinicos.get("alergia_alimento", "")

    def dehydrate_cual_alergia_alimento(self, historia):
        return historia.indicadores_clinicos.get("cual_alergia_alimento", "")

    def dehydrate_consume_farmaco_alergia(self, historia):
        return historia.indicadores_clinicos.get("consume_farmaco_alergia", "")

    def dehydrate_cual_alergia_farmaco(self, historia):
        return historia.indicadores_clinicos.get("cual_alergia_farmaco", "")

    def dehydrate_desde_cuando_farmaco(self, historia):
        return historia.indicadores_clinicos.get("desde_cuando_farmaco", "")

    def dehydrate_realiza_actividad_fisica(self, historia):
        return historia.anp.get("realiza_actividad_fisica", "")

    def dehydrate_cual_actividad_fisica(self, historia):
        return historia.anp.get("cual_actividad_fisica", "")

    def dehydrate_duracion(self, historia):
        return historia.anp.get("duracion", "")

    def dehydrate_consume_alcohol(self, historia):
        return historia.anp.get("consume_alcohol", "")

    def dehydrate_consume_tabaco(self, historia):
        return historia.anp.get("consume_tabaco", "")

    def dehydrate_consume_droga(self, historia):
        return historia.anp.get("consume_droga", "")

    def dehydrate_numero_gestas(self, historia):
        return historia.ago.get("numero_gestas", "")

    def dehydrate_numero_partos_cesarea(self, historia):
        return historia.ago.get("numero_partos_cesarea", "")

    def dehydrate_numero_abortos(self, historia):
        return historia.ago.get("numero_abortos", "")

    def dehydrate_fecha_ultima_menstruacion(self, historia):
        return historia.ago.get("fecha_ultima_menstruacion", "")

    def dehydrate_actualmente_lactando(self, historia):
        return historia.ago.get("actualmente_lactando", "")

    def dehydrate_presenta_menoupasia(self, historia):
        return historia.ago.get("presenta_menoupasia", "")

    def dehydrate_frecuencia_cereales(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_cereales", "")

    def dehydrate_frecuencia_frutas(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_frutas", "")

    def dehydrate_frecuencia_verduras(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_verduras", "")

    def dehydrate_frecuencia_carne_roja(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_carne_roja", "")

    def dehydrate_frecuencia_pollo(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_pollo", "")

    def dehydrate_frecuencia_lacteos(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_lacteos", "")

    def dehydrate_frecuencia_leguminosas(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_leguminosas", "")

    def dehydrate_frecuencia_azucar(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_azucar", "")

    def dehydrate_frecuencia_grasas(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_grasas", "")

    def dehydrate_frecuencia_pescado(self, historia):
        return historia.indicadores_diabeticos.get("frecuencia_pescado", "")

    def dehydrate_cuantas_veces_come(self, historia):
        return historia.indicadores_diabeticos.get("cuantas_veces_come", "")

    def dehydrate_quien_prepara_alimentos(self, historia):
        return historia.indicadores_diabeticos.get("quien_prepara_alimentos", "")

    def dehydrate_litro_consume_agua(self, historia):
        return historia.indicadores_diabeticos.get("litro_consume_agua", "")

    def dehydrate_litro_consume_refresco(self, historia):
        return historia.indicadores_diabeticos.get("litro_consume_refresco", "")

    def dehydrate_tipo_grasa_preparar_alimentos(self, historia):
        return historia.indicadores_diabeticos.get("tipo_grasa_preparar_alimentos", "")

    def dehydrate_litro_consume_cafe(self, historia):
        return historia.indicadores_diabeticos.get("litro_consume_cafe", "")

    def dehydrate_alimentos_causan_malestar(self, historia):
        return historia.indicadores_diabeticos.get("alimentos_causan_malestar", "")

    def dehydrate_r24_desayuno(self, historia):
        return historia.indicadores_diabeticos.get("r24_desayuno", "")

    def dehydrate_r24_colacion_uno(self, historia):
        return historia.indicadores_diabeticos.get("r24_colacion_uno", "")

    def dehydrate_r24_comida(self, historia):
        return historia.indicadores_diabeticos.get("r24_comida", "")

    def dehydrate_r24_colacion_dos(self, historia):
        return historia.indicadores_diabeticos.get("r24_colacion_dos", "")

    def dehydrate_r24_cena(self, historia):
        return historia.indicadores_diabeticos.get("r24_cena", "")

    def dehydrate_diagnostico_nutricio(self, historia):
        return historia.diagnostico.get("diagnostico_nutricio", "")

    def dehydrate_tratamiento_nutricional(self, historia):
        return historia.diagnostico.get("tratamiento_nutricional", "")

    def dehydrate_idPaciente(self, historia):
        return historia.idPaciente


class HistoriaNutricionResource(resources.ModelResource):
    expediente_ficha = fields.Field(column_name="Expediente Ficha")
    fecha_registro = fields.Field(column_name="Fecha de Registro")
    genero = fields.Field(column_name="Género")
    fecha_nacimiento = fields.Field(column_name="Fecha de Nacimiento")
    lugar_nacimiento = fields.Field(column_name="Lugar de Nacimiento")
    religion = fields.Field(column_name="Religión")
    ocupacion = fields.Field(column_name="Ocupación")
    nivel_socioeconomico = fields.Field(column_name="Nivel Socioeconómico")
    motivo_consulta = fields.Field(column_name="Motivo de Consulta")
    referido = fields.Field(column_name="Referido")
    recibido_orientacion_psico = fields.Field(
        column_name="Recibido Orientación Psicológica"
    )
    historia_actual_paciente = fields.Field(column_name="Historia Actual del Paciente")
    historia_desarrollo = fields.Field(column_name="Historia de Desarrollo")
    primeros_cuatro_anos = fields.Field(column_name="Primeros Cuatro Años")
    historia_escolar_kinder = fields.Field(column_name="Historia Escolar Kinder")
    historia_escolar_primaria = fields.Field(column_name="Historia Escolar Primaria")
    historia_escolar_secundaria = fields.Field(
        column_name="Historia Escolar Secundaria"
    )
    historia_escolar_preparatoria = fields.Field(
        column_name="Historia Escolar Preparatoria"
    )
    historia_escolar_profesional = fields.Field(
        column_name="Historia Escolar Profesional"
    )
    historia_laboral = fields.Field(column_name="Historia Laboral")
    gusta_trabajo = fields.Field(column_name="Gusta del Trabajo")
    no_gusta_trabajo = fields.Field(column_name="No Gusta del Trabajo")
    percibe_padres = fields.Field(column_name="Percepción de los Padres")
    contado_padres = fields.Field(column_name="Relación con los Padres")
    percibe_vive_casa = fields.Field(column_name="Percepción de los que Viven en Casa")
    percibe_hijos = fields.Field(column_name="Percepción de los Hijos")
    otros_familiares_significativos = fields.Field(
        column_name="Otros Familiares Significativos"
    )
    tiene_mascotas = fields.Field(column_name="Tiene Mascotas")
    padecimientos_heredofamiliares = fields.Field(
        column_name="Padecimientos Heredofamiliares"
    )
    enfermedades_padecido = fields.Field(column_name="Enfermedades Padecidas")
    padece_sintomas_transtornos_psicomaticos = fields.Field(
        column_name="Padece Síntomas de Trastornos Psicosomáticos"
    )
    bajo_tratamiento = fields.Field(column_name="Bajo Tratamiento")
    intervenido_quirurgicamente = fields.Field(
        column_name="Intervenido Quirúrgicamente"
    )
    tiene_adicciones = fields.Field(column_name="Tiene Adicciones")
    recibido_atencion_medica_adecuada = fields.Field(
        column_name="Recibido Atención Médica Adecuada"
    )
    especificar = fields.Field(column_name="Especificar")
    cuando_diferencia_genero = fields.Field(column_name="Cuándo Diferencia de Género")
    como_diferencia_genero = fields.Field(column_name="Cómo Diferencia de Género")
    genero_asignaron_nino = fields.Field(column_name="Género Asignado al Niño")
    experiencia_abuso_sexual = fields.Field(column_name="Experiencia de Abuso Sexual")
    sexual_activo = fields.Field(column_name="Sexualmente Activo")
    datos_distintivo_genero_femenino = fields.Field(
        column_name="Datos Distintivo de Género Femenino"
    )
    datos_distintivo_genero_masculino = fields.Field(
        column_name="Datos Distintivo de Género Masculino"
    )
    archivo = fields.Field(column_name="Archivo")
    id_paciente = fields.Field(column_name="ID Paciente")

    class Meta:
        model = HistoriaNutricion
        fields = (
            "id",
            "expediente_ficha",
            "fecha_registro",
            "genero",
            "fecha_nacimiento",
            "lugar_nacimiento",
            "religion",
            "ocupacion",
            "nivel_socioeconomico",
            "motivo_consulta",
            "referido",
            "recibido_orientacion_psico",
            "historia_actual_paciente",
            "historia_desarrollo",
            "primeros_cuatro_anos",
            "historia_escolar_kinder",
            "historia_escolar_primaria",
            "historia_escolar_secundaria",
            "historia_escolar_preparatoria",
            "historia_escolar_profesional",
            "historia_laboral",
            "gusta_trabajo",
            "no_gusta_trabajo",
            "percibe_padres",
            "contado_padres",
            "percibe_vive_casa",
            "percibe_hijos",
            "otros_familiares_significativos",
            "tiene_mascotas",
            "padecimientos_heredofamiliares",
            "enfermedades_padecido",
            "padece_sintomas_transtornos_psicomaticos",
            "bajo_tratamiento",
            "intervenido_quirurgicamente",
            "tiene_adicciones",
            "recibido_atencion_medica_adecuada",
            "especificar",
            "cuando_diferencia_genero",
            "como_diferencia_genero",
            "genero_asignaron_nino",
            "experiencia_abuso_sexual",
            "sexual_activo",
            "datos_distintivo_genero_femenino",
            "datos_distintivo_genero_masculino",
            "archivo",
            "id_paciente",
        )
        export_order = fields

    def dehydrate_expediente_ficha(self, historia):
        return historia.expedienteFicha

    def dehydrate_fecha_registro(self, historia):
        return historia.fecha_registro

    def dehydrate_genero(self, historia):
        return historia.datos_generales.get("genero", "")

    def dehydrate_fecha_nacimiento(self, historia):
        return historia.datos_generales.get("fecha_nacimiento", "")

    def dehydrate_lugar_nacimiento(self, historia):
        return historia.datos_generales.get("lugar_nacimiento", "")

    def dehydrate_religion(self, historia):
        return historia.datos_generales.get("religion", "")

    def dehydrate_ocupacion(self, historia):
        return historia.datos_generales.get("ocupacion", "")

    def dehydrate_nivel_socioeconomico(self, historia):
        return historia.datos_generales.get("nivel_socioeconomico", "")

    def dehydrate_motivo_consulta(self, historia):
        return historia.datos_generales.get("motivo_consulta", "")

    def dehydrate_referido(self, historia):
        return historia.datos_generales.get("referido", "")

    def dehydrate_recibido_orientacion_psico(self, historia):
        return historia.datos_generales.get("recibido_orientacion_psico", "")

    def dehydrate_historia_actual_paciente(self, historia):
        return historia.historia_actual_paciente

    def dehydrate_historia_desarrollo(self, historia):
        return historia.datos_desarrollo.get("historia_desarrollo", "")

    def dehydrate_primeros_cuatro_anos(self, historia):
        return historia.datos_desarrollo.get("primeros_cuatro_años", "")

    def dehydrate_historia_escolar_kinder(self, historia):
        return historia.datos_escolar.get("historia_escolar_kinder", "")

    def dehydrate_historia_escolar_primaria(self, historia):
        return historia.datos_escolar.get("historia_escolar_primaria", "")

    def dehydrate_historia_escolar_secundaria(self, historia):
        return historia.datos_escolar.get("historia_escolar_secundaria", "")

    def dehydrate_historia_escolar_preparatoria(self, historia):
        return historia.datos_escolar.get("historia_escolar_preparatoria", "")

    def dehydrate_historia_escolar_profesional(self, historia):
        return historia.datos_escolar.get("historia_escolar_profesional", "")

    def dehydrate_historia_laboral(self, historia):
        return historia.datos_laboral.get("historia_laboral", "")

    def dehydrate_gusta_trabajo(self, historia):
        return historia.datos_laboral.get("gusta_trabajo", "")

    def dehydrate_no_gusta_trabajo(self, historia):
        return historia.datos_laboral.get("no_gusta_trabajo", "")

    def dehydrate_percibe_padres(self, historia):
        return historia.datos_familiares.get("percibe_padres", "")

    def dehydrate_contado_padres(self, historia):
        return historia.datos_familiares.get("contado_padres", "")

    def dehydrate_percibe_vive_casa(self, historia):
        return historia.datos_familiares.get("percibe_vive_casa", "")

    def dehydrate_percibe_hijos(self, historia):
        return historia.datos_familiares.get("percibe_hijos", "")

    def dehydrate_otros_familiares_significativos(self, historia):
        return historia.datos_familiares.get("otros_familiares_significativos", "")

    def dehydrate_tiene_mascotas(self, historia):
        return historia.datos_familiares.get("tiene_mascotas", "")

    def dehydrate_padecimientos_heredofamiliares(self, historia):
        return historia.datos_medico_quirurgica.get(
            "padecimientos_heredofamiliares", ""
        )

    def dehydrate_enfermedades_padecido(self, historia):
        return historia.datos_medico_quirurgica.get("enfermedades_padecido", "")

    def dehydrate_padece_sintomas_transtornos_psicomaticos(self, historia):
        return historia.datos_medico_quirurgica.get(
            "padece_sintomas_transtornos_psicomaticos", ""
        )

    def dehydrate_bajo_tratamiento(self, historia):
        return historia.datos_medico_quirurgica.get("bajo_tratamiento", "")

    def dehydrate_intervenido_quirurgicamente(self, historia):
        return historia.datos_medico_quirurgica.get("intervenido_quirurgicamente", "")

    def dehydrate_tiene_adicciones(self, historia):
        return historia.datos_medico_quirurgica.get("tiene_adicciones", "")

    def dehydrate_recibido_atencion_medica_adecuada(self, historia):
        return historia.datos_medico_quirurgica.get(
            "recibido_atencion_medica_adecuada", ""
        )

    def dehydrate_especificar(self, historia):
        return historia.datos_medico_quirurgica.get("especificar", "")

    def dehydrate_cuando_diferencia_genero(self, historia):
        return historia.datos_sexual.get("cuando_diferencia_genero", "")

    def dehydrate_como_diferencia_genero(self, historia):
        return historia.datos_sexual.get("como_diferencia_genero", "")

    def dehydrate_genero_asignaron_nino(self, historia):
        return historia.datos_sexual.get("genero_asignaron_niño", "")

    def dehydrate_experiencia_abuso_sexual(self, historia):
        return historia.datos_sexual.get("experiencia_abuso_sexual", "")

    def dehydrate_sexual_activo(self, historia):
        return historia.datos_sexual.get("sexual_activo", "")

    def dehydrate_datos_distintivo_genero_femenino(self, historia):
        return historia.datos_sexual.get("datos_distintivo_genero", {}).get(
            "isFemenino", ""
        )

    def dehydrate_datos_distintivo_genero_masculino(self, historia):
        return historia.datos_sexual.get("datos_distintivo_genero", {}).get(
            "isMasculino", ""
        )

    def dehydrate_archivo(self, historia):
        return historia.archivo

    def dehydrate_id_paciente(self, historia):
        return historia.idPaciente


class FichaPsiAdultoResource(resources.ModelResource):
    expediente_ficha = fields.Field(column_name="Expediente Ficha")
    fecha_registro = fields.Field(column_name="Fecha de Registro")
    genero = fields.Field(column_name="Género")
    fecha_nacimiento = fields.Field(column_name="Fecha de Nacimiento")
    lugar_nacimiento = fields.Field(column_name="Lugar de Nacimiento")
    religion = fields.Field(column_name="Religión")
    ocupacion = fields.Field(column_name="Ocupación")
    nivel_socioeconomico = fields.Field(column_name="Nivel Socioeconómico")
    motivo_consulta = fields.Field(column_name="Motivo de Consulta")
    referido = fields.Field(column_name="Referido")
    recibido_orientacion_psico = fields.Field(
        column_name="Recibido Orientación Psicológica"
    )
    historia_actual_paciente = fields.Field(column_name="Historia Actual del Paciente")
    historia_desarrollo = fields.Field(column_name="Historia de Desarrollo")
    primeros_cuatro_anos = fields.Field(column_name="Primeros Cuatro Años")
    historia_escolar_kinder = fields.Field(column_name="Historia Escolar Kinder")
    historia_escolar_primaria = fields.Field(column_name="Historia Escolar Primaria")
    historia_escolar_secundaria = fields.Field(
        column_name="Historia Escolar Secundaria"
    )
    historia_escolar_preparatoria = fields.Field(
        column_name="Historia Escolar Preparatoria"
    )
    historia_escolar_profesional = fields.Field(
        column_name="Historia Escolar Profesional"
    )
    historia_laboral = fields.Field(column_name="Historia Laboral")
    gusta_trabajo = fields.Field(column_name="Gusta del Trabajo")
    no_gusta_trabajo = fields.Field(column_name="No Gusta del Trabajo")
    percibe_padres = fields.Field(column_name="Percepción de los Padres")
    contado_padres = fields.Field(column_name="Relación con los Padres")
    percibe_vive_casa = fields.Field(column_name="Percepción de los que Viven en Casa")
    percibe_hijos = fields.Field(column_name="Percepción de los Hijos")
    otros_familiares_significativos = fields.Field(
        column_name="Otros Familiares Significativos"
    )
    tiene_mascotas = fields.Field(column_name="Tiene Mascotas")
    padecimientos_heredofamiliares = fields.Field(
        column_name="Padecimientos Heredofamiliares"
    )
    enfermedades_padecido = fields.Field(column_name="Enfermedades Padecidas")
    padece_sintomas_transtornos_psicomaticos = fields.Field(
        column_name="Padece Síntomas de Trastornos Psicosomáticos"
    )
    bajo_tratamiento = fields.Field(column_name="Bajo Tratamiento")
    intervenido_quirurgicamente = fields.Field(
        column_name="Intervenido Quirúrgicamente"
    )
    tiene_adicciones = fields.Field(column_name="Tiene Adicciones")
    recibido_atencion_medica_adecuada = fields.Field(
        column_name="Recibido Atención Médica Adecuada"
    )
    especificar = fields.Field(column_name="Especificar")
    cuando_diferencia_genero = fields.Field(column_name="Cuándo Diferencia de Género")
    como_diferencia_genero = fields.Field(column_name="Cómo Diferencia de Género")
    genero_asignaron_nino = fields.Field(column_name="Género Asignado al Niño")
    experiencia_abuso_sexual = fields.Field(column_name="Experiencia de Abuso Sexual")
    sexual_activo = fields.Field(column_name="Sexualmente Activo")
    datos_distintivo_genero_femenino = fields.Field(
        column_name="Datos Distintivo de Género Femenino"
    )
    datos_distintivo_genero_masculino = fields.Field(
        column_name="Datos Distintivo de Género Masculino"
    )
    archivo = fields.Field(column_name="Archivo")
    id_paciente = fields.Field(column_name="ID Paciente")

    class Meta:
        model = FichaPsicologicaAdulto
        fields = (
            "id",
            "expediente_ficha",
            "fecha_registro",
            "genero",
            "fecha_nacimiento",
            "lugar_nacimiento",
            "religion",
            "ocupacion",
            "nivel_socioeconomico",
            "motivo_consulta",
            "referido",
            "recibido_orientacion_psico",
            "historia_actual_paciente",
            "historia_desarrollo",
            "primeros_cuatro_anos",
            "historia_escolar_kinder",
            "historia_escolar_primaria",
            "historia_escolar_secundaria",
            "historia_escolar_preparatoria",
            "historia_escolar_profesional",
            "historia_laboral",
            "gusta_trabajo",
            "no_gusta_trabajo",
            "percibe_padres",
            "contado_padres",
            "percibe_vive_casa",
            "percibe_hijos",
            "otros_familiares_significativos",
            "tiene_mascotas",
            "padecimientos_heredofamiliares",
            "enfermedades_padecido",
            "padece_sintomas_transtornos_psicomaticos",
            "bajo_tratamiento",
            "intervenido_quirurgicamente",
            "tiene_adicciones",
            "recibido_atencion_medica_adecuada",
            "especificar",
            "cuando_diferencia_genero",
            "como_diferencia_genero",
            "genero_asignaron_nino",
            "experiencia_abuso_sexual",
            "sexual_activo",
            "datos_distintivo_genero_femenino",
            "datos_distintivo_genero_masculino",
            "archivo",
            "id_paciente",
        )
        export_order = fields

    def dehydrate_expediente_ficha(self, historia):
        return historia.expedienteFicha

    def dehydrate_fecha_registro(self, historia):
        return historia.fecha_registro

    def dehydrate_genero(self, historia):
        return historia.datos_generales.get("genero", "")

    def dehydrate_fecha_nacimiento(self, historia):
        return historia.datos_generales.get("fecha_nacimiento", "")

    def dehydrate_lugar_nacimiento(self, historia):
        return historia.datos_generales.get("lugar_nacimiento", "")

    def dehydrate_religion(self, historia):
        return historia.datos_generales.get("religion", "")

    def dehydrate_ocupacion(self, historia):
        return historia.datos_generales.get("ocupacion", "")

    def dehydrate_nivel_socioeconomico(self, historia):
        return historia.datos_generales.get("nivel_socioeconomico", "")

    def dehydrate_motivo_consulta(self, historia):
        return historia.datos_generales.get("motivo_consulta", "")

    def dehydrate_referido(self, historia):
        return historia.datos_generales.get("referido", "")

    def dehydrate_recibido_orientacion_psico(self, historia):
        return historia.datos_generales.get("recibido_orientacion_psico", "")

    def dehydrate_historia_actual_paciente(self, historia):
        return historia.historia_actual_paciente

    def dehydrate_historia_desarrollo(self, historia):
        return historia.datos_desarrollo.get("historia_desarrollo", "")

    def dehydrate_primeros_cuatro_anos(self, historia):
        return historia.datos_desarrollo.get("primeros_cuatro_años", "")

    def dehydrate_historia_escolar_kinder(self, historia):
        return historia.datos_escolar.get("historia_escolar_kinder", "")

    def dehydrate_historia_escolar_primaria(self, historia):
        return historia.datos_escolar.get("historia_escolar_primaria", "")

    def dehydrate_historia_escolar_secundaria(self, historia):
        return historia.datos_escolar.get("historia_escolar_secundaria", "")

    def dehydrate_historia_escolar_preparatoria(self, historia):
        return historia.datos_escolar.get("historia_escolar_preparatoria", "")

    def dehydrate_historia_escolar_profesional(self, historia):
        return historia.datos_escolar.get("historia_escolar_profesional", "")

    def dehydrate_historia_laboral(self, historia):
        return historia.datos_laboral.get("historia_laboral", "")

    def dehydrate_gusta_trabajo(self, historia):
        return historia.datos_laboral.get("gusta_trabajo", "")

    def dehydrate_no_gusta_trabajo(self, historia):
        return historia.datos_laboral.get("no_gusta_trabajo", "")

    def dehydrate_percibe_padres(self, historia):
        return historia.datos_familiares.get("percibe_padres", "")

    def dehydrate_contado_padres(self, historia):
        return historia.datos_familiares.get("contado_padres", "")

    def dehydrate_percibe_vive_casa(self, historia):
        return historia.datos_familiares.get("percibe_vive_casa", "")

    def dehydrate_percibe_hijos(self, historia):
        return historia.datos_familiares.get("percibe_hijos", "")

    def dehydrate_otros_familiares_significativos(self, historia):
        return historia.datos_familiares.get("otros_familiares_significativos", "")

    def dehydrate_tiene_mascotas(self, historia):
        return historia.datos_familiares.get("tiene_mascotas", "")

    def dehydrate_padecimientos_heredofamiliares(self, historia):
        return historia.datos_medico_quirurgica.get(
            "padecimientos_heredofamiliares", ""
        )

    def dehydrate_enfermedades_padecido(self, historia):
        return historia.datos_medico_quirurgica.get("enfermedades_padecido", "")

    def dehydrate_padece_sintomas_transtornos_psicomaticos(self, historia):
        return historia.datos_medico_quirurgica.get(
            "padece_sintomas_transtornos_psicomaticos", ""
        )

    def dehydrate_bajo_tratamiento(self, historia):
        return historia.datos_medico_quirurgica.get("bajo_tratamiento", "")

    def dehydrate_intervenido_quirurgicamente(self, historia):
        return historia.datos_medico_quirurgica.get("intervenido_quirurgicamente", "")

    def dehydrate_tiene_adicciones(self, historia):
        return historia.datos_medico_quirurgica.get("tiene_adicciones", "")

    def dehydrate_recibido_atencion_medica_adecuada(self, historia):
        return historia.datos_medico_quirurgica.get(
            "recibido_atencion_medica_adecuada", ""
        )

    def dehydrate_especificar(self, historia):
        return historia.datos_medico_quirurgica.get("especificar", "")

    def dehydrate_cuando_diferencia_genero(self, historia):
        return historia.datos_sexual.get("cuando_diferencia_genero", "")

    def dehydrate_como_diferencia_genero(self, historia):
        return historia.datos_sexual.get("como_diferencia_genero", "")

    def dehydrate_genero_asignaron_nino(self, historia):
        return historia.datos_sexual.get("genero_asignaron_niño", "")

    def dehydrate_experiencia_abuso_sexual(self, historia):
        return historia.datos_sexual.get("experiencia_abuso_sexual", "")

    def dehydrate_sexual_activo(self, historia):
        return historia.datos_sexual.get("sexual_activo", "")

    def dehydrate_datos_distintivo_genero_femenino(self, historia):
        return historia.datos_sexual.get("datos_distintivo_genero", {}).get(
            "isFemenino", ""
        )

    def dehydrate_datos_distintivo_genero_masculino(self, historia):
        return historia.datos_sexual.get("datos_distintivo_genero", {}).get(
            "isMasculino", ""
        )

    def dehydrate_archivo(self, historia):
        return historia.archivo

    def dehydrate_id_paciente(self, historia):
        return historia.idPaciente


class FichaPsicoNinoResource(resources.ModelResource):
    expediente_ficha = fields.Field(column_name="Expediente Ficha")
    fecha_registro = fields.Field(column_name="Fecha de Registro")
    anios = fields.Field(column_name="Años")
    meses = fields.Field(column_name="Meses")
    fecha_nacimiento = fields.Field(column_name="Fecha de Nacimiento")
    lugar_nacimiento = fields.Field(column_name="Lugar de Nacimiento")
    grado_escolar = fields.Field(column_name="Grado Escolar")
    nombre_escuela = fields.Field(column_name="Nombre de la Escuela")
    ubicacion_escuela = fields.Field(column_name="Ubicación de la Escuela")
    lugar_ocupa_familia = fields.Field(column_name="Lugar que Ocupa en la Familia")
    informacion_hermanos = fields.Field(column_name="Información de Hermanos")
    nombre_padre = fields.Field(column_name="Nombre del Padre")
    edad_padre = fields.Field(column_name="Edad del Padre")
    escolaridad_padre = fields.Field(column_name="Escolaridad del Padre")
    ocupacion_padre = fields.Field(column_name="Ocupación del Padre")
    nombre_madre = fields.Field(column_name="Nombre de la Madre")
    edad_madre = fields.Field(column_name="Edad de la Madre")
    escolaridad_madre = fields.Field(column_name="Escolaridad de la Madre")
    ocupacion_madre = fields.Field(column_name="Ocupación de la Madre")
    estado_civil_padres = fields.Field(column_name="Estado Civil de los Padres")
    anios_estado_civil = fields.Field(column_name="Años de Estado Civil")
    nombre_tutor = fields.Field(column_name="Nombre del Tutor")
    edad_tutor = fields.Field(column_name="Edad del Tutor")
    ocupacion_tutor = fields.Field(column_name="Ocupación del Tutor")
    motivos_nino_cargo_tutor = fields.Field(
        column_name="Motivos del Niño a Cargo del Tutor"
    )
    desde_cuando_tutor = fields.Field(column_name="Desde Cuándo Está a Cargo del Tutor")
    descripcion_viven_con_nino = fields.Field(
        column_name="Descripción de los que Viven con el Niño"
    )
    motivo = fields.Field(column_name="Motivo")
    canalizado_por = fields.Field(column_name="Canalizado Por")
    consulta_otro_profesional = fields.Field(
        column_name="Consulta con Otro Profesional"
    )
    diagnostico_otorgado = fields.Field(column_name="Diagnóstico Otorgado")
    toma_medicamento = fields.Field(column_name="Toma Medicamento")
    motivo_medicamento = fields.Field(column_name="Motivo del Medicamento")
    nombre_medicamento = fields.Field(column_name="Nombre del Medicamento")
    dosis_medicamento = fields.Field(column_name="Dosis del Medicamento")
    realizado_estudio = fields.Field(column_name="Realizado Estudio")
    numero_embarazos_madre = fields.Field(column_name="Número de Embarazos de la Madre")
    tiempo_gestacion = fields.Field(column_name="Tiempo de Gestación")
    problemas_durante_embarazo = fields.Field(
        column_name="Problemas Durante el Embarazo"
    )
    medicamentos_embarazo = fields.Field(column_name="Medicamentos Durante el Embarazo")
    motivo_medicamento_embarazo = fields.Field(
        column_name="Motivo del Medicamento Durante el Embarazo"
    )
    nombre_medicamento_embarazo = fields.Field(
        column_name="Nombre del Medicamento Durante el Embarazo"
    )
    dosis_medicamento_embarazo = fields.Field(
        column_name="Dosis del Medicamento Durante el Embarazo"
    )
    tipo_parto = fields.Field(column_name="Tipo de Parto")
    duracion_parto = fields.Field(column_name="Duración del Parto")
    complicaciones_parto = fields.Field(column_name="Complicaciones Durante el Parto")
    peso_nacer = fields.Field(column_name="Peso al Nacer")
    talla_nacer = fields.Field(column_name="Talla al Nacer")
    alimentacion_seno_materno = fields.Field(
        column_name="Alimentación con Seno Materno"
    )
    tiempo_alimentacion_seno = fields.Field(
        column_name="Tiempo de Alimentación con Seno Materno"
    )
    edad_sosten_cefalico = fields.Field(column_name="Edad en que Sostuvo el Cefálico")
    edad_balbuceo = fields.Field(column_name="Edad en que Balbuceó")
    edad_sentarse = fields.Field(column_name="Edad en que se Sentó")
    edad_ponerse_pie = fields.Field(column_name="Edad en que se Puso de Pie")
    edad_camino = fields.Field(column_name="Edad en que Caminó")
    controla_esfinter = fields.Field(column_name="Controla Esfínteres")
    edad_control_esfinter = fields.Field(column_name="Edad de Control de Esfínteres")
    enfermedades_posteriores = fields.Field(column_name="Enfermedades Posteriores")
    antecedentes_padecimiento_actual = fields.Field(
        column_name="Antecedentes del Padecimiento Actual"
    )
    salud_fisica_actual = fields.Field(column_name="Salud Física Actual")
    edad_ingreso_escolar = fields.Field(column_name="Edad de Ingreso Escolar")
    nivel_ingreso = fields.Field(column_name="Nivel de Ingreso")
    conducta_ingreso = fields.Field(column_name="Conducta de Ingreso")
    archivo = fields.Field(column_name="Archivo")
    id_paciente = fields.Field(column_name="ID Paciente")

    class Meta:
        model = FichaPsicologicaNiño
        fields = (
            "id",
            "expediente_ficha",
            "fecha_registro",
            "anios",
            "meses",
            "fecha_nacimiento",
            "lugar_nacimiento",
            "grado_escolar",
            "nombre_escuela",
            "ubicacion_escuela",
            "lugar_ocupa_familia",
            "informacion_hermanos",
            "nombre_padre",
            "edad_padre",
            "escolaridad_padre",
            "ocupacion_padre",
            "nombre_madre",
            "edad_madre",
            "escolaridad_madre",
            "ocupacion_madre",
            "estado_civil_padres",
            "anios_estado_civil",
            "nombre_tutor",
            "edad_tutor",
            "ocupacion_tutor",
            "motivos_nino_cargo_tutor",
            "desde_cuando_tutor",
            "descripcion_viven_con_nino",
            "motivo",
            "canalizado_por",
            "consulta_otro_profesional",
            "diagnostico_otorgado",
            "toma_medicamento",
            "motivo_medicamento",
            "nombre_medicamento",
            "dosis_medicamento",
            "realizado_estudio",
            "numero_embarazos_madre",
            "tiempo_gestacion",
            "problemas_durante_embarazo",
            "medicamentos_embarazo",
            "motivo_medicamento_embarazo",
            "nombre_medicamento_embarazo",
            "dosis_medicamento_embarazo",
            "tipo_parto",
            "duracion_parto",
            "complicaciones_parto",
            "peso_nacer",
            "talla_nacer",
            "alimentacion_seno_materno",
            "tiempo_alimentacion_seno",
            "edad_sosten_cefalico",
            "edad_balbuceo",
            "edad_sentarse",
            "edad_ponerse_pie",
            "edad_camino",
            "controla_esfinter",
            "edad_control_esfinter",
            "enfermedades_posteriores",
            "antecedentes_padecimiento_actual",
            "salud_fisica_actual",
            "edad_ingreso_escolar",
            "nivel_ingreso",
            "conducta_ingreso",
            "archivo",
            "id_paciente",
        )
        export_order = fields

    def dehydrate_expediente_ficha(self, ficha):
        return ficha.expedienteFicha

    def dehydrate_fecha_registro(self, ficha):
        return ficha.fecha_registro

    def dehydrate_anios(self, ficha):
        return ficha.datos_generales.get("anios", "")

    def dehydrate_meses(self, ficha):
        return ficha.datos_generales.get("meses", "")

    def dehydrate_fecha_nacimiento(self, ficha):
        return ficha.datos_generales.get("fecha_nacimiento", "")

    def dehydrate_lugar_nacimiento(self, ficha):
        return ficha.datos_generales.get("lugar_nacimiento", "")

    def dehydrate_grado_escolar(self, ficha):
        return ficha.datos_generales.get("grado_escolar", "")

    def dehydrate_nombre_escuela(self, ficha):
        return ficha.datos_generales.get("nombre_escuela", "")

    def dehydrate_ubicacion_escuela(self, ficha):
        return ficha.datos_generales.get("ubicacion_escuela", "")

    def dehydrate_lugar_ocupa_familia(self, ficha):
        return ficha.datos_generales.get("lugar_ocupa_familia", "")

    def dehydrate_informacion_hermanos(self, ficha):
        return ficha.datos_generales.get("informacion_hermanos", "")

    def dehydrate_nombre_padre(self, ficha):
        return ficha.datos_generales.get("nombre_padre", "")

    def dehydrate_edad_padre(self, ficha):
        return ficha.datos_generales.get("edad_padre", "")

    def dehydrate_escolaridad_padre(self, ficha):
        return ficha.datos_generales.get("escolaridad_padre", "")

    def dehydrate_ocupacion_padre(self, ficha):
        return ficha.datos_generales.get("ocupacion_padre", "")

    def dehydrate_nombre_madre(self, ficha):
        return ficha.datos_generales.get("nombre_madre", "")

    def dehydrate_edad_madre(self, ficha):
        return ficha.datos_generales.get("edad_madre", "")

    def dehydrate_escolaridad_madre(self, ficha):
        return ficha.datos_generales.get("escolaridad_madre", "")

    def dehydrate_ocupacion_madre(self, ficha):
        return ficha.datos_generales.get("ocupacion_madre", "")

    def dehydrate_estado_civil_padres(self, ficha):
        return ficha.datos_generales.get("estado_civil_padres", "")

    def dehydrate_anios_estado_civil(self, ficha):
        return ficha.datos_generales.get("anios_estado_civil", "")

    def dehydrate_nombre_tutor(self, ficha):
        return ficha.datos_generales.get("nombre_tutor", "")

    def dehydrate_edad_tutor(self, ficha):
        return ficha.datos_generales.get("edad_tutor", "")

    def dehydrate_ocupacion_tutor(self, ficha):
        return ficha.datos_generales.get("ocupacion_tutor", "")

    def dehydrate_motivos_nino_cargo_tutor(self, ficha):
        return ficha.datos_generales.get("motivos_nino_cargo_tutor", "")

    def dehydrate_desde_cuando_tutor(self, ficha):
        return ficha.datos_generales.get("desde_cuando_tutor", "")

    def dehydrate_descripcion_viven_con_nino(self, ficha):
        return ficha.datos_generales.get("descripcion_viven_con_nino", "")

    def dehydrate_motivo(self, ficha):
        return ficha.datos_generales.get("motivo", "")

    def dehydrate_canalizado_por(self, ficha):
        return ficha.datos_generales.get("canalizado_por", "")

    def dehydrate_consulta_otro_profesional(self, ficha):
        return ficha.antecedentes_padecimiento.get("consulta_otro_profesional", "")

    def dehydrate_diagnostico_otorgado(self, ficha):
        return ficha.antecedentes_padecimiento.get("diagnostico_otorgado", "")

    def dehydrate_toma_medicamento(self, ficha):
        return ficha.antecedentes_padecimiento.get("toma_medicamento", "")

    def dehydrate_motivo_medicamento(self, ficha):
        return ficha.antecedentes_padecimiento.get("motivo_medicamento", "")

    def dehydrate_nombre_medicamento(self, ficha):
        return ficha.antecedentes_padecimiento.get("nombre_medicamento", "")

    def dehydrate_dosis_medicamento(self, ficha):
        return ficha.antecedentes_padecimiento.get("dosis_medicamento", "")

    def dehydrate_realizado_estudio(self, ficha):
        return ficha.antecedentes_padecimiento.get("realizado_estudio", "")

    def dehydrate_numero_embarazos_madre(self, ficha):
        return ficha.antecedentes_desarrollo.get("numero_embarazos_madre", "")

    def dehydrate_tiempo_gestacion(self, ficha):
        return ficha.antecedentes_desarrollo.get("tiempo_gestacion", "")

    def dehydrate_problemas_durante_embarazo(self, ficha):
        return ficha.antecedentes_desarrollo.get("problemas_durante_embarazo", "")

    def dehydrate_medicamentos_embarazo(self, ficha):
        return ficha.antecedentes_desarrollo.get("medicamentos_embarazo", "")

    def dehydrate_motivo_medicamento_embarazo(self, ficha):
        return ficha.antecedentes_desarrollo.get("motivo_medicamento_embarazo", "")

    def dehydrate_nombre_medicamento_embarazo(self, ficha):
        return ficha.antecedentes_desarrollo.get("nombre_medicamento_embarazo", "")

    def dehydrate_dosis_medicamento_embarazo(self, ficha):
        return ficha.antecedentes_desarrollo.get("dosis_medicamento_embarazo", "")

    def dehydrate_tipo_parto(self, ficha):
        return ficha.antecedentes_desarrollo.get("tipo_parto", "")

    def dehydrate_duracion_parto(self, ficha):
        return ficha.antecedentes_desarrollo.get("duracion_parto", "")

    def dehydrate_complicaciones_parto(self, ficha):
        return ficha.antecedentes_desarrollo.get("complicaciones_parto", "")

    def dehydrate_peso_nacer(self, ficha):
        return ficha.antecedentes_desarrollo.get("peso_nacer", "")

    def dehydrate_talla_nacer(self, ficha):
        return ficha.antecedentes_desarrollo.get("talla_nacer", "")

    def dehydrate_alimentacion_seno_materno(self, ficha):
        return ficha.antecedentes_desarrollo.get("alimentacion_seno_materno", "")

    def dehydrate_tiempo_alimentacion_seno(self, ficha):
        return ficha.antecedentes_desarrollo.get("tiempo_alimentacion_seno", "")

    def dehydrate_edad_sosten_cefalico(self, ficha):
        return ficha.antecedentes_desarrollo.get("edad_sosten_cefalico", "")

    def dehydrate_edad_balbuceo(self, ficha):
        return ficha.antecedentes_desarrollo.get("edad_balbuceo", "")

    def dehydrate_edad_sentarse(self, ficha):
        return ficha.antecedentes_desarrollo.get("edad_sentarse", "")

    def dehydrate_edad_ponerse_pie(self, ficha):
        return ficha.antecedentes_desarrollo.get("edad_ponerse_pie", "")

    def dehydrate_edad_camino(self, ficha):
        return ficha.antecedentes_desarrollo.get("edad_camino", "")

    def dehydrate_controla_esfinter(self, ficha):
        return ficha.antecedentes_desarrollo.get("controla_esfinter", "")

    def dehydrate_edad_control_esfinter(self, ficha):
        return ficha.antecedentes_desarrollo.get("edad_control_esfinter", "")

    def dehydrate_enfermedades_posteriores(self, ficha):
        return ficha.antecedentes_desarrollo.get("enfermedades_posteriores", "")

    def dehydrate_antecedentes_padecimiento_actual(self, ficha):
        return ficha.antecedentes_desarrollo.get("antecedentes_padecimiento_actual", "")

    def dehydrate_salud_fisica_actual(self, ficha):
        return ficha.antecedentes_desarrollo.get("salud_fisica_actual", "")

    def dehydrate_edad_ingreso_escolar(self, ficha):
        return ficha.datos_escolares.get("edad_ingreso_escolar", "")

    def dehydrate_nivel_ingreso(self, ficha):
        return ficha.datos_escolares.get("nivel_ingreso", "")

    def dehydrate_conducta_ingreso(self, ficha):
        return ficha.datos_escolares.get("conducta_ingreso", "")

    def dehydrate_archivo(self, ficha):
        return ficha.archivo

    def dehydrate_id_paciente(self, ficha):
        return ficha.idPaciente


class HistoriaClinicaResource(resources.ModelResource):
    id_hoja_clinica = fields.Field(column_name="ID Hoja Clínica")
    archivo = fields.Field(column_name="Archivo")
    fecha_revision = fields.Field(column_name="Fecha de Revisión")
    nota_medica = fields.Field(column_name="Nota Médica")
    tension_arterial = fields.Field(column_name="Tensión Arterial")
    frecuencia_cardiaca = fields.Field(column_name="Frecuencia Cardiaca")
    frecuencia_respiratoria = fields.Field(column_name="Frecuencia Respiratoria")
    temperatura = fields.Field(column_name="Temperatura")
    imc = fields.Field(column_name="IMC")
    saturacion_oxigeno = fields.Field(column_name="Saturación de Oxígeno")
    glucosa = fields.Field(column_name="Glucosa")
    peso = fields.Field(column_name="Peso")
    talla = fields.Field(column_name="Talla")
    cintura = fields.Field(column_name="Cintura")
    id_paciente = fields.Field(column_name="ID Paciente")

    class Meta:
        model = HojaEvaluacionClinica
        fields = (
            "id_hoja_clinica",
            "archivo",
            "fecha_revision",
            "nota_medica",
            "tension_arterial",
            "frecuencia_cardiaca",
            "frecuencia_respiratoria",
            "temperatura",
            "imc",
            "saturacion_oxigeno",
            "glucosa",
            "peso",
            "talla",
            "cintura",
            "id_paciente",
        )
        export_order = fields

    def dehydrate_id_hoja_clinica(self, historia):
        return historia.idHojaClinica

    def dehydrate_archivo(self, historia):
        return historia.archivo

    def dehydrate_fecha_revision(self, historia):
        return historia.fecha_revision

    def dehydrate_nota_medica(self, historia):
        return historia.nota_medica

    def dehydrate_tension_arterial(self, historia):
        return historia.datos_nota_enfermeria.get("tension_arterial", "")

    def dehydrate_frecuencia_cardiaca(self, historia):
        return historia.datos_nota_enfermeria.get("frecuencia_cardiaca", "")

    def dehydrate_frecuencia_respiratoria(self, historia):
        return historia.datos_nota_enfermeria.get("frecuencia_respiratoria", "")

    def dehydrate_temperatura(self, historia):
        return historia.datos_nota_enfermeria.get("temperatura", "")

    def dehydrate_imc(self, historia):
        return historia.datos_nota_enfermeria.get("imc", "")

    def dehydrate_saturacion_oxigeno(self, historia):
        return historia.datos_nota_enfermeria.get("saturacion_oxigeno", "")

    def dehydrate_glucosa(self, historia):
        return historia.datos_nota_enfermeria.get("glucosa", "")

    def dehydrate_peso(self, historia):
        return historia.datos_nota_enfermeria.get("peso", "")

    def dehydrate_talla(self, historia):
        return historia.datos_nota_enfermeria.get("talla", "")

    def dehydrate_cintura(self, historia):
        return historia.datos_nota_enfermeria.get("cintura", "")

    def dehydrate_id_paciente(self, historia):
        return historia.idPaciente


class ExamenMedicoResource(resources.ModelResource):
    id_examen_medico = fields.Field(column_name="ID Examen Médico")
    fecha_revision = fields.Field(column_name="Fecha de Revisión")
    madre_viva = fields.Field(column_name="Madre Viva")
    madre_finada = fields.Field(column_name="Madre Finada")
    padre_vivo = fields.Field(column_name="Padre Vivo")
    padre_finado = fields.Field(column_name="Padre Finado")
    hermano_vivo = fields.Field(column_name="Hermano Vivo")
    hijos_vivos = fields.Field(column_name="Hijos Vivos")
    hijos_finados = fields.Field(column_name="Hijos Finados")
    agudeza_visual = fields.Field(column_name="Agudeza Visual")
    hiper_tension = fields.Field(column_name="Hipertensión")
    diabetes_mellitus = fields.Field(column_name="Diabetes Mellitus")
    obesidad = fields.Field(column_name="Obesidad")
    asma = fields.Field(column_name="Asma")
    epilepsia = fields.Field(column_name="Epilepsia")
    lupus = fields.Field(column_name="Lupus")
    nefropatias = fields.Field(column_name="Nefropatías")
    artropatia = fields.Field(column_name="Artropatía")
    otras_enfermedades = fields.Field(column_name="Otras Enfermedades")
    observaciones_enfermedades = fields.Field(column_name="Observaciones Enfermedades")
    lugar_nacimiento = fields.Field(column_name="Lugar de Nacimiento")
    fecha_nacimiento = fields.Field(column_name="Fecha de Nacimiento")
    escolaridad = fields.Field(column_name="Escolaridad")
    trabajo_actual = fields.Field(column_name="Trabajo Actual")
    practica_ejercicio = fields.Field(column_name="Practica Ejercicio")
    ejercicio_cual = fields.Field(column_name="Ejercicio Cual")
    tabaquismo = fields.Field(column_name="Tabaquismo")
    alcoholismo = fields.Field(column_name="Alcoholismo")
    inmunizaciones = fields.Field(column_name="Inmunizaciones")
    habitos_higienicos = fields.Field(column_name="Hábitos Higiénicos")
    habitos_alimenticios = fields.Field(column_name="Hábitos Alimenticios")
    especifique_habitos = fields.Field(column_name="Especifique Hábitos")
    edad_menarca = fields.Field(column_name="Edad Menarca")
    frecuencia_duracion = fields.Field(column_name="Frecuencia Duración")
    ultima_menstruacion = fields.Field(column_name="Última Menstruación")
    num_embarazos = fields.Field(column_name="Número de Embarazos")
    num_partos = fields.Field(column_name="Número de Partos")
    num_cesareas = fields.Field(column_name="Número de Cesáreas")
    num_abortos = fields.Field(column_name="Número de Abortos")
    ultimo_parto = fields.Field(column_name="Último Parto")
    ultimo_aborto = fields.Field(column_name="Último Aborto")
    planificacion_familiar = fields.Field(column_name="Planificación Familiar")
    traumatismos = fields.Field(column_name="Traumatismos")
    quirurgicos = fields.Field(column_name="Quirúrgicos")
    transfusiones = fields.Field(column_name="Transfusiones")
    grupo_sanguineo = fields.Field(column_name="Grupo Sanguíneo")
    factor_rh = fields.Field(column_name="Factor RH")
    alergias = fields.Field(column_name="Alergias")
    infecciones = fields.Field(column_name="Infecciones")
    dengue_paludismo = fields.Field(column_name="Dengue/Paludismo")
    tatuajes = fields.Field(column_name="Tatuajes")
    tension_arterial = fields.Field(column_name="Tensión Arterial")
    frecuencia_cardiaca = fields.Field(column_name="Frecuencia Cardiaca")
    frecuencia_respiratoria = fields.Field(column_name="Frecuencia Respiratoria")
    oxigenacion = fields.Field(column_name="Oxigenación")
    temperatura = fields.Field(column_name="Temperatura")
    peso_actual = fields.Field(column_name="Peso Actual")
    talla = fields.Field(column_name="Talla")
    imc = fields.Field(column_name="IMC")
    circunferencia_abd = fields.Field(column_name="Circunferencia Abdominal")
    circunferencia_cadera = fields.Field(column_name="Circunferencia de Cadera")
    observaciones_antropometria = fields.Field(
        column_name="Observaciones Antropometría"
    )
    ef_cabeza = fields.Field(column_name="Examen Físico - Cabeza")
    ef_cuello = fields.Field(column_name="Examen Físico - Cuello")
    ef_torax = fields.Field(column_name="Examen Físico - Tórax")
    ef_abdomen = fields.Field(column_name="Examen Físico - Abdomen")
    ef_ext_sup = fields.Field(column_name="Examen Físico - Extremidades Superiores")
    ef_ext_inf = fields.Field(column_name="Examen Físico - Extremidades Inferiores")
    ef_ext_rodillas = fields.Field(column_name="Examen Físico - Rodillas")
    ef_ext_pelvis = fields.Field(column_name="Examen Físico - Pelvis")
    ef_ext_pies = fields.Field(column_name="Examen Físico - Pies")
    biometria_hematica = fields.Field(column_name="Biometría Hemática")
    quimica_sanguinea = fields.Field(column_name="Química Sanguínea")
    vdrl = fields.Field(column_name="VDRL")
    prueba_vih = fields.Field(column_name="Prueba VIH")
    antidoping = fields.Field(column_name="Antidoping")
    examen_orina = fields.Field(column_name="Examen de Orina")
    diagnostico = fields.Field(column_name="Diagnóstico")
    archivo = fields.Field(column_name="Archivo")
    id_paciente = fields.Field(column_name="ID Paciente")

    class Meta:
        model = ExamenMedico
        fields = (
            "id_examen_medico",
            "fecha_revision",
            "madre_viva",
            "madre_finada",
            "padre_vivo",
            "padre_finado",
            "hermano_vivo",
            "hijos_vivos",
            "hijos_finados",
            "agudeza_visual",
            "hiper_tension",
            "diabetes_mellitus",
            "obesidad",
            "asma",
            "epilepsia",
            "lupus",
            "nefropatias",
            "artropatia",
            "otras_enfermedades",
            "observaciones_enfermedades",
            "lugar_nacimiento",
            "fecha_nacimiento",
            "escolaridad",
            "trabajo_actual",
            "practica_ejercicio",
            "ejercicio_cual",
            "tabaquismo",
            "alcoholismo",
            "inmunizaciones",
            "habitos_higienicos",
            "habitos_alimenticios",
            "especifique_habitos",
            "edad_menarca",
            "frecuencia_duracion",
            "ultima_menstruacion",
            "num_embarazos",
            "num_partos",
            "num_cesareas",
            "num_abortos",
            "ultimo_parto",
            "ultimo_aborto",
            "planificacion_familiar",
            "traumatismos",
            "quirurgicos",
            "transfusiones",
            "grupo_sanguineo",
            "factor_rh",
            "alergias",
            "infecciones",
            "dengue_paludismo",
            "tatuajes",
            "tension_arterial",
            "frecuencia_cardiaca",
            "frecuencia_respiratoria",
            "oxigenacion",
            "temperatura",
            "peso_actual",
            "talla",
            "imc",
            "circunferencia_abd",
            "circunferencia_cadera",
            "observaciones_antropometria",
            "ef_cabeza",
            "ef_cuello",
            "ef_torax",
            "ef_abdomen",
            "ef_ext_sup",
            "ef_ext_inf",
            "ef_ext_rodillas",
            "ef_ext_pelvis",
            "ef_ext_pies",
            "biometria_hematica",
            "quimica_sanguinea",
            "vdrl",
            "prueba_vih",
            "antidoping",
            "examen_orina",
            "diagnostico",
            "archivo",
            "id_paciente",
        )
        export_order = fields

    def dehydrate_id_examen_medico(self, examen):
        return examen.idExamenMedico

    def dehydrate_fecha_revision(self, examen):
        return examen.fecha_revision

    def dehydrate_madre_viva(self, examen):
        return examen.antecedentes_heredofamiliares.get("madre_viva", "")

    def dehydrate_madre_finada(self, examen):
        return examen.antecedentes_heredofamiliares.get("madre_finada", "")

    def dehydrate_padre_vivo(self, examen):
        return examen.antecedentes_heredofamiliares.get("padre_vivo", "")

    def dehydrate_padre_finado(self, examen):
        return examen.antecedentes_heredofamiliares.get("padre_finado", "")

    def dehydrate_hermano_vivo(self, examen):
        return examen.antecedentes_heredofamiliares.get("hermano_vivo", "")

    def dehydrate_hijos_vivos(self, examen):
        return examen.antecedentes_heredofamiliares.get("hijos_vivos", "")

    def dehydrate_hijos_finados(self, examen):
        return examen.antecedentes_heredofamiliares.get("hijos_finados", "")

    def dehydrate_agudeza_visual(self, examen):
        return examen.datos_enfermedades.get("agudeza_visual", "")

    def dehydrate_hiper_tension(self, examen):
        return examen.datos_enfermedades.get("hiper_tension", "")

    def dehydrate_diabetes_mellitus(self, examen):
        return examen.datos_enfermedades.get("diabetes_mellitus", "")

    def dehydrate_obesidad(self, examen):
        return examen.datos_enfermedades.get("obesidad", "")

    def dehydrate_asma(self, examen):
        return examen.datos_enfermedades.get("asma", "")

    def dehydrate_epilepsia(self, examen):
        return examen.datos_enfermedades.get("epilepsia", "")

    def dehydrate_lupus(self, examen):
        return examen.datos_enfermedades.get("lupus", "")

    def dehydrate_nefropatias(self, examen):
        return examen.datos_enfermedades.get("nefropatias", "")

    def dehydrate_artropatia(self, examen):
        return examen.datos_enfermedades.get("artropatia", "")

    def dehydrate_otras_enfermedades(self, examen):
        return examen.datos_enfermedades.get("otras_enfermedades", "")

    def dehydrate_observaciones_enfermedades(self, examen):
        return examen.datos_enfermedades.get("observaciones_enfermedades", "")

    def dehydrate_lugar_nacimiento(self, examen):
        return examen.antecedentes_no_patologicos.get("lugar_nacimiento", "")

    def dehydrate_fecha_nacimiento(self, examen):
        return examen.antecedentes_no_patologicos.get("fecha_nacimiento", "")

    def dehydrate_escolaridad(self, examen):
        return examen.antecedentes_no_patologicos.get("escolaridad", "")

    def dehydrate_trabajo_actual(self, examen):
        return examen.antecedentes_no_patologicos.get("trabajo_actual", "")

    def dehydrate_practica_ejercicio(self, examen):
        return examen.antecedentes_no_patologicos.get("practica_ejercicio", "")

    def dehydrate_ejercicio_cual(self, examen):
        return examen.antecedentes_no_patologicos.get("ejercicio_cual", "")

    def dehydrate_tabaquismo(self, examen):
        return examen.antecedentes_no_patologicos.get("tabaquismo", "")

    def dehydrate_alcoholismo(self, examen):
        return examen.antecedentes_no_patologicos.get("alcoholismo", "")

    def dehydrate_inmunizaciones(self, examen):
        return examen.antecedentes_no_patologicos.get("inmunizaciones", "")

    def dehydrate_habitos_higienicos(self, examen):
        return examen.antecedentes_no_patologicos.get("habitos_higienicos", "")

    def dehydrate_habitos_alimenticios(self, examen):
        return examen.antecedentes_no_patologicos.get("habitos_alimenticios", "")

    def dehydrate_especifique_habitos(self, examen):
        return examen.antecedentes_no_patologicos.get("especifique_habitos", "")

    def dehydrate_edad_menarca(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("edad_menarca", "")

    def dehydrate_frecuencia_duracion(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("frecuencia_duracion", "")

    def dehydrate_ultima_menstruacion(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("ultima_menstruacion", "")

    def dehydrate_num_embarazos(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("num_embarazos", "")

    def dehydrate_num_partos(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("num_partos", "")

    def dehydrate_num_cesareas(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("num_cesareas", "")

    def dehydrate_num_abortos(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("num_abortos", "")

    def dehydrate_ultimo_parto(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("ultimo_parto", "")

    def dehydrate_ultimo_aborto(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("ultimo_aborto", "")

    def dehydrate_planificacion_familiar(self, examen):
        return examen.antecedentes_gineco_obstreticos.get("planificacion_familiar", "")

    def dehydrate_traumatismos(self, examen):
        return examen.antecedentes_personales_patologicos.get("traumatismos", "")

    def dehydrate_quirurgicos(self, examen):
        return examen.antecedentes_personales_patologicos.get("quirurgicos", "")

    def dehydrate_transfusiones(self, examen):
        return examen.antecedentes_personales_patologicos.get("transfusiones", "")

    def dehydrate_grupo_sanguineo(self, examen):
        return examen.antecedentes_personales_patologicos.get("grupo_sanguineo", "")

    def dehydrate_factor_rh(self, examen):
        return examen.antecedentes_personales_patologicos.get("factor_rh", "")

    def dehydrate_alergias(self, examen):
        return examen.antecedentes_personales_patologicos.get("alergias", "")

    def dehydrate_infecciones(self, examen):
        return examen.antecedentes_personales_patologicos.get("infecciones", "")

    def dehydrate_dengue_paludismo(self, examen):
        return examen.antecedentes_personales_patologicos.get("dengue_paludismo", "")

    def dehydrate_tatuajes(self, examen):
        return examen.antecedentes_personales_patologicos.get("tatuajes", "")

    def dehydrate_tension_arterial(self, examen):
        return examen.datos_exploracion_fisica.get("tension_arterial", "")

    def dehydrate_frecuencia_cardiaca(self, examen):
        return examen.datos_exploracion_fisica.get("frecuencia_cardiaca", "")

    def dehydrate_frecuencia_respiratoria(self, examen):
        return examen.datos_exploracion_fisica.get("frecuencia_respiratoria", "")

    def dehydrate_oxigenacion(self, examen):
        return examen.datos_exploracion_fisica.get("oxigenacion", "")

    def dehydrate_temperatura(self, examen):
        return examen.datos_exploracion_fisica.get("temperatura", "")

    def dehydrate_peso_actual(self, examen):
        return examen.datos_antropometria.get("peso_actual", "")

    def dehydrate_talla(self, examen):
        return examen.datos_antropometria.get("talla", "")

    def dehydrate_imc(self, examen):
        return examen.datos_antropometria.get("imc", "")

    def dehydrate_circunferencia_abd(self, examen):
        return examen.datos_antropometria.get("circunferencia_abd", "")

    def dehydrate_circunferencia_cadera(self, examen):
        return examen.datos_antropometria.get("circunferencia_cadera", "")

    def dehydrate_observaciones_antropometria(self, examen):
        return examen.datos_antropometria.get("observaciones_antropometria", "")

    def dehydrate_ef_cabeza(self, examen):
        return examen.datos_examen_medico.get("EF_cabeza", "")

    def dehydrate_ef_cuello(self, examen):
        return examen.datos_examen_medico.get("EF_cuello", "")

    def dehydrate_ef_torax(self, examen):
        return examen.datos_examen_medico.get("EF_torax", "")

    def dehydrate_ef_abdomen(self, examen):
        return examen.datos_examen_medico.get("EF_abdomen", "")

    def dehydrate_ef_ext_sup(self, examen):
        return examen.datos_examen_medico.get("EF_EXT_sup", "")

    def dehydrate_ef_ext_inf(self, examen):
        return examen.datos_examen_medico.get("EF_EXT_inf", "")

    def dehydrate_ef_ext_rodillas(self, examen):
        return examen.datos_examen_medico.get("EF_EXT_rodillas", "")

    def dehydrate_ef_ext_pelvis(self, examen):
        return examen.datos_examen_medico.get("EF_EXT_pelvis", "")

    def dehydrate_ef_ext_pies(self, examen):
        return examen.datos_examen_medico.get("EF_EXT_pies", "")

    def dehydrate_biometria_hematica(self, examen):
        return examen.datos_examenes_laboratorio.get("biometria_hematica", "")

    def dehydrate_quimica_sanguinea(self, examen):
        return examen.datos_examenes_laboratorio.get("quimica_sanguinea", "")

    def dehydrate_vdrl(self, examen):
        return examen.datos_examenes_laboratorio.get("vdrl", "")

    def dehydrate_prueba_vih(self, examen):
        return examen.datos_examenes_laboratorio.get("prueba_vih", "")

    def dehydrate_antidoping(self, examen):
        return examen.datos_examenes_laboratorio.get("antidoping", "")

    def dehydrate_examen_orina(self, examen):
        return examen.datos_examenes_laboratorio.get("examen_orina", "")

    def dehydrate_diagnostico(self, examen):
        return examen.datos_examenes_laboratorio.get("diagnostico", "")

    def dehydrate_archivo(self, examen):
        return examen.archivo

    def dehydrate_id_paciente(self, examen):
        return examen.idPaciente
