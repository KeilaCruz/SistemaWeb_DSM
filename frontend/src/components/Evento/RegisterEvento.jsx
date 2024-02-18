import { useForm } from "react-hook-form"
import { registerEvento, setConfig } from "../../services/Recepcionista"
import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { FormEvento } from "./FormEvento"

export function RegisterEvento () {
    const { authTokens } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const [usuarioSelect, setUsuarioSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {

        const eventoData = {
            idEvento: data.idEvento,
            "datos_evento" : {
                fecha : data.fecha,
                hora : data.hora,
                lugar : data.lugar,
                descripcion : data.descripcion,
                nom_evento : data.nom_evento

            },
            idUsuario : usuarioSelect
        }

        try {
            await setConfig(authTokens.access)
            const response = await registerEvento(eventoData)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <FormEvento register={register} onSubmit={onSubmit} usuarioSelect={setUsuarioSelect}/>
    )
}