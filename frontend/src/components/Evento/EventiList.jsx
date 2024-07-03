import { getAllEventos } from "../../services/Recepcionista";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export function EventoList() {
    const [eventos, setEventos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { authTokens } = useContext(AuthContext);
    const navigate = useNavigate()

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEventos = eventos.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNavigate = (idEvento) => {
        navigate(`/ver_evento/${idEvento}`);
    }

    useEffect(() => {
        async function loadEventos() {
            try {
                await setToken(authTokens.access);
                const response = await getAllEventos();
                // Ordenar los eventos por fecha en orden descendente
                const sortedEventos = response.sort((a, b) => new Date(b.datos_evento.fecha) - new Date(a.datos_evento.fecha));
                setEventos(sortedEventos);
            } catch (error) {
                console.error("Error al cargar los eventos:", error);
            }
        }
        loadEventos();
    }, [authTokens]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1 text-center">
                    <hr />
                    <h3 className="title">EVENTOS</h3>
                    <hr />
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row hidden-md-up">
                        <table className="table-bordered">
                            <thead className="cabecera">
                                <tr>
                                    <th className="colum">Nombre del Evento</th>
                                    <th className="colum">Fecha</th>
                                    <th className="colum">Hora</th>
                                    <th className="colum">Lugar</th>
                                    <th className="colum">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEventos.map(evento => (
                                    <tr key={evento.idEvento}>
                                        <td className="fila">{evento.datos_evento.nom_evento}</td>
                                        <td className="fila">{evento.datos_evento.fecha}</td>
                                        <td className="fila">{evento.datos_evento.hora}</td>
                                        <td className="fila">{evento.datos_evento.lugar}</td>
                                        <td className="fila">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleNavigate(evento.idEvento)}
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination mt-2 col-md-10 offset-md-1">
                        {[...Array(Math.ceil(eventos.length / itemsPerPage)).keys()].map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number + 1)}
                                className="page-link button-pagination rounded"
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


