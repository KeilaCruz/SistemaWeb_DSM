import { getAllPacientes, searchPaciente } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { PacienteCardResumen } from "./PacienteCardResumen"

export function BuscarPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [pacienteResult, setPacienteResult] = useState([])
    const [criterio, setCriterio] = useState("")
    const { authTokens } = useContext(AuthContext)
    
    const handleBarraBusqueda = (evt) => {
        const valor = evt.target.value;
        setCriterio(valor)
        if (valor === "") {
            setPacienteResult([])
        }
    }

    useEffect(() => {
        async function loadPacientes() {
            await setToken(authTokens.access)
            const response = await getAllPacientes();
            setPacientes(response)
        }
        loadPacientes()
    }, [])

    const handleBuscarPaciente = async () => {
        try {
            await setToken(authTokens.access)
            const data = await searchPaciente(criterio)
            setPacienteResult(data)
        } catch (error) {
            console.error(error)
        }
    }

    
    return (
        <>
        <div className="container-fluid pb-4">
            <div className="row g-3 mt-4">
                <div className="col-md-10 offset-1 row">
                    <div className="col-md-6">
                        <input className="form-control input-form" type="text" id="busqueda_paciente" placeholder="Buscar por CURP o nombre" onChange={handleBarraBusqueda} />
                    </div>
                    <div className="col-md-3">
                        <button onClick={handleBuscarPaciente} className="button-buscar">Buscar</button>
                    </div>
                </div>
               
                {pacienteResult.map(resultado => (
                    <div key={resultado.CURP} className="col-md-10 offset-md-1 ">
                        <h3 className="sub-title">RESULTADO DE BÚSQUEDA</h3>
                        <div className="col-md-3">
                            <PacienteCardResumen paciente={resultado} />
                        </div>
                    </div>
                ))}
                <div className="col-md-10 offset-md-1">
                    <h3 className="sub-title">PACIENTES REGISTRADOS</h3>
                </div>
                <div className="row">
                    {pacientes.map(paciente => (
                        <div key={paciente.CURP} className="col-md-3 offset-md-1 mt-4">
                            <PacienteCardResumen paciente={paciente} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
    
    )
}

