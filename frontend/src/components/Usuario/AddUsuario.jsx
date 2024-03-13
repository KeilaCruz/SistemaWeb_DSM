import { useForm } from "react-hook-form"
import { registerUsuario } from "../../services/Admin"
import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { FormUsuario } from "./FormUsuario"
import { setToken } from "../../services/HeaderAuthorization"


export function AddUsuario () {
    const { authTokens } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()

    const onSubmit = handleSubmit(async (data) => {
        const usuarioData = {
            first_name : data.first_name,
            last_name: data.last_name,
            email: data.email,
            is_active: data.is_active,
            second_last_name: data.second_last_name,
            idRol: data.idRol,
            username: data.username,
            password: data.password,
        }

        try {
            await setToken(authTokens.access)
            const response = await registerUsuario(usuarioData)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <FormUsuario register={register} onSubmit={onSubmit}  />
    )
}