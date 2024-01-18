import axios from 'axios';
import { CREAR_PACIENTE_URL } from "../constants"
export function RegistrarPaciente() {
    const onSubmit = handleSubmit(async (data) => {
        axios.post(CREAR_PACIENTE_URL, data).then(response => {
            console.log("Respuesta exitosa", response.data)
        }).catch(err => {
            console.error("Error al realizar solicitud", err)
        })
    })
    return (
        <>
        </>
    )
}

