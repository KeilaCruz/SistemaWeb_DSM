import { getAllPacientes, getPaciente } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { PacienteCardResumen } from "./PacienteCardResumen"

export function BuscarPacientes() {
    const [pacientes, setPacientes] = useState([])
    const { authTokens } = useContext(AuthContext)
    useEffect(() => {
        async function loadPacientes() {
            await setToken(authTokens.access)
            const response = await getAllPacientes();
            setPacientes(response)
        }
        loadPacientes()
    }, [])
    return (
        <>
            {pacientes.map(paciente => (
                <div div key={paciente.CURP}>
                    <PacienteCardResumen paciente={paciente} />
                </div>
            ))}
        </>
    )
}

