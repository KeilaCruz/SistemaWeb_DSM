import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
          <div className="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
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

                    <li className="nav-item">
                      <Link className="nav-link" to="/buscar_paciente">
                        Buscar paciente
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/calendario">
                        Calendario
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/registrar_evaluacionclinica">
                        Evaluacion clinica
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/registrar_examenmedico">
                        Examen Medico
                      </Link>
                    </li>

                  
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
          </div>
        </nav>
        <div
          aria-label="breadcrumb"
          style={{ backgroundColor: "#dedad0", height: "30px" }}
        >
          {user && <p className="fw-bold ml-3">Bienvenido {user.username}</p>}
        </div>
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
