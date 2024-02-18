import { useForm } from "react-hook-form";
import { FormFichaPsicoNiño } from "./FormFichaPsicoNiño";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";
import { registerFichaPsiNiño } from "../../services/Psicologia";

export function AddFichaPsiNiño() {
    const { register, handleSubmit } = useForm();
    const { authTokens } = useContext(AuthContext)
    const [pacienteSelect, setPacienteSelect] = useState("")
    const onSubmit = handleSubmit(async (data) => {
        const fichaPsicoNiño = {
            expedienteFicha: data.expedienteFicha,
            "datos_generales": {
                años: data.años,
                meses: data.meses,
                fecha_nacimiento: data.fecha_nacimiento,
                lugar_nacimiento: data.lugar_nacimiento,
                grado_escolar: data.grado_escolar,
                nombre_escuela: data.nombre_escuela,
                ubicacion_escuela: data.ubicacion_escuela,
                lugar_ocupa_familia: data.lugar_ocupa_familia,
                informacion_hermanos: data.informacion_hermanos,
                nombre_padre: data.nombre_padre,
                edad_padre: data.edad_padre,
                escolaridad_padre: data.escolaridad_padre,
                ocupacion_padre: data.ocupacion_padre,
                nombre_madre: data.nombre_madre,
                edad_madre: data.edad_madre,
                escolaridad_madre: data.escolaridad_madre,
                ocupacion_madre: data.ocupacion_madre,
                estado_civil_padres: data.estado_civil_padres,
                años_estado_civil: data.años_estado_civil,
                edad_tutor: data.edad_tutor,
                ocupacion_tutor: data.ocupacion_tutor,
                motivos_niño_cargo_tutor: data.motivos_niño_cargo_tutor,
                desde_cuando_tutor: data.desde_cuando_tutor,
                descripcion_viven_con_niño: data.descripcion_viven_con_niño,
                motivo: data.motivo,
                canalizado_por: data.canalizado_por,

            },
            "antecedentes_padecimiento": {
                consulta_otro_profesional: data.consulta_otro_profesional,
                diagnostico_otorgado: data.diagnostico_otorgado,
                toma_medicamento: data.toma_medicamento,
                motivo_medicamento: data.motivo_medicamento,
                nombre_medicamento: data.nombre_medicamento,
                dosis_medicamento: data.dosis_medicamento,
                realizado_estudio: data.realizado_estudio,
            },
            "antecedentes_desarrollo": {
                numero_embarazos_madre: data.numero_embarazos_madre,
                tiempo_gestacion: data.tiempo_gestacion,
                problemas_durante_embarazo: data.problemas_durante_embarazo,
                tiempo_gestacion: data.tiempo_gestacion,
                problemas_durante_embarazo: data.problemas_durante_embarazo,
                medicamentos_embarazo: data.medicamentos_embarazo,
                motivo_medicamento_embarazo: data.motivo_medicamento_embarazo,
                nombre_medicamento_embarazo: data.nombre_medicamento_embarazo,
                dosis_medicamento_embarazo: data.dosis_medicamento_embarazo,
                tipo_parto: data.tipo_parto,
                duracion_parto: data.duracion_parto,
                complicaciones_parto: data.complicaciones_parto,
                peso_nacer: data.peso_nacer,
                talla_nacer: data.talla_nacer,
                alimentacion_seno_materno: data.alimentacion_seno_materno,
                tiempo_alimentacion_seno: data.tiempo_alimentacion_seno,
                edad_sosten_cefalico: data.edad_sosten_cefalico,
                edad_balbuceo: data.edad_balbuceo,
                edad_sentarse: data.edad_sentarse,
                edad_ponerse_pie: data.edad_ponerse_pie,
                edad_camino: data.edad_camino,
                controla_esfinter: data.controla_esfinter,
                edad_control_esfinter: data.edad_control_esfinter,
                enfermedades_primer_año_vidad: data.enfermedades_primer_año_vidad,
                enfermedades_posteriores: data.enfermedades_posteriores,
                antecedentes_padecimiento_actual: data.antecedentes_padecimiento_actual,
                salud_fisica_actual: data.salud_fisica_actual,
            },
            "datos_escolares": {
                edad_ingreso_escolar: data.edad_ingreso_escolar,
                nivel_ingreso: data.nivel_ingreso,
                conducta_ingreso: data.conducta_ingreso,
            },
            idPaciente: pacienteSelect,
        }
        try {
            await setToken(authTokens.access);
            const response = await registerFichaPsiNiño(fichaPsicoNiño);
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })
    return (
        <>
            <FormFichaPsicoNiño register={register} onSubmit={onSubmit} pacienteSelect={setPacienteSelect} />
        </>
    )
}

