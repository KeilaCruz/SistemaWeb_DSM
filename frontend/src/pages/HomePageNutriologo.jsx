import { CalendarioHome } from "../components/Calendario/CalendarioHome";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { EventoHome } from "../components/Evento/EventoHome";

export function HomePageNutriologo() {
    const { user } = useContext(AuthContext);
  return (
    <>
    <div className="d-flex justify-content-center">
     {user && <h1 className="fw-bold ml-3">Bienvenido {user.username}</h1>}
     </div>

     <div className="container-fluid">
        <div className="row g-3">

          <div className="col-md-9">
            <CalendarioHome especialidad={'Nutricion'}/>
          </div>

          <div className="col-md-3">
            <EventoHome/>
          </div>

        </div>
      </div>
     
    
    
        </>
  )
}

