import { useContext, useState } from "react"
import { registerCita, setConfig } from "../../services/Recepcionista"
import AuthContext from "../../context/AuthProvider"
import { useForm } from "react-hook-form";
import "../../css/styles.css"
import { FormCita } from "./FormCita";
export function AddCita() {
    const { authTokens } = useContext(AuthContext);
    const { register, handleSubmit } = useForm()
    const [pacienteSelect, setPacienteSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {
        console.log("datos del form", data)
        const citaData = {
            "datos_cita": {
                fecha_cita: data.fecha_cita,
                horario_cita: data.hora_cita,
                especialidad: data.especialidad,
            },
            estado: true,
            idPaciente: pacienteSelect,
        }
        try {
            await setConfig(authTokens.access)
            const response = await registerCita(citaData)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })
    return (
        <>
            <FormCita onSubmit={onSubmit} register={register} pacienteSelect={setPacienteSelect}/>
        </>
    )
}
