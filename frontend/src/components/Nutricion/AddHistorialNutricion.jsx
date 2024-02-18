import { useForm } from "react-hook-form"
import { FormHistoriaNutricion } from "./FormHistoriaNutricion"
import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { registerHistoriaNutricion } from "../../services/Nutriologo"
import { setToken } from "../../services/HeaderAuthorization"

export function AddHistorialNutricion() {
    const { register, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [pacienteSelect, setPacienteSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {
        const historiaNutricion = {
            "datos_personales": {
                num_expediente: data.num_expediente,
                fecha_nacimiento: data.fecha_nacimiento,
                municipio_nacimiento: data.municipio_nacimiento,
                estado_nacimiento: data.estado_nacimiento,
                sexo: data.sexo,
                motivo_consulta: data.motivo_consulta,
            },
            "indicadores_clinicos": {
                AHF_diabetes: data.AHF_diabetes,
                quien_diabetes: data.quien_diabetes,
                AHF_hipertension: data.AHF_hipertension,
                quien_hipertension: data.quien_hipertension,
                AHF_dislipidemias: data.AHF_dislipidemias,
                quien_dislipidemias: data.quien_dislipidemias,
                AP_diabetes_mellitus: data.AP_diabetes_mellitus,
                AP_hipertension: data.AP_hipertension,
                AP_dislipidemias: data.AP_dislipidemias,
                problema_gastrointestinal: data.problema_gastrointestinal,
                cual_problema_gastrointestinal: data.cual_problema_gastrointestinal,
                observaciones_patologicas: data.observaciones_patologicas,
                intervencion_quirurgica: data.intervencion_quirurgica,
                alergia_alimento: data.alergia_alimento,
                cual_alergia_alimento: data.cual_alergia_alimento,
                consume_farmaco_alergia: data.consume_farmaco_alergia,
                cual_alergia_farmaco: data.cual_alergia_farmaco,
                desde_cuando_farmaco: data.desde_cuando_farmaco,
            },
            "anp": {
                realiza_actividad_fisica: data.realiza_actividad_fisica,
                cual_actividad_fisica: data.cual_actividad_fisica,
                duracion: data.duracion,
                consume_alcohol: data.consume_alcohol,
                consume_tabaco: data.consume_tabaco,
                consume_droga: data.consume_droga,
            },
            "ago": {
                numero_gestas: data.numero_gestas,
                numero_partos_cesarea: data.numero_partos_cesarea,
                numero_abortos: data.numero_abortos,
                fecha_ultima_menstruacion: data.fecha_ultima_menstruacion,
                actualmente_lactando: data.actualmente_lactando,
                presenta_menoupasia: data.presenta_menoupasia,
            },
            "indicadores_diabeticos": {
                frecuencia_cereales: data.frecuencia_cereales,
                frecuencia_frutas: data.frecuencia_frutas,
                frecuencia_verduras: data.frecuencia_verduras,
                frecuencia_carne_roja: data.frecuencia_carne_roja,
                frecuencia_pollo: data.frecuencia_pollo,
                frecuencia_lacteos: data.frecuencia_lacteos,
                frecuencia_leguminosas: data.frecuencia_leguminosas,
                frecuencia_azucar: data.frecuencia_azucar,
                frecuencia_grasas: data.frecuencia_grasas,
                frecuencia_pescado: data.frecuencia_pescado,
                cuantas_veces_come: data.cuantas_veces_come,
                quien_prepara_alimentos: data.quien_prepara_alimentos,
                litro_consume_agua: data.litro_consume_agua,
                litro_consume_refresco: data.litro_consume_refresco,
                tipo_grasa_preparar_alimentos: data.tipo_grasa_preparar_alimentos,
                litro_consume_cafe: data.litro_consume_cafe,
                alimentos_causan_malestar: data.alimentos_causan_malestar,
                r24_desayuno: data.r24_desayuno,
                r24_colacion_uno: data.r24_colacion_uno,
                r24_comida: data.r24_comida,
                r24_colacion_dos: data.r24_colacion_dos,
                r24_cena: data.r24_cena,
            },
            "diagnostico": {
                diagnostico_nutricio: data.diagnostico_nutricio,
                tratamiento_nutricional: data.tratamiento_nutricional,
            },
            idPaciente: pacienteSelect,
        }
        try {
            await setToken(authTokens.access);
            const response = await registerHistoriaNutricion(historiaNutricion);
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })
    return (
        <>
            <FormHistoriaNutricion register={register} onSubmit={onSubmit} pacienteSelect={setPacienteSelect} />
        </>
    )
}

