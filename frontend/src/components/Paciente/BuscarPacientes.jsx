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
    const [isResult, setIsResult] = useState(true)
    const [stateTexto, setStateTexto] = useState(false)
    const handleBarraBusqueda = (evt) => {
        const valor = evt.target.value;
        setCriterio(valor)
        if (valor === "") {
            setPacienteResult([])
            setStateTexto(false)
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
            if (criterio.trim() === "") {
                setIsResult(false);
                return;
            }
            await setToken(authTokens.access)
            const data = await searchPaciente(criterio)
            setPacienteResult(data)
            setIsResult(data.length > 0)
            setStateTexto(data.length > 0)
        } catch (error) {
            console.error(error)
            setIsResult(false)
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="col-md-6">
                        <input className="form-control input-form" type="search" id="busqueda_paciente" placeholder="Buscar por CURP, primer nombre o teléfono" onChange={handleBarraBusqueda} />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" onClick={handleBuscarPaciente} className="button-buscar">
                            <i class="lni lni-search-alt"></i>
                        </button>
                    </div>
                    {stateTexto ? (<h3 className="sub-title mt-2">RESULTADO DE BÚSQUEDA</h3>) : (<p></p>)}
                    {isResult ? (
                        <div className="row">
                            {pacienteResult.map(resultado => (
                                <div key={resultado.CURP} className="col-md-10 mt-2">
                                    <div className="col-md-3">
                                        <PacienteCardResumen paciente={resultado} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-danger mt-4">NO SE ENCONTRARON RESULTADOS DE BÚSQUEDA</p>
                    )}

                    <div className="col-md-10 mt-4">
                        <h3 className="sub-title">PACIENTES REGISTRADOS</h3>
                    </div>

                    <div className="row">
                        {pacientes.map(paciente => (
                            <div key={paciente.CURP} className="col-md-3 mt-4">
                                <PacienteCardResumen paciente={paciente} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>

    )
}

