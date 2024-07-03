import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { visualizarHistorias } from "../../services/Nutriologo"

export function VisualizarHistoriasNutricion() {
    const [historias, setHistorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { authTokens } = useContext(AuthContext);
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
        }
        loadHistorias()
    }, [])

    const handleHistorias = (idPaciente) => {
        navigate(`/historia_nutricion/${idPaciente}`)
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
                </div>
                <div className='col-md-9 offset-md-1'>
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
                                        <button type="button" className="button-filter rounded" onClick={() => handleHistorias(historia.idPaciente)}>
                                            <i class="lni lni-weight"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

