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
            <div className="container-fluid">
                <div className="row g-3 mt-4">
                    <div className="col-md-4 offset-md-1 row">
                    <div class="d-flex" role="search">
                        <input class="form-control me-2" type="search" id="busqueda_paciente" placeholder="Buscar por CURP o nombre" onChange={handleBarraBusqueda} aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit" onClick={handleBuscarPaciente}>Search</button>
                    </div>
                    </div>
                    {pacienteResult.length >=1 && (
                        <hr3 className="sub-title offset-md-1">RESULTADO DE BÚSQUEDA</hr3>
                    )}
                    
                    {pacienteResult.map(resultado => (
                        <div key={resultado.CURP} className="col-md-3 offset-md-1 ">
                                <PacienteCardResumen paciente={resultado} />
                            
                        </div>
                    ))}

                    

                    <div className="col-md-12 offset-md-1">
                        <hr3 className="sub-title">PACIENTES REGISTRADOS</hr3>
                    </div>
                    {pacientes.map(paciente => (
                        <div key={paciente.CURP} className="col-md-3 offset-md-1 mt-4">
                            <PacienteCardResumen paciente={paciente} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

