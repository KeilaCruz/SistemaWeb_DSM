import { useEffect, useState } from "react"

export function FormVisualizarNiño({ ficha }) {
    const [tomaMedicamento, setTomaMedicamento] = useState(false)
    const [medicamentoEmbarazo, setMedicamentoEmbarazo] = useState(false)
    const [alimentacionSeno, setAlimentoSeno] = useState(false)
    const [controlEsfinger, setControlEsfinger] = useState(false)

    const textoTomaMedicamento = tomaMedicamento ? 'Si' : 'No'
    const textoMedicamentoEmbarazo = medicamentoEmbarazo ? 'Si' : 'No'
    const textoAlimentacionSeno = alimentacionSeno ? 'Si' : 'No'
    const textoControlEsfinger = controlEsfinger ? 'Si' : 'No'

    useEffect(() => {
        async function loadInput() {
            setTomaMedicamento(ficha[0].antecedentes_padecimiento.toma_medicamento)
            setMedicamentoEmbarazo(ficha[0].antecedentes_desarrollo.medicamentos_embarazo)
            setAlimentoSeno(ficha[0].antecedentes_desarrollo.alimentacion_seno_materno)
            setControlEsfinger(ficha[0].antecedentes_desarrollo.controla_esfinter)
        }
        loadInput()
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row g-3">
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">FICHA DE IDENTIFICACIÓN PARA NIÑOS</h3>
                        <hr />
                    </div>
                </div>
                {ficha.map(ficha => (
                    <div>
                        <div>
                            <label htmlFor="codigo_expediente" className="form-label label-form">Expediente</label>
                            <input id="codigo_expediente" className="form-control input-form" type="text" value={ficha.expedienteFicha} disabled={true} />
                        </div>
                        <div>
                            <label htmlFor="fecha_registro" className="form-label label-form">Fecha de registro</label>
                            <input id="fecha_registro" className="form-control input-form" type="date" value={ficha.fecha_registro} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="años_edad" className="form-label label-form">Años de edad</label>
                            <input id="años_edad" className="form-control input-form" type="number" value={ficha.datos_generales.anios} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="meses_edad" className="form-label label-form">Meses de edad</label>
                            <input id="meses_edad" className="form-control input-form" type="number" value={ficha.datos_generales.meses} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="fecha_nacimiento" className="form-label label-form">Fecha de nacimiento</label>
                            <input id="fecha_nacimiento" className="form-control input-form" type="date" value={ficha.datos_generales.fecha_nacimiento} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="lugar_nacimiento" className="form-label label-form">Lugar de nacimiento</label>
                            <input id="lugar_nacimiento" className="form-control input-form" type="text" value={ficha.datos_generales.lugar_nacimiento} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="grado_escolar" className="form-label label-form">Grado escolar</label>
                            <input id="grado_escolar" className="form-control input-form" type="number" value={ficha.datos_generales.grado_escolar} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="nom_escuela" className="form-label label-form">Nombre de la escuela</label>
                            <input id="nom_escuela" className="form-control input-form" type="text" value={ficha.datos_generales.nombre_escuela} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="ubicacion_escuela" className="form-label label-form">Ubicación de la escuela</label>
                            <input id="ubicacion_escuela" className="form-control input-form" type="text" value={ficha.datos_generales.ubicacion_escuela} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="lugar_ocupa_familia" className="form-label label-form">Lugar que ocupa el niño en la familia</label>
                            <input id="lugar_ocupa_familia" className="form-control input-form" type="text" value={ficha.datos_generales.lugar_ocupa_familia} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="info_hermanos" className="form-label label-form">Informacion de los hermanos</label>
                            <textarea id="info_hermanos" className="form-control input-form" value={ficha.datos_generales.informacion_hermanos} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="nom_padre" className="form-label label-form">Nombre del padre</label>
                            <input id="nom_padre" className="form-control input-form" type="text" value={ficha.datos_generales.nombre_padre} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="edad_padre" className="form-label label-form">Edad</label>
                            <input id="edad_padre" className="form-control input-form" type="number" value={ficha.datos_generales.edad_padre} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="escolaridad_padre" className="form-label label-form">Escolaridad</label>
                            <select id="escolaridad-padre" className="form-control input-form" value={ficha.datos_generales.escolaridad_padre} disabled={true}>
                                <option value="Primaria">Primaria</option>
                                <option value="Secundaria">Secundaria</option>
                                <option value="Bachillerato">Bachillerato</option>
                                <option value="Bachillerato">Licenciatura</option>
                            </select>
                        </div>
                        <div >
                            <label htmlFor="ocupacion_padre" className="form-label label-form">Ocupación</label>
                            <input id="ocupacion_padre" className="form-control input-form" type="text" value={ficha.datos_generales.ocupacion_padre} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="nom_madre" className="form-label label-form">Nombre de la madre</label>
                            <input id="nom_madre" className="form-control input-form" type="text" value={ficha.datos_generales.nombre_madre} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="edad_madre" className="form-label label-form">Edad</label>
                            <input id="edad_madre" className="form-control input-form" type="number" value={ficha.datos_generales.edad_madre} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="escolaridad_madre" className="form-label label-form">Escolaridad</label>
                            <select className="form-control input-form" id="escolaridad-madre" value={ficha.datos_generales.escolaridad_madre}>
                                <option value="Primaria">Primaria</option>
                                <option value="Secundaria">Secundaria</option>
                                <option value="Bachillerato">Bachillerato</option>
                                <option value="Bachillerato">Licenciatura</option>
                            </select>
                        </div>
                        <div >
                            <label htmlFor="ocupacion_madre" className="form-label label-form">Ocupacion</label>
                            <input id="ocupacion_madre" className="form-control input-form" type="text" value={ficha.datos_generales.ocupacion_madre} disabled={true} />
                        </div>
                        <div>
                            <select>
                                <label htmlFor="estado_padres" className="form-label label-form">Estado civil de los padres</label>
                                <select className="form-select input-form" id="estado-padres" value={ficha.datos_generales.estado_civil_padres} disabled={true} />
                                <option value="Primaria">Casados</option>
                                <option value="Primaria">Divorciados</option>
                            </select>
                        </div >
                        <div >
                            <label htmlFor="años_casados" className="form-label label-form">Años</label>
                            <input id="años_casados" className="form-control input-form" type="number" value={ficha.datos_generales.anios_estado_civil} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="no_conocer_padres" className="form-label label-form">En el caso que el niño no viva con los padres</label>
                        </div>
                        <div >
                            <label htmlFor="edad_tutor" className="form-label label-form">Nombre o nombres</label>
                            <input id="nom_tutor" className="form-control input-form" type="text" value={ficha.datos_generales.nombre_tutor} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="edad_tutor" className="form-label label-form">Edad</label>
                            <input id="edad_tutor" className="form-control input-form" type="number" value={ficha.datos_generales.edad_tutor} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="ocupacion_tutor" className="form-label label-form">Ocupación</label>
                            <input id="ocupacuion" className="form-control input-form" type="text" value={ficha.datos_generales.ocupacion_tutor} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="motivos_niño_acargo" className="form-label label-form">Motivos por los cuales el niño está a su cargo</label>
                            <input id="motivos_niño_acargo" className="form-control input-form" type="text" value={ficha.datos_generales.motivos_nino_cargo_tutor} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="desde_cuando_acargo" className="form-label label-form">Desde cuándo</label>
                            <input id="desde_cuando_acargo" className="form-control input-form" type="text" value={ficha.datos_generales.desde_cuando_tutor} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="info_vive_niño" className="form-label label-form">Información con los que vive el niño</label>
                            <textarea id="info_vive_niño" className="form-control input-form" value={ficha.datos_generales.descripcion_viven_con_nino} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="motivo_consulta" className="form-label label-form">Motivo de consulta reportado por los padres</label>
                            <textarea id="motivos_consulta" className="form-control input-form" value={ficha.datos_generales.motivo} disabled={true} />
                        </div >
                        <div >
                            <label htmlFor="canalizado_por" className="form-label label-form">Canalizador por quién</label>
                            <input id="canalizado_por" className="form-control input-form" type="text" value={ficha.datos_generales.canalizado_por} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="antecedentes_padecimiento_actual" className="form-label label-section">ANTECEDENTES RESPECTO AL PADECIMIENTO ACTUAL</label>
                        </div>
                        <div >
                            <label htmlFor="asistencia_anterior" className="form-label label-form">Asistencia con otro profesional</label>
                            <input id="asistencia_consulta" className="form-control input-form" type="text" value={ficha.antecedentes_padecimiento.consulta_otro_profesional} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="diagnostico_medico" className="form-label label-form">Diagnóstico</label>
                            <textarea id="diagnostico_otorgado" className="form-control input-form" value={ficha.antecedentes_padecimiento.diagnostico_otorgado} disabled={true} />
                        </div>
                        <div >
                            <label className="form-label label-form">El niño actualmente toma algún medicamento</label>
                            <input type="text" id="toma_medicamento" value={textoTomaMedicamento} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="motivo_medicamento" className="form-label label-form">Motivo</label>
                            <input id="motivo_medicamento" className="form-control input-form" type="text" value={ficha.antecedentes_padecimiento.motivo_medicamento} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="nom_medicamento" className="form-label label-form">Nombre</label>
                            <input input="nom_medicamento" className="form-control input-form" type="text" value={ficha.antecedentes_padecimiento.nombre_medicamento} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="dosis_medicamento" className="form-label label-form">Dosis</label>
                            <input className="form-control input-form" id="dosis_medicamento" type="text" value={ficha.antecedentes_padecimiento.dosis_medicamento} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="otro_estudio" className="form-label label-form">Algún otro estudio</label>
                            <input id="otro_estudio" className="form-control input-form" type="text" value={ficha.antecedentes_padecimiento.realizado_estudio} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="antecedentes_desarrollo" className="form-label label-section">ANTECEDENTES DEL DESARROLLO</label>
                        </div>
                        <div >
                            <label htmlFor="num_embarazos" className="form-label label-form">Número de embarazos de la madre</label>
                            <input id="numero_embarazos_madre" className="form-control input-form" type="number" value={ficha.antecedentes_desarrollo.numero_embarazos_madre} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="tiempo_gestacion" className="form-label label-form">Tiempo gestación del niño</label>
                            <input className="form-control input-form" type="number" id="tiempo_gestacion" value={ficha.antecedentes_desarrollo.tiempo_gestacion} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="complicaciones_embarazo" className="form-label label-form">Problemas, enfermedades o complicaciones durante el embarazo</label>
                            <textarea className="form-control input-form" value={ficha.antecedentes_desarrollo.problemas_durante_embarazo} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="medicamentos_embarazo" className="form-label label-form">Ingirió medicamentos durante el embarazo</label>
                            <input type="text" id="medicamentos_embarazo" value={textoMedicamentoEmbarazo} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="motivo_medicamento_embarazo" className="form-label label-form">Motivo</label>
                            <input className="form-control input-form" id="motivo_medicamento" type="text" value={ficha.antecedentes_desarrollo.motivo_medicamento_embarazo} disabled={true} />
                        </div>

                        <div >
                            <label htmlFor="nom_medicamento_embarazo" className="form-label label-form">Nombre</label>
                            <input id="nom_medicamento_embarazo" className="form-control input-form" type="text" value={ficha.antecedentes_desarrollo.nombre_medicamento_embarazo} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="dosis_medicamento_embarazo" className="form-label label-form">Dosis</label>
                            <input id="dosis_medicamento_embarazo" className="form-control input-form" type="text" value={ficha.antecedentes_desarrollo.dosis_medicamento_embarazo} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="tipo_parto" className="form-label label-form">Tipo de parto</label>
                            <input type="text" placeholder="Tipo de parto" className="form-control input-form" value={ficha.antecedentes_desarrollo.tipo_parto} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="duracion_parto" className="form-label label-form">Duración</label>
                            <input id="duracion_parto" className="form-control input-form" type="text" value={ficha.antecedentes_desarrollo.duracion_parto} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="complicaciones_parto" className="form-label label-form">Complicaciones en el parto</label>
                            <input id="complicaciones_parto" className="form-control input-form" type="text" value={ficha.antecedentes_desarrollo.complicaciones_parto} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="peso_nacer" className="form-label label-form">Peso al nacer</label>
                            <input id="peso_nacer" className="form-control input-form" type="number" step="any" value={ficha.antecedentes_desarrollo.peso_nacer} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="talla_nacer" className="form-label label-form">Talla</label>
                            <input className="form-control input-form" type="number" step="any" value={ficha.antecedentes_desarrollo.talla_nacer} disabled={true} />
                        </div>
                        <div>
                            <input type="text" id="alimentacion_seno_materno" value={textoAlimentacionSeno} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="tiempo_alimentacion_seno" className="form-label label-form">Tiempo de alimentación por seno</label>
                            <input className="form-control input-form" id="tiempo_alimentacion_seno" type="text" value={ficha.antecedentes_desarrollo.tiempo_alimentacion_seno} disabled={true} />
                        </div>

                        <div >
                            <label htmlFor="edad_sosten_cefalico" className="form-label label-form">Edad a la que logo sostén cefálico</label>
                            <input id="edad_sosten_cefalico" className="form-control input-form" type="number" value={ficha.antecedentes_desarrollo.edad_sosten_cefalico} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="edad_aparicion_balbuceo" className="form-label label-form">Edad de aparicion del balbuceo</label>
                            <input id="edad_balbuceo" className="form-control input-form" type="number" value={ficha.antecedentes_desarrollo.edad_balbuceo} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="edad_logro_sentarse" className="form-label label-form">Edad a la que logró sentarse</label>
                            <input id="edad_logro_sentarse" className="form-control input-form" type="number" value={ficha.antecedentes_desarrollo.edad_sentarse} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="edad_logro_ponerse_pie" className="form-label label-form">Edad a la que logró ponerse de pie</label>
                            <input type="number" className="form-control input-form" id="edad_logro_ponerse_pie" value={ficha.antecedentes_desarrollo.edad_ponerse_pie} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="edad_camino" className="form-label label-form">Edad a la que caminó sin ayuda</label>
                            <input id="edad_camino" className="form-control input-form" type="number" value={ficha.antecedentes_desarrollo.edad_camino} disabled={true} />
                        </div>
                        <div >
                            <label className="form-label label-form">Controla actualmente esfinter</label>
                            <input type="text" id="control_esfinger" value={textoControlEsfinger} disabled={true}/>
                        </div>
                        <div >
                            <label htmlFor="edad_control_esfinter" className="form-label label-form">Edad de control</label>
                            <input className="form-control input-form" id="edad_control_esfinter" type="number" value={ficha.antecedentes_desarrollo.edad_control_esfinter} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="enfermedad_primer_año" className="form-label label-form">Enfermedades significativas durante el primer año de vida</label>
                            <textarea id="enfermedad_primer_año" className="form-control input-form" value={ficha.antecedentes_desarrollo.enfermedades_primer_año_vida} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="enfermedades_posteriores" className="form-label label-form">Enfermedades posteriores</label>
                            <textarea className="form-control input-form" id="enfermedades_posteriores" value={ficha.antecedentes_desarrollo.enfermedades_posteriores} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="antecedentes_padecimiento" className="form-label label-form">Antecedentes familiares hereditarios vinculados al padecimiento actual</label>
                            <input id="antecedentes_padecimiento" className="form-control input-form" type="text" value={ficha.antecedentes_desarrollo.antecedentes_padecimiento_actual} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="salud_fisica_actual" className="form-label label-form">Salud física Actual</label>
                            <textarea id="salud_fisica_actual" className="form-control input-form" value={ficha.antecedentes_desarrollo.salud_fisica_actual} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="area_escolar" className="form-label label-section">ÁREA ESCOLAR</label>
                        </div>
                        <div >
                            <label htmlFor="edad_ingreso_sistema" className="form-label label-form">Edad de ingreso al sistema escolar</label>
                            <input id="edad_ingreso_escolar" className="form-control input-form" type="number" value={ficha.datos_escolares.edad_ingreso_escolar} disabled={true} />
                        </div>
                        <div >
                            <label htmlFor="nivel_ingreso" className="form-label label-form">Nivel</label>
                            <input id="nivel_ingreso" className="form-control input-form" type="text" value={ficha.datos_escolares.nivel_ingreso} disabled={true} />
                        </div>
                        <div className="col-md-9 offset-md-1">
                            <label htmlFor="conducta_niño" className="form-label label-form"> Conducta del niño al ingresar a la escuela de acuerdo a padres y maestros</label>
                            <input id="conducta_niño" className="form-control input-form" type="text" value={ficha.datos_escolares.conducta_ingreso} disabled={true} />
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

