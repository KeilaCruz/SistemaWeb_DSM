import { getAllExamenes } from "../../services/DoctorGeneral";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getPaciente } from "../../services/Recepcionista";
import { getReporteExamenMedico } from "../../services/Reportes";


export function ExamenMedicoList() {
  const [examenesOriginales, setExamenesOriginales] = useState([]);
  const [examenesFiltrados, setExamenesFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExamenes = examenesFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function loadExamenes() {
      try {
        await setToken(authTokens.access);
        const examenesData = await getAllExamenes();
        const examenesConPaciente = await Promise.all(
          examenesData.map(async (examen) => {
            const pacienteData = await getPaciente(examen.idPaciente);
            return { ...examen, paciente: pacienteData };
          })
        );
        // Ordenar los exámenes por fecha en orden descendente
        const sortedExamenes = examenesConPaciente.sort((a, b) => new Date(b.fecha_revision) - new Date(a.fecha_revision));
        setExamenesOriginales(sortedExamenes);
        setExamenesFiltrados(sortedExamenes);
      } catch (error) {
        console.error("Error al cargar los exámenes:", error);
      }
    }
    loadExamenes();
  }, [authTokens]);

  const searchExamenes = () => {
    const filteredExamenes = examenesOriginales.filter(examen => {
      const nombreCompleto = `${examen.paciente.datos_personales.nombre} ${examen.paciente.datos_personales.apePaterno} ${examen.paciente.datos_personales.apeMaterno}`;
      return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setExamenesFiltrados(filteredExamenes);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setExamenesFiltrados(examenesOriginales);
    } else {
      searchExamenes();
    }
  }, [searchTerm]);

  const handleNavigate = (idExamenMedico) => {
    navigate(`/ver_examenMedico/${idExamenMedico}`);
  };
  const handleDownloadExamenMedico = async () => {
    await setToken(authTokens.access)
    await getReporteExamenMedico();
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
          <button type="button" className="btn rounded btn-success" onClick={handleDownloadExamenMedico}>
            <i class="lni lni-download"> Descargar excel</i>
          </button>
        </div>
        <div className="py-3">
          <div className="container">
            {examenesFiltrados.length === 0 && <p>No se encontraron resultados.</p>}
            <div className="row hidden-md-up">
              <table className="table-bordered">
                <thead className="cabecera">
                  <tr>
                    <th className="colum">Nombre del Paciente</th>
                    <th className="colum">Fecha de Examen</th>
                    <th className="colum">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExamenes.map((examen) => (
                    <tr key={examen.id}>
                      <td className="fila">
                        {`${examen.paciente.datos_personales.nombre} ${examen.paciente.datos_personales.apePaterno} ${examen.paciente.datos_personales.apeMaterno}`}
                      </td>
                      <td className="fila">{examen.fecha_revision}</td>
                      <td className="fila">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleNavigate(examen.idExamenMedico)}
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
              {[...Array(Math.ceil(examenesFiltrados.length / itemsPerPage)).keys()].map(number => (
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