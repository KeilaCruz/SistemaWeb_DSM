import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerPaciente, setConfig } from "../../services/Recepcionista"
import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import FormularioPaciente from "./FormularioPaciente"
export function RegisterPaciente() {
    const { authTokens } = useContext(AuthContext);
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {

        const pacienteData = {
            CURP: data.CURP,
            "datos_personales": {
                nombre: data.nombre,
                apePaterno: data.apePaterno,
                apeMaterno: data.apeMaterno,
                edad: data.edad,
                estado_civil: data.estado_civil,
                escolaridad: data.escolaridad,
            },
            "datos_direccion": {
                colonia: data.colonia,
                calle: data.calle,
                numero_exterior: data.numero_exterior,
                CP: data.CP,
                referencia: data.referencia,
            },
            "datos_contacto": {
                telefono: data.telefono,
                derecho_habiencia: data.derecho_habiencia,
                unidad_salud: data.unidad_salud,
                ultima_visita_medico: data.ultima_visita_medico,
                numero_personas_vive: data.numero_personas_vive,
            },
            "otros_datos": {
                "programa_gobierno": {
                    federal: {
                        participa: data.programa_gobierno_federal,
                        nombre: data.cual_programa_federal,
                    },
                    estatal: {
                        participa: data.programa_gobierno_estatal,
                        nombre: data.cual_programa_estatal,
                    },
                    municipal: {
                        participa: data.programa_gobierno_municipal,
                        nombre: data.cual_programa_municipal,
                    },
                },
            },
        };

        try {
            await setConfig(authTokens.access)
            const response = await registerPaciente(pacienteData)
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    })

    return (
        <>
            <FormularioPaciente onSubmit={onSubmit} register={register}/>
        </>
    )
}

