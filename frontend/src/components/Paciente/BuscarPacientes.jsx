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
            <div className="container-fluid">
                <div className="row g-3 mt-4">
                    {pacientes.map(paciente => (
                        <div key={paciente.CURP} className="col-md-3 offset-md-1">
                            <PacienteCardResumen paciente={paciente} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

