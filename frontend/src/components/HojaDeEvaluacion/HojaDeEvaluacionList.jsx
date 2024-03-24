import { getAllHojasEvaluacion } from "../../services/DoctorGeneral";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { HojaDeEvaluacionCard } from "./HojaDeEvaluacionCard";
import {  getPaciente } from "../../services/Recepcionista";

export function HojaDeEvaluacionList() {
  const [evaluacionesOriginales, setEvaluacionesOriginales] = useState([]);
  const [evaluacionesFiltradas, setEvaluacionesFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { authTokens } = useContext(AuthContext);

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
  }, []);

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

  return (
    <div className="container-fluid">
      <div className=" col-md-3 offset-md-1">
        <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Buscar por nombre de paciente" aria-label="Search"/>
      </form>
      </div>
      
      <div className="py-3">
        <div className="container">
        {evaluacionesFiltradas.length === 0 && <p>No se encontraron resultados.</p>}
          <div className="row hidden-md-up">
            {evaluacionesFiltradas.map((evaluacion) => (
              <HojaDeEvaluacionCard
                key={evaluacion.idHojaClinica}
                evaluacion={evaluacion}
                paciente={evaluacion.paciente}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}