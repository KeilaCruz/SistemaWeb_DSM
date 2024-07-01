import { useForm } from "react-hook-form"
import { FormHojaDeEvaluacion } from "./FormHojaDeEvaluacion"
import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { registerHojaEvaluacion } from "../../services/DoctorGeneral"
import { setToken } from "../../services/HeaderAuthorization"

export function AddHojaDeEvaluacion() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [pacienteSelect, setPacienteSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {

        const formData = new FormData();

        // Añadir archivos a FormData si existen
        /*if (data.archivo !== null && data.archivo.length > 0) {
            for (let i = 0; i < data.archivo.length; i++) {
                formData.append('archivo', data.archivo[i]);
            }
        }
        */
        formData.append('fecha_revision', data.fecha_revision)
        formData.append('nota_medica', data.nota_medica)
        formData.append('datos_nota_enfermeria', JSON.stringify({
            tension_arterial: data.tension_arterial,
            frecuencia_cardiaca: data.frecuencia_cardiaca,
            frecuencia_respiratoria: data.frecuencia_respiratoria,
            temperatura: data.temperatura,
            imc: data.imc,
            saturacion_oxigeno: data.saturacion_oxigeno,
            glucosa: data.glucosa,
            peso: data.peso,
            talla: data.talla,
            cintura: data.cintura,
        }))
        formData.append('idPaciente', pacienteSelect)
        if (data.archivo && data.archivo[0] instanceof File) {
            formData.append('archivo', data.archivo[0]);
        } else {
            console.error('El archivo no es válido');
            return;
        }
        try {
            await setToken(authTokens.access);
            const response = await registerHojaEvaluacion(formData);
            console.log(response)
        } catch (error) {
            console.error(error)
        }

    })
    return (
        <>
            <FormHojaDeEvaluacion register={register} onSubmit={onSubmit} pacienteSelect={pacienteSelect} setPacienteSelect={setPacienteSelect} errors={errors} />
        </>
    )
}