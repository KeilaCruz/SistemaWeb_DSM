import { useContext, useState } from "react"
import { registerCita } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider"
import { useForm } from "react-hook-form";
import { FormCita } from "./FormCita";

export function AddCita() {
    const { authTokens } = useContext(AuthContext);
    const { register, handleSubmit } = useForm()
    const [pacienteSelect, setPacienteSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {
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
            await setToken(authTokens.access)
            const response = await registerCita(citaData)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })
    return (
        <>
            <FormCita onSubmit={onSubmit} register={register} pacienteSelect={setPacienteSelect} />
        </>
    )
}