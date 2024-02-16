import { useForm } from "react-hook-form"
import { useState, useContext } from "react"
import AuthContext from "../../context/AuthProvider";
import { FormFichaPsicoAdulto } from "./FormFichaPsicoAdulto";
import { registerFichaPsiAdulto } from "../../services/Psicologia";
import { setToken } from "../../services/HeaderAuthorization";


export function AddFichaPsiAdulto() {
    const { register, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [pacienteSelect, setPacienteSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {
        const fichaPsicoAdulto = {
            expedienteFicha: data.expedienteFicha,
            idPaciente: pacienteSelect,
            "datos_generales": {
                genero: data.genero,
                fecha_nacimiento: data.fecha_nacimiento,
                lugar_nacimiento: data.lugar_nacimiento,
                numero_hijos: data.numero_hijos,
                edad_hijos: data.edad_hijos,
                ocupacion_hijos: data.ocupacion_hijos,
                religion: data.religion,
                ocupacion: data.ocupacion,
                nivel_socioeconomico: data.nivel_socioeconomico,
                motivo_consulta: data.motivo_consulta,
                referido: data.referido,
                recibido_orientacion_psico: data.recibido_orientacion_psicologica,
                motivos_orientacion: data.motivos_orientacion,
                tiempo_orientacion: data.tiempo_orientacion
            },
            historia_actual_paciente: data.historia_actual_paciente,
            "datos_desarrollo": {
                historia_desarrollo: data.historia_desarrollo,
                primeros_cuatro_años: data.primeros_cuatro_años,
            },
            "datos_escolar": {
                historia_escolar_kinder: data.historia_escolar_kinder,
                historia_escolar_primaria: data.historia_escolar_primaria,
                historia_escolar_secundaria: data.historia_escolar_secundaria,
                historia_escolar_preparatoria: data.historia_escolar_preparatoria,
                historia_escolar_profesional: data.historia_escolar_profesional,
            },
            "datos_laboral": {
                historia_laboral: data.historia_laboral,
                gusta_trabajo: data.gusta_trabajo,
                no_gusta_trabajo: data.no_gusta_trabajo,
            },
            "datos_familiares": {
                percibe_padres: data.percibe_padres,
                contado_padres: data.contado_padres,
                percibe_vive_casa: data.percibe_vive_casa,
                percibe_hijos: data.percibe_hijos,
                otros_familiares_significativos: data.otros_familiares_significativos,
                tiene_mascotas: data.tiene_mascotas,
            },
            "datos_medico_quirurgica": {
                padecimientos_heredofamiliares: data.padecimientos_heredofamiliares,
                enfermedades_padecido: data.enfermedades_padecido,
                padece_sintomas_transtornos_psicomaticos: data.padece_sintomas_transtornos_psicomaticos,
                cuales_psicomaticos: data.cuales_psicomaticos,
                padece_enfermedades_cronica: data.padece_enfermedades_cronica,
                cual_cronica: data.cual_cronica,
                bajo_tratamiento: data.bajo_tratamiento,
                cual_tratamiento: data.cual_tratamiento,
                intervenido_quirurgicamente: data.intervenido_quirurgicamente,
                causa_intervencion: data.causa_intervencion,
                tiene_adicciones: data.tiene_adicciones,
                cual_adiccion: data.cual_adiccion,
                otro_datos: data.otro_datos,
                recibido_atencion_medica_adecuada: data.recibido_atencion_medica_adecuada,
                especificar: data.especificar,
            },
            "datos_sexual": {
                cuando_diferencia_genero: data.cuando_diferencia_genero,
                como_diferencia_genero: data.como_diferencia_genero,
                genero_asignaron_niño: data.genero_asignaron_niño,
                experiencia_abuso_sexual: data.experiencia_abuso_sexual,
                edad_abuso_sexual: data.edad_abuso_sexual,
                por_quien_abuso_sexual: data.por_quien_abuso_sexual,
                sexual_activo: data.sexual_activo,
                edad_primera_relacion_sexual: data.edad_primera_relacion_sexual,
                con_quien_primera: data.con_quien_primera,
                como_hansido_experiencia_sexual: data.como_hansido_experiencia_sexual,
                utiliza_metodo_conceptivo: data.utiliza_metodo_conceptivo,
                cual_metodo_conceptivo: data.cual_metodo_conceptivo,
                datos_distintivo_genero: {
                    "isFemenino": {
                        edad_menarca: data.edad_menarca,
                        informacion_tenia_menarca: data.informacion_tenia_menarca,
                        quien_dio_info_menarca: data.quien_dio_info_menarca,
                        como_recibio_info_menarca: data.como_recibio_info_menarca,
                    },
                    "isMasculino": {
                        edad_primeras_eyaculaciones_nocturnas: data.edad_primeras_eyaculaciones_nocturnas,
                        informacion_tenia_eyaculacion: data.informacion_tenia_eyaculacion,
                        quien_dio_info: data.quien_dio_info_eyaculacion,
                        como_recibio_info_eyaculacion: data.como_recibio_info_eyaculacion,
                    }
                }
            },
            tenido_relaciones_distintas_heterosexuales: data.tenido_relaciones_distintas_heterosexuales,
        }
        try {
            await setToken(authTokens.access)
            const response = await registerFichaPsiAdulto(fichaPsicoAdulto)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <>
            <FormFichaPsicoAdulto register={register} onSubmit={onSubmit} pacienteSelect={setPacienteSelect} />
        </>
    )
}

