import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../services/HeaderAuthorization";
import { getAllUsuarios } from "../../services/Recepcionista";
import AuthContext from "../../context/AuthProvider";

export function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    async function loadUsuario() {
      await setToken(authTokens.access);
      const response = await getAllUsuarios();
      setUsuarios(response);
    }
    loadUsuario();
  }, []);

  const handleUsuario = (idUsuario) => {
    navigate(`/ver_usuario/${idUsuario}`);
  };

  const handleBuscar = (event) => {
    setBusqueda(event.target.value);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.first_name} ${usuario.last_name} ${usuario.second_last_name}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const getRol = (idRol) => {
    switch (idRol) {
      case 1:
        return "Psicologo";
      case 2:
        return "Recepcionista";
      case 3:
        return "Medico General";
      case 4:
        return "Odontologo";
      case 5:
        return "Nutriologo";
      case 6:
        return "Auxiliar";
      case 7:
        return "Director";
      default:
        return "Desconocido";
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1 text-center ">
            <hr />
            <h3 className="title">USUARIOS EXISTENTES</h3>
            <hr />
          </div>
        </div>

        <div>
          <div className=" col-md-5 offset-md-3 mb-2">
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="form-control me-2"
              value={busqueda}
              onChange={handleBuscar}
            />
          </div>

          <table className="table-bordered">
            <thead className="cabecera">
              <tr>
                <th className="columv3">Nombre</th>
                <th className="columv3">Email</th>
                <th className="columv3">Username</th>
                <th className="columv3">Estado</th>
                <th className="columv3">Rol</th>
                <th className="columv3">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="fila">
                    {usuario.first_name} {usuario.last_name}{" "}
                    {usuario.second_last_name}
                  </td>
                  <td className="fila">{usuario.email}</td>
                  <td className="fila">{usuario.username}</td>
                  <td className="fila">
                    {usuario.is_active ? "Activo" : "Inactivo"}
                  </td>
                  <td className="fila">{getRol(usuario.idRol)}</td>
                  <td className="fila">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUsuario(usuario.id)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
