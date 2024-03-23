import { getAllExamenes } from "../../services/DoctorGeneral";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { ExamenMedicoCard } from "./ExamenMedicoCard";
import { getPaciente } from "../../services/Recepcionista";


export function ExamenMedicoList() {

    const [examenes, setExamenes] = useState([]);
    const { authTokens } = useContext(AuthContext);
  
    useEffect(() => {
      async function loadExamenes() {
        try {
          await setToken(authTokens.access);
          const examenesData = await getAllExamenes();
  
          const examenesConPaciente = await Promise.all(
            examenesData.map(async (examen) => {
              // Obtener datos del paciente usando la llave foránea idPaciente
              const pacienteData = await getPaciente(examen.idPaciente);
              // Agregar datos del paciente al examen
              return { ...examen, paciente: pacienteData };
            })
          );
  
          // Establecer las evaluaciones en el estado, incluyendo los datos del paciente
          setExamenes(examenesConPaciente);
        } catch (error) {
          console.error("Error al cargar los examenes:", error);
        }
      }
      loadExamenes();
    }, []);



  return (
    <div className="container-fluid">

        

        <div className="py-3">
        <div className="container">
          <div className="row hidden-md-up">
          {examenes.map((examen) => (
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
    
  );
  
}

