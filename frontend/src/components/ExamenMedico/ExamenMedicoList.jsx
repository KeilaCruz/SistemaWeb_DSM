import { getAllExamenes } from "../../services/DoctorGeneral";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { ExamenMedicoCard } from "./ExamenMedicoCard";
import { getPaciente } from "../../services/Recepcionista";

export function ExamenMedicoList() {
  const [examenesOriginales, setExamenesOriginales] = useState([]);
  const [examenesFiltrados, setExamenesFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { authTokens } = useContext(AuthContext);

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

        setExamenesOriginales(examenesConPaciente);
        setExamenesFiltrados(examenesConPaciente);
      } catch (error) {
        console.error("Error al cargar los exámenes:", error);
      }
    }
    loadExamenes();
  }, []);

  useEffect(() => {
    const searchExamenes = () => {
      const filteredExamenes = examenesOriginales.filter((examen) => {
        const nombreCompleto = `${examen.paciente.datos_personales.nombre} ${examen.paciente.datos_personales.apePaterno} ${examen.paciente.datos_personales.apeMaterno}`;
        return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setExamenesFiltrados(filteredExamenes);
    };

    if (searchTerm === "") {
      setExamenesFiltrados(examenesOriginales);
    } else {
      searchExamenes();
    }
  }, [searchTerm, examenesOriginales]);

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

        <div className="py-3">
          <div className="container">
            {examenesFiltrados.length === 0 && (
              <p>No se encontraron resultados.</p>
            )}
            <div className="row hidden-md-up">
              {examenesFiltrados.map((examen) => (
                <ExamenMedicoCard
                  key={examen.idExamenMedico}
                  examen={examen}
                  paciente={examen.paciente}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
