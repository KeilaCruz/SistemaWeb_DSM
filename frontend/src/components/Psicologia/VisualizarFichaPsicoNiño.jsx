import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { buscarFichaNino, getAllFichasPsiNiños } from "../../services/Psicologia"
import { FormEvoluciónPsicoNiño } from "./FormEvolucionPsicoNiño"
import { getReporteFichaPsicoNino } from "../../services/Reportes"


export function VisualizarFichaPsicoNiño() {
    const [fichas, setFichas] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { authTokens } = useContext(AuthContext)
    const [criterio, setCriterio] = useState("")
    const [isResult, setIsResult] = useState(true)
    const navigate = useNavigate()

    //calculos para hacer la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFichas = fichas.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        async function loadFichas() {
            await setToken(authTokens.access)
            const response = await getAllFichasPsiNiños()
            setFichas(response)
            setIsResult(response.length > 0)
        }
        loadFichas()
    }, [])
    const handleFichas = (idPaciente) => {
        navigate(`/fichapsico_niño/${idPaciente}`)
    }
    const handleModal = (datos) => {
        setSelectedData(datos)
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    const handleNotas = (idPaciente) => {
        navigate(`/visualizar_evolucion_nino/${idPaciente}`)
    }
    const handleBarraBusqueda = (evt) => {
        setCriterio(evt.target.value)
    }
    const handleBuscarFicha = async () => {
        try {
            await setToken(authTokens.access);
            if (criterio.trim() === "") {
                const response = await getAllFichasPsiNiños();
                setFichas(response);
                setIsResult(response.length > 0);
            } else {
                const response = await buscarFichaNino(criterio);
                if (response && Array.isArray(response)) {
                    setFichas(response);
                    setIsResult(response.length > 0);
                } else {
                    setFichas([]);
                    setIsResult(false);
                }
            }
        } catch (error) {
            console.error(error);
            setFichas([]);
            setIsResult(false);
        }
    };
    const handleDownloadFichaPsicoNino = async () => {
        await setToken(authTokens.access)
        await getReporteFichaPsicoNino()
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">FICHAS DE IDENTIFICACIÓN NIÑOS</h3>
                        <hr />
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 offset-1 mt-2 mb-2">
                            <input className="form-control input-form" type="search" id="busqueda_paciente" placeholder="Buscar por CURP del paciente" onChange={handleBarraBusqueda} />
                        </div>
                        <div className="col-md-3 mt-2">
                            <button type="button" onClick={handleBuscarFicha} className="button-buscar">
                                <i class="lni lni-search-alt"></i>
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button type="button" className="btn rounded btn-success" onClick={handleDownloadFichaPsicoNino}>
                                <i class="lni lni-download"> Descargar excel</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-md-10 offset-md-1'>
                    {isResult ? (
                        <table className="table-bordered">
                            <thead className='cabecera'>
                                <tr>
                                    <th className='colum'>Número expediente</th>
                                    <th className='colum'>Fecha registro</th>
                                    <th className='colum'>Motivo consulta</th>
                                    <th className='colum'>Curp paciente</th>
                                    <th className='colum'>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentFichas.map(ficha => (
                                    <tr>
                                        <td className='fila'>{ficha.expedienteFicha}</td>
                                        <td className='fila'>{ficha.fecha_registro}</td>
                                        <td className='fila'>{ficha.datos_generales.motivo}</td>
                                        <td className='fila'>{ficha.idPaciente}</td>
                                        <td className="fila">
                                            <div className="row">
                                                <div className="col-md-2 offset-md-1">
                                                    <button type="button" className="button-filter mx-auto rounded" onClick={() => handleFichas(ficha.idPaciente)} title="Visualizar expediente psicologico">
                                                        <i class="lni lni-folder"></i>
                                                    </button>
                                                </div>
                                                <div className="col-md-2 offset-md-1">
                                                    <button type="button" className="button-filter mx-auto rounded" onClick={() => handleModal(ficha)} title="Agregar nota de evolución">
                                                        <i class="lni lni-add-files"></i>
                                                    </button>
                                                </div>
                                                <div className="col-md-2 offset-md-1">
                                                    <button type="button" className="button-filter mx-auto rounded" onClick={() => handleNotas(ficha.idPaciente)} title="Visualizar notas de evolución">
                                                        <i class="lni lni-empty-file"></i>
                                                    </button>
                                                </div>
                                            </div>
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
                    {[...Array(Math.ceil(fichas.length / itemsPerPage)).keys()].map(number => (
                        <button key={number} onClick={() => paginate(number + 1)} className="page-link button-pagination rounded">
                            {number + 1}
                        </button>
                    ))}
                </div>
                {showModal && <FormEvoluciónPsicoNiño estado={true} datos={selectedData} handleCloseModal={handleCloseModal} />}
            </div>
        </>
    )
}

