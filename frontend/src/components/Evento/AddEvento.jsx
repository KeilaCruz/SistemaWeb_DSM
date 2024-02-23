import { useForm } from "react-hook-form"
import { registerEvento } from "../../services/Recepcionista"
import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { FormEvento } from "./FormEvento"
import { setToken } from "../../services/HeaderAuthorization"

export function AddEvento () {
    const { authTokens } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const [usuarioSelect, setUsuarioSelect] = useState("")

    const onSubmit = handleSubmit(async (data) => {

        const eventoData = {
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
            await setToken(authTokens.access)
            const response = await registerEvento(eventoData)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <FormEvento register={register} onSubmit={onSubmit} usuarioSelect={setUsuarioSelect} />
    )
}