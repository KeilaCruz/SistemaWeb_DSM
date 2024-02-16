import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization";
import { searchPaciente } from "../../services/Recepcionista";
import { PacienteCard } from "../Paciente/PacienteCard";

export function FormFichaPsicoNiño({ onSubmit, register, pacienteSelect }) {
    const { authTokens } = useContext(AuthContext);
    const [criterio, setCriterio] = useState("")
    const [paciente, setPaciente] = useState([])
    const handleBarraBusqueda = (evt) => {
        setCriterio(evt.target.value)
    }
    const handleBuscarPaciente = async () => {
        try {
            await setToken(authTokens.access);
            const response = await searchPaciente(criterio)
            setPaciente(response)
        } catch (error) {
            console.error(error)
        }
    }
    const selectPaciente = (CURP) => {
        pacienteSelect(CURP)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row g-3 mt-5">
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">FICHA DE IDENTIFICACIÓN PARA NIÑOS</h3>
                        <hr />
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-6 offset-1">
                                <input className="form-control input-form" id="barra_busqueda" type="text" placeholder="Buscar por CURP o nombre" onChange={handleBarraBusqueda} />
                            </div>
                            <div className="col-md-3 mt-1">
                                <button onClick={handleBuscarPaciente} className="button-buscar">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 offset-md-1 mt-2">
                    <label htmlFor="datos_generales" className="form-label label-section">DATOS GENERALES</label>
                </div>
                <div className="col-md-9 offset-1">
                    {paciente.map(paciente => (
                        <PacienteCard paciente={paciente} key={paciente.CURP} handleSelect={selectPaciente} />
                    ))}
                </div>
                <form onSubmit={onSubmit} className="row g-3 mt-2">
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="codigo_expediente" className="form-label label-form">Expediente</label>
                        <input id="codigo_expediente" className="form-control input-form" type="text" placeholder="Número de expediente" {...register("expedienteFicha", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="años_edad" className="form-label label-form">Años de edad</label>
                        <input id="años_edad" className="form-control input-form" type="number" placeholder="Años" {...register("años", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="meses_edad" className="form-label label-form">Meses de edad</label>
                        <input id="meses_edad" className="form-control input-form" type="number" placeholder="Meses"{...register("meses", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="fecha_nacimiento" className="form-label label-form">Fecha de nacimiento</label>
                        <input id="fecha_nacimiento" className="form-control input-form" type="date" placeholder="Fecha de nacimiento" {...register("fecha_nacimiento", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="lugar_nacimiento" className="form-label label-form">Lugar de nacimiento</label>
                        <input id="lugar_nacimiento" className="form-control input-form" type="text" placeholder="Lugar de nacimiento" {...register("lugar_nacimiento", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="grado_escolar" className="form-label label-form">Grado escolar</label>
                        <input id="grado_escolar" className="form-control input-form" type="number" placeholder="Grado escolar" {...register("grado_escolar", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nom_escuela" className="form-label label-form">Nombre de la escuela</label>
                        <input id="nom_escuela" className="form-control input-form" type="text" placeholder="Nombre de la escuela" {...register("nombre_escuela", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="ubicacion_escuela" className="form-label label-form">Ubicación de la escuela</label>
                        <input id="ubicacion_escuela" className="form-control input-form" type="text" placeholder="Ubicación de la escuela" {...register("ubicacion_escuela", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="lugar_ocupa_familia" className="form-label label-form">Lugar que ocupa el niño en la familia</label>
                        <input id="lugar_ocupa_familia" className="form-control input-form" type="text" placeholder="Lugar ocupa el niño en la familia" {...register("lugar_ocupa_familia", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="info_hermanos" className="form-label label-form">Informacion de los hermanos</label>
                        <textarea id="info_hermanos" className="form-control input-form" placeholder="Nombres, edades y ocupaciones de los hermanos(orden descendente)"{...register("informacion_hermanos", { required: true })}></textarea>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nom_padre" className="form-label label-form">Nombre del padre</label>
                        <input id="nom_padre" className="form-control input-form" type="text" placeholder="Nombre del padre" {...register("nombre_padre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_padre" className="form-label label-form">Edad</label>
                        <input id="edad_padre" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_padre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="escolaridad_padre" className="form-label label-form">Escolaridad</label>
                        <select id="escolaridad-padre" className="form-control input-form" {...register("escolaridad_padre", { required: true })}>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Bachillerato">Bachillerato</option>
                            <option value="Bachillerato">Licenciatura</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="ocupacion_padre" className="form-label label-form">Ocupación</label>
                        <input id="ocupacion_padre" className="form-control input-form" type="text" placeholder="Ocupación" {...register("ocupacion_padre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nom_madre" className="form-label label-form">Nombre de la madre</label>
                        <input id="nom_madre" className="form-control input-form" type="text" placeholder="Nombre" {...register("nombre_madre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_madre" className="form-label label-form">Edad</label>
                        <input id="edad_madre" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_madre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="escolaridad_madre" className="form-label label-form">Escolaridad</label>
                        <select className="form-control input-form" id="escolaridad-madre" {...register("escolaridad_madre", { required: true })}>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Bachillerato">Bachillerato</option>
                            <option value="Bachillerato">Licenciatura</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="ocupacion_madre" className="form-label label-form">Ocupacion</label>
                        <input id="ocupacion_madre" className="form-control input-form" type="text" placeholder="Ocupación" {...register("ocupacion_madre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="estado_padres" className="form-label label-form">Estado civil de los padres</label>
                        <select className="form-control input-form" id="estado-padres" {...register("estado_civil_padres", { required: true })}>
                            <option value="Primaria">Casados</option>
                            <option value="Primaria">Divorciados</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="años_casados" className="form-label label-form">Años</label>
                        <input id="años_casados" className="form-control input-form" type="number" placeholder="Años" {...register("años_estado_civil", { required: true })} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="no_conocer_padres" className="form-label label-form">En el caso que el niño no viva con los padres</label>
                    </div>
                    <div className="row g-2">
                        <div className="col-md-4 offset-md-1">
                            <label htmlFor="edad_tutor" className="form-label label-form">Nombre o nombres</label>
                            <input id="nom_tutor" className="form-control input-form" type="text" placeholder="Nombre del tutor o tutores del niño" {...register("nombre_tutor")} />
                        </div>
                        <div className="col-md-4 offset-md-1">
                            <label htmlFor="edad_tutor" className="form-label label-form">Edad</label>
                            <input id="edad_tutor" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_tutor")} />
                        </div>
                        <div className="col-md-4 offset-md-1">
                            <label htmlFor="ocupacion_tutor" className="form-label label-form">Ocupación</label>
                            <input id="ocupacuion" className="form-control input-form" type="text" placeholder="Ocupacion" {...register("ocupacion_tutor")} />
                        </div>
                        <div className="col-md-4 offset-md-1">
                            <label htmlFor="motivos_niño_acargo" className="form-label label-form">Motivos por los cuales el niño está a su cargo</label>
                            <input id="motivos_niño_acargo" className="form-control input-form" type="text" placeholder="Motivos" {...register("motivos_niño_cargo_tutor")} />
                        </div>
                        <div className="col-md-4 offset-md-1">
                            <label htmlFor="desde_cuando_acargo" className="form-label label-form">Desde cuándo</label>
                            <input id="desde_cuando_acargo" className="form-control input-form" type="text" placeholder="Desde cuándo" {...register("desde_cuando_tutor")} />
                        </div>
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="info_vive_niño" className="form-label label-form">Información con los que vive el niño</label>
                        <textarea id="info_vive_niño" className="form-control input-form" placeholder="Personas que viven casa con el niño, nombre, edad, parentesco y ocupación de cada uno (no padres ni hermanos)" {...register("descripcion_viven_con_niño")}></textarea>
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="motivo_consulta" className="form-label label-form">Motivo de consulta reportado por los padres</label>
                        <textarea id="motivos_consulta" className="form-control input-form" placeholder="Motivo" {...register("motivo", { required: true })}></textarea>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="canalizado_por" className="form-label label-form">Canalizador por quién</label>
                        <input id="canalizado_por" className="form-control input-form" type="text" placeholder="Canalizado por" {...register("canalizado_por", { required: true })} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="antecedentes_padecimiento_actual" className="form-label label-section">ANTECEDENTES RESPECTO AL PADECIMIENTO ACTUAL</label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="asistencia_anterior" className="form-label label-form">Asistencia con otro profesional</label>
                        <input id="asistencia_consulta" className="form-control input-form" type="text" placeholder="Asistencia a consulta médica o con otro profesional" {...register("consulta_otro_profesional")} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="diagnostico_medico" className="form-label label-form">Diagnóstico</label>
                        <textarea id="diagnostico_otorgado" className="form-control input-form" placeholder="Diagnóstico otorgado" {...register("diagnostico_otorgado")}></textarea>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">El niño actualmente toma algún medicamento</label>
                        <label className="form-check-label mx-2">Si
                            <input className="form-check-input" type="radio" id="medicacion-si" name="option-medicacion" value={true} {...register("toma_medicamento", { required: true })} />
                        </label>
                        <label className="form-check-label mx-2">No
                            <input className="form-check-input" type="radio" id="medicacion-no" name="option-medicacion" value={false} {...register("toma_medicamento", { required: true })} />
                        </label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="motivo_medicamento" className="form-label label-form">Motivo</label>
                        <input id="motivo_medicamento" className="form-control input-form" type="text" placeholder="Motivo" {...register("motivo_medicamento")} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nom_medicamento" className="form-label label-form">Nombre</label>
                        <input input="nom_medicamento" className="form-control input-form" type="text" placeholder="Nombre del medicamento" {...register("nombre_medicamento")} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="dosis_medicamento" className="form-label label-form">Dosis</label>
                        <input className="form-control input-form" id="dosis_medicamento" type="text" placeholder="Dosis del medicamento" {...register("dosis_medicamento")} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="otro_estudio" className="form-label label-form">Algún otro estudio</label>
                        <input id="otro_estudio" className="form-control input-form" type="text" placeholder="Se le ha realizado algún otro tipo de estudio (señarlo)" {...register("realizado_estudio")} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="antecedentes_desarrollo" className="form-label label-section">ANTECEDENTES DEL DESARROLLO</label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="num_embarazos" className="form-label label-form">Número de embarazos de la madre</label>
                        <input id="numero_embarazos_madre" className="form-control input-form" type="number" placeholder="Número" {...register("numero_embarazos_madre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="tiempo_gestacion" className="form-label label-form">Tiempo gestación del niño</label>
                        <input className="form-control input-form" type="number" id="tiempo_gestacion" placeholder="Tiempo" {...register("tiempo_gestacion", { required: true })} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="complicaciones_embarazo" className="form-label label-form">Problemas, enfermedades o complicaciones durante el embarazo</label>
                        <textarea className="form-control input-form" placeholder="Descripción" {...register("problemas_durante_embarazo")}></textarea>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="medicamentos_embarazo" className="form-label label-form">Ingirió medicamentos durante el embarazo</label>
                        <label className="form-check-label mx-2">Si
                            <input className="form-check-input" type="radio" id="medi-embarazo-si" name="option-embarazo" value={true} {...register("medicamentos_embarazo", { required: true })} />
                        </label>
                        <label className="form-check-label mx-2">No
                            <input className="form-check-input" type="radio" id="medi-embarazo-no" name="option-embarazo" value={false} {...register("medicamentos_embarazo", { required: true })} />
                        </label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="motivo_medicamento_embarazo" className="form-label label-form">Motivo</label>
                        <input className="form-control input-form" id="motivo_medicamento" type="text" placeholder="Motivo" {...register("motivo_medicamento_embarazo")} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nom_medicamento_embarazo" className="form-label label-form">Nombre</label>
                        <input id="nom_medicamento_embarazo" className="form-control input-form" type="text" placeholder="Nombre del medicamento" {...register("nombre_medicamento_embarazo")} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="dosis_medicamento_embarazo" className="form-label label-form">Dosis</label>
                        <input id="dosis_medicamento_embarazo" className="form-control input-form" type="text" placeholder="Dosis del medicameto" {...register("dosis_medicamento_embarazo")} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="tipo_parto" className="form-label label-form">Tipo de parto</label>
                        <input type="text" placeholder="Tipo de parto" className="form-control input-form" {...register("tipo_parto", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="duracion_parto" className="form-label label-form">Duración</label>
                        <input id="duracion_parto" className="form-control input-form" type="text" placeholder="Duración" {...register("duracion_parto", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="complicaciones_parto" className="form-label label-form">Complicaciones en el parto</label>
                        <input id="complicaciones_parto" className="form-control input-form" type="text" placeholder="Complicaciones" {...register("complicaciones_parto")} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="peso_nacer" className="form-label label-form">Peso al nacer</label>
                        <input id="peso_nacer" className="form-control input-form" type="number" step="any" placeholder="Peso kg" {...register("peso_nacer", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="talla_nacer" className="form-label label-form">Talla</label>
                        <input className="form-control input-form" type="number" step="any" placeholder="Talla cm" {...register("talla_nacer", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="alimentacion_seno_materno" className="form-label label-form">Alimentación por seno materno</label>
                        <label className="form-check-label mx-2">Si
                            <input className="form-check-input" type="radio" id="alimentacion-seno-si" name="option-alimentacion-seno" value={true} {...register("alimentacion_seno_materno", { required: true })} />
                        </label>
                        <label className="form-check-label mx-2">No
                            <input className="form-check-input" type="radio" id="alimentacion-seno-no" name="option-alimentacion-seno" value={false} {...register("alimentacion_seno_materno", { required: true })} />
                        </label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="tiempo_alimentacion_seno" className="form-label label-form">Tiempo de alimentación por seno</label>
                        <input className="form-control input-form" id="tiempo_alimentacion_seno" type="text" placeholder="Tiempo" {...register("tiempo_alimentacion_seno")} />
                    </div>

                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_sosten_cefalico" className="form-label label-form">Edad a la que logo sostén cefálico</label>
                        <input id="edad_sosten_cefalico" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_sosten_cefalico", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_aparicion_balbuceo" className="form-label label-form">Edad de aparicion del balbuceo</label>
                        <input id="edad_balbuceo" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_balbuceo", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_logro_sentarse" className="form-label label-form">Edad a la que logró sentarse</label>
                        <input id="edad_logro_sentarse" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_sentarse", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_logro_ponerse_pie" className="form-label label-form">Edad a la que logró sentarse</label>
                        <input type="number" className="form-control input-form" id="edad_logro_ponerse_pie" placeholder="Edad" {...register("edad_ponerse_pie", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_camino" className="form-label label-form">Edad a la que caminó sin ayuda</label>
                        <input id="edad_camino" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_camino", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">Controla actualmente esfinter</label>
                        <label className="form-check-label mx-2">Si
                            <input className="form-check-input" type="radio" id="controla-esfinter-si" name="option-esfinter" value={true} {...register("controla_esfinter", { required: true })} />
                        </label>
                        <label className="form-check-label mx-2">No
                            <input className="form-check-input" type="radio" id="controla-esfinter-no" name="option-esfinter" value={false} {...register("controla_esfinter", { required: true })} />
                        </label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_control_esfinter" className="form-label label-form">Edad de control</label>
                        <input className="form-control input-form" id="edad_control_esfinter" type="number" placeholder="Edad" {...register("edad_control_esfinter", { required: true })} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="enfermedad_primer_año" className="form-label label-form">Enfermedades significativas durante el primer año de vida</label>
                        <textarea id="enfermedad_primer_año" className="form-control input-form" placeholder="Enfermedades significativas" {...register("enfermedades_primer_año_vida", { required: true })}></textarea>
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="enfermedades_posteriores" className="form-label label-form">Enfermedades posteriores</label>
                        <textarea className="form-control input-form" id="enfermedades_posteriores" placeholder="Enfermedades, operaciones, crisis febriles, o accidentes posteriores" {...register("enfermedades_posteriores", { required: true })}></textarea>
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="antecedentes_padecimiento" className="form-label label-form">Antecedentes familiares hereditarios vinculados al padecimiento actual</label>
                        <input id="antecedentes_padecimiento" className="form-control input-form" type="text" placeholder="Antecedentesfamiliares hereditarios" {...register("antecedentes_padecimiento_actual", { required: true })} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="salud_fisica_actual" className="form-label label-form">Salud física Actual</label>
                        <textarea id="salud_fisica_actual" className="form-control input-form" placeholder="Salud física actual (energia, fatiga, regularidad de funciones, sueño, quejas, alimentación " {...register("salud_fisica_actual", { required: true })}></textarea>
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="area_escolar" className="form-label label-section">ÁREA ESCOLAR</label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="edad_ingreso_sistema" className="form-label label-form">Edad de ingreso al sistema escolar</label>
                        <input id="edad_ingreso_escolar" className="form-control input-form" type="number" placeholder="Edad" {...register("edad_ingreso_escolar", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nivel_ingreso" className="form-label label-form">Nivel</label>
                        <input id="nivel_ingreso" className="form-control input-form" type="text" placeholder="Nivel" {...register("nivel_ingreso", { required: true })} />
                    </div>
                    <div className="col-md-9 offset-md-1">
                        <label htmlFor="conducta_niño" className="form-label label-form"> Conducta del niño al ingresar a la escuela de acuerdo a padres y maestros</label>
                        <input id="conducta_niño" className="form-control input-form" type="text" placeholder="Conducta" {...register("conducta_ingreso", { required: true })} />
                    </div>
                    <div className="col-md-8 offset-1 mt-4 mb-4">
                        <button className="button-guardar">Guardar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

