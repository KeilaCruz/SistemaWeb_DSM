import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getPaciente } from "../../services/Recepcionista";
import { getAllHojasEvaluacion } from "../../services/DoctorGeneral";
import { setToken } from "../../services/HeaderAuthorization";
import { getReporteHojasEvaluacion } from "../../services/Reportes";

export function HojaDeEvaluacionList() {
  const [evaluacionesOriginales, setEvaluacionesOriginales] = useState([]);
  const [evaluacionesFiltradas, setEvaluacionesFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvaluaciones = evaluacionesFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function loadEvaluaciones() {
      try {
        await setToken(authTokens.access);
        const evaluacionesData = await getAllHojasEvaluacion();
        const evaluacionesConPacientes = await Promise.all(
          evaluacionesData.map(async (evaluacion) => {
            const pacienteData = await getPaciente(evaluacion.idPaciente);
            return { ...evaluacion, paciente: pacienteData };
          })
        );
        setEvaluacionesOriginales(evaluacionesConPacientes);
        setEvaluacionesFiltradas(evaluacionesConPacientes);
      } catch (error) {
        console.error("Error al cargar las evaluaciones:", error);
      }
    }
    loadEvaluaciones();
  }, [authTokens]);

  const searchEvaluaciones = () => {
    const filteredEvaluaciones = evaluacionesOriginales.filter(evaluacion => {
      const nombreCompleto = `${evaluacion.paciente.datos_personales.nombre} ${evaluacion.paciente.datos_personales.apePaterno} ${evaluacion.paciente.datos_personales.apeMaterno}`;
      return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setEvaluacionesFiltradas(filteredEvaluaciones);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setEvaluacionesFiltradas(evaluacionesOriginales);
    } else {
      searchEvaluaciones();
    }
  }, [searchTerm]);

  const handleNavigate = (idHojaClinica) => {
    navigate(`/ver_evaluacionClinica/${idHojaClinica}`);
  };

  const handleDownloadHojaEvaluacion = async () => {
    await setToken(authTokens.access)
    await getReporteHojasEvaluacion()
  }
  return (
    <div className="container-fluid">
      <div className="row g-3">
        <div className="col-md-5 offset-md-3">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre de paciente"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn rounded btn-success" onClick={handleDownloadHojaEvaluacion}>
            <i class="lni lni-download"> Descargar excel</i>
          </button>
        </div>
        <div className="py-3">
          <div className="container">
            {evaluacionesFiltradas.length === 0 && <p>No se encontraron resultados.</p>}
            <div className="row hidden-md-up">
              <table className="table-bordered">
                <thead className="cabecera">
                  <tr>
                    <th className="colum">Nombre del Paciente</th>
                    <th className="colum">Fecha de Evaluación</th>
                    <th className="colum">Nota medica</th>
                    <th className="colum">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvaluaciones.map((evaluacion) => (
                    <tr key={evaluacion.id}>
                      <td className="fila">
                        {`${evaluacion.paciente.datos_personales.nombre} ${evaluacion.paciente.datos_personales.apePaterno} ${evaluacion.paciente.datos_personales.apeMaterno}`}
                      </td>
                      <td className="fila">{evaluacion.fecha_revision}</td>
                      <td className="fila">{evaluacion.nota_medica}</td>
                      <td className="fila">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleNavigate(evaluacion.idHojaClinica)}
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
              {[...Array(Math.ceil(evaluacionesFiltradas.length / itemsPerPage)).keys()].map(number => (
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
    </div>
  );
}
