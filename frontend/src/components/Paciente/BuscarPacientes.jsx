import { getAllPacientes, searchPaciente } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { PacienteCardResumen } from "./PacienteCardResumen"
import { getReportePacientes } from "../../services/Reportes"

export function BuscarPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [pacienteResult, setPacienteResult] = useState([])
    const [criterio, setCriterio] = useState("")
    const { authTokens } = useContext(AuthContext)
    const [isResult, setIsResult] = useState(true)
    const [stateTexto, setStateTexto] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    //calculos para hacer la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPacientes = pacientes.slice(indexOfFirstItem, indexOfLastItem);
    const currentPacienteResult = pacienteResult.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    const handleDownloadPacientes = async () => {
        await setToken(authTokens.access)
        await getReportePacientes();
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row g-2">
                    <div className="col-md-12 text-center ">
                        <hr />
                        <h3 className="title">PACIENTES REGISTRADOS</h3>
                        <hr />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <input className="form-control " type="search" id="busqueda_paciente" placeholder="Buscar por primer nombre, curp o número telefónico" onChange={handleBarraBusqueda} />
                    </div>
                    <div className="col-md-2">
                        <button type="button" onClick={handleBuscarPaciente} className="button-buscar rounded">
                            <i class="lni lni-search-alt"></i>
                        </button>
                    </div>
                    <div className="col-md-3 offset-md-1">
                        <button type="button" className="btn rounded btn-success" onClick={handleDownloadPacientes}>
                            <i class="lni lni-download"> Descargar excel</i>
                        </button>
                    </div>
                    {stateTexto ? (<h3 className="sub-title mt-1">RESULTADO DE BÚSQUEDA</h3>) : (<p></p>)}
                    {isResult ? (
                        <div className="row">
                            {currentPacienteResult.map(resultado => (
                                <div key={resultado.CURP} className="col-md-3 mt-2">
                                    <PacienteCardResumen paciente={resultado} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-danger mt-4">NO SE ENCONTRARON RESULTADOS DE BÚSQUEDA</p>
                    )}

                    <div className="col-md-10 mt-2">
                        <h3 className="sub-title">PACIENTES REGISTRADOS</h3>
                    </div>

                    <div className="row">
                        {currentPacientes.map(paciente => (
                            <div key={paciente.CURP} className="col-md-3 mt-2">
                                <PacienteCardResumen paciente={paciente} />
                            </div>
                        ))}
                    </div>

                    <div className="pagination mt-2 col-md-10 mx-3">
                        {[...Array(Math.ceil(pacientes.length / itemsPerPage)).keys()].map(number => (
                            <button key={number} onClick={() => paginate(number + 1)} className="page-link button-pagination rounded">
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}

