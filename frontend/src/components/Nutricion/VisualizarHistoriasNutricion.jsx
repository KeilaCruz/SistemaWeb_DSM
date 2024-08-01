import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { buscarHistoriaNutricion, visualizarHistorias } from "../../services/Nutriologo"
import { getReporteHistoriaNutricion } from "../../services/Reportes"

export function VisualizarHistoriasNutricion() {
    const [historias, setHistorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { authTokens } = useContext(AuthContext);
    const [criterio, setCriterio] = useState("")
    const [isResult, setIsResult] = useState(true)
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHistorias = historias.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        async function loadHistorias() {
            await setToken(authTokens.access)
            const response = await visualizarHistorias()
            setHistorias(response)
            setIsResult(response.length > 0)
        }
        loadHistorias()
    }, [])

    const handleHistorias = (idPaciente) => {
        navigate(`/historia_nutricion/${idPaciente}`)
    }
    const handleBuscarHistoria = async () => {
        try {
            await setToken(authTokens.access);
            if (criterio.trim() === "") {
                const response = await visualizarHistorias();
                setHistorias(response);
                setIsResult(response.length > 0);
            } else {
                const response = await buscarHistoriaNutricion(criterio);
                if (response && Array.isArray(response)) {
                    setHistorias(response);
                    setIsResult(response.length > 0);
                } else {
                    setHistorias([]);
                    setIsResult(false);
                }
            }
        } catch (error) {
            console.error(error);
            setHistorias([]);
            setIsResult(false);
        }
    };
    const handleBarraBusqueda = (evt) => {
        setCriterio(evt.target.value)
    }
    const handleDownloadHistoriasNutricion = async () => {
        await setToken(authTokens.access)
        await getReporteHistoriaNutricion()
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 offset-md-1 text-center">
                        <hr />
                        <h3 className="title">HISTORIAS DE NUTRICIÓN</h3>
                        <hr />
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-5 offset-1 mt-2 mb-2">
                                <input className="form-control input-form" type="search" id="busqueda_paciente" placeholder="Buscar por CURP del paciente" onChange={handleBarraBusqueda} />
                            </div>
                            <div className="col-md-3 mt-2">
                                <button type="button" onClick={handleBuscarHistoria} className="button-buscar">
                                    <i class="lni lni-search-alt"></i>
                                </button>
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn rounded btn-success" onClick={handleDownloadHistoriasNutricion}>
                                    <i class="lni lni-download"> Descargar excel</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-9 offset-md-1'>
                    {isResult ? (
                        <table className="table-bordered">
                            <thead className='cabecera'>
                                <tr>
                                    <th className='columv3'>Id</th>
                                    <th className='columv3'>Fecha registro</th>
                                    <th className='columv3'>Motivo consulta</th>
                                    <th className='columv3'>Curp paciente</th>
                                    <th className='columv3'>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentHistorias.map(historia => (
                                    <tr>
                                        <td className="fila">{historia.idHistoriaNutricion}</td>
                                        <td className="fila">{historia.fecha_registro}</td>
                                        <td className="fila">{historia.datos_personales.motivo_consulta}</td>
                                        <td className="fila">{historia.idPaciente}</td>
                                        <td className="fila">
                                            <button type="button" className="button-filter rounded" onClick={() => handleHistorias(historia.idPaciente)} title="Visualizar historia nutrición">
                                                <i class="lni lni-weight"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-danger mt-4">NO SE ENCONTRARON RESULTADOS DE BÚSQUEDA</p>
                    )}
                </div>
                <div className="pagination mt-2 col-md-10 offset-md-1">
                    {[...Array(Math.ceil(historias.length / itemsPerPage)).keys()].map(number => (
                        <button key={number} onClick={() => paginate(number + 1)} className="page-link button-pagination rounded">
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

