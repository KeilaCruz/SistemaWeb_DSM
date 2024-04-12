import { getAllEventos } from "../../services/Recepcionista";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { EventoCard } from "./EventoCard";

export function EventoList() {

    const [eventos, setEventos] = useState([]);
    const { authTokens } = useContext(AuthContext);
  
    useEffect(() => {
      async function loadEventos() {
        try {
          await setToken(authTokens.access);
          const response = await getAllEventos();
          setEventos(response)
  
        
        } catch (error) {
          console.error("Error al cargar los eventos:", error);
        }
      }
      loadEventos();
    }, []);



  return (
    <div className="container-fluid">

        

        <div className="py-3">
        <div className="container">
          <div className="row hidden-md-up">
          {eventos.map((evento) => (
              <EventoCard
              key={evento.idEvento}
                evento={evento}
              />
          ))}
          </div>
        </div>
      </div>

      </div>
    
  );
  
}

