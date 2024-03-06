import { useForm } from "react-hook-form"
import { FormHojaDeEvaluacion } from "./FormHojaDeEvaluacion"
import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { registerHojaEvaluacion } from "../../services/DoctorGeneral"
import { setToken } from "../../services/HeaderAuthorization"

export function AddHojaDeEvaluacion() {
    const { register, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [pacienteSelect, setPacienteSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {
        const hojaEvaluacion = {
            fecha_revision: data.fecha_revision,
            nota_medica: data.nota_medica,
            "datos_nota_enfermeria": {
                tension_arterial: data.tension_arterial,
                frecuencia_cardiaca: data.frecuencia_cardiaca,
                frecuencia_respiratoria: data. frecuencia_respiratoria,
                temperatura: data.temperatura,
                imc: data.imc,
                saturacion_oxigeno: data.saturacion_oxigeno,
                glucosa: data.glucosa,
                peso: data.peso,
                talla: data.talla,
                cintura: data.cintura,
            },
            idPaciente: pacienteSelect,
            
        }
        try {
            await setToken(authTokens.access);
            const response = await registerHojaEvaluacion(hojaEvaluacion);
            console.log(response)
        } catch (error) {
            console.error(error)
        }

    })
    return (
        <>
            <FormHojaDeEvaluacion register={register} onSubmit={onSubmit} pacienteSelect={setPacienteSelect} />
        </>
    )
}