import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { BarraDeBusqueda } from "./Buscar-Paciente/BarraDeBusqueda";
import { ListaDeResultados } from "./Buscar-Paciente/ListaDeResultados";

export function Header() {
  const { user, logout } = useContext(AuthContext);
  const [resultados, setResultados] = useState([]);


  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <img
                    src="/images/logo-1.png"
                    alt="Logo-coatza"
                    width="130"
                    height="35"
                    className="d-inline-block align-text-top"
                  />
                </li>

                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={logout}>
                        Logout
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/crearUsuario">
                        Crear Usuario
                      </Link>
                    </li>

                    

                    {user.idRol_id === 1 ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/homePsicologia">
                            Home Psicologia
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/registrar_historianutricion">
                            Historia nutrición
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/registrar_fichapsiniño">
                            Ficha psicologica niño
                          </Link>
                        </li>

                        
                      </>
                    ) : user.idRol_id === 2 ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/homeRecepcionista">
                            Home recepcinista
                          </Link>
                        </li>

                        <li className="nav-item">
                      <Link className="nav-link" to="/registrarpaciente">
                        Registrar Paciente
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/agendarcita">
                        Agendar cita
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/registrar_fichapsiadulto">
                        Ficha psicologica adulto
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/registrar_evento">
                       Registrar evento
                      </Link>
                    </li>

                    

                        <div className="dropdown">
                          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Más opciones
                          </button>
                          <ul className="dropdown-menu dropdown-menu-dark">
                          <li><Link className="dropdown-item" to="/buscar_paciente">Buscar paciente</Link></li>
                            <li><Link className="dropdown-item" to="/registrar_examenmedico">Examen medico</Link></li>
                            <li><Link className="dropdown-item" to="/registrar_evaluacionclinica">Evaluacion clinica</Link></li>
                            <li><Link className="dropdown-item" to="/calendario">Calendario</Link></li>
                          </ul>
                      </div>

                  
                      </>
                    ) : user.idRol_id === 3 ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/"></Link>
                        </li>
                      </>
                    ) : user.idRol_id === 4 ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/"></Link>
                        </li>
                      </>
                    ) : user.idRol_id === 5 ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/"></Link>
                        </li>
                      </>
                    ) : user.idRol_id === 6 ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/"></Link>
                        </li>
                      </>
                    ) : (
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          Default
                        </Link>
                      </li>
                    )}
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      H. Ayuntamiento de Coatzacoalcos 2022-2025
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            
            {user && (
  /* Barra de búsqueda */
  <form className="d-flex ms-auto">
    <BarraDeBusqueda setResultados={setResultados} />
  </form>
)}
          </div>
        </nav>
        <div
          aria-label="breadcrumb"
          style={{ backgroundColor: "#dedad0", height: "30px" }}
        >
          {user && <p className="fw-bold ml-3">Bienvenido {user.username}</p>}
        </div>
        <ListaDeResultados resultados={resultados} />
      </div>

      
      {!user && <div className="container ">
        <div className="text-with-lines">
          <div className="line line-top"></div>
          <p className="display-5 fw-bold mt-3">
            DIRECCIÓN DE SALUD MUNICIPAL PÚBLICA
          </p>
          <div className="line line-bottom"></div>
        </div>
      </div> }

    </>
  );
}
