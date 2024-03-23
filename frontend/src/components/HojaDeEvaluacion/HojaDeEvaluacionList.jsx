import { getAllHojasEvaluacion } from "../../services/DoctorGeneral";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { HojaDeEvaluacionCard } from "./HojaDeEvaluacionCard";
import {  getPaciente } from "../../services/Recepcionista";

export function HojaDeEvaluacionList() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    async function loadEvaluaciones() {
      try {
        await setToken(authTokens.access);
        const evaluacionesData = await getAllHojasEvaluacion();

        // Obtener datos de pacientes relacionados con cada hoja de evaluación
        const evaluacionesConPacientes = await Promise.all(
          evaluacionesData.map(async (evaluacion) => {
            // Obtener datos del paciente usando la llave foránea idPaciente
            const pacienteData = await getPaciente(evaluacion.idPaciente);
            // Agregar datos del paciente a la evaluación
            return { ...evaluacion, paciente: pacienteData };
          })
        );

        // Establecer las evaluaciones en el estado, incluyendo los datos del paciente
        setEvaluaciones(evaluacionesConPacientes);
      } catch (error) {
        console.error("Error al cargar las evaluaciones:", error);
      }
    }
    loadEvaluaciones();
  }, []);

  return (
    
      <div className="container-fluid">

        

        <div className="py-3">
        <div className="container">
          <div className="row hidden-md-up">
          {evaluaciones.map((evaluacion) => (
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
