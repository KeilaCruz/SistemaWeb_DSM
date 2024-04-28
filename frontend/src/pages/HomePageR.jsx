import { useContext} from "react";
import AuthContext from "../context/AuthProvider";
import { EventoHome } from "../components/Evento/EventoHome";
import { Calendario } from "../components/Calendario/Calendario";

export function HomePageR() {
  const { user } = useContext(AuthContext);

  

  return (
    <>
      <div className="d-flex justify-content-center">
        {user && <h1 className="fw-bold ml-3">Bienvenido {user.username}</h1>}
      </div>

      <div className="container-fluid">
        <div className="row g-3">

          <div className="col-md-9">
            <Calendario/>
          </div>

          <div className="col-md-3">
            <EventoHome/>
          </div>

        </div>
      </div>
    </>
  );
}
