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
            "datos_generales": {},
            "antecedentes_padecimiento": {},
            "datos_escolares": {},
        }
        try {
            await setToken(authTokens.access)
            const response = await registerFichaPsiNiño()
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

