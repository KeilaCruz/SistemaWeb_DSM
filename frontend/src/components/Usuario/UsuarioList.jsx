import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../services/HeaderAuthorization';
import { getAllUsuarios } from '../../services/Recepcionista';
import AuthContext from '../../context/AuthProvider';

export function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
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

        <div className="offset-md-1">

        <div className=" col-md-5 offset-md-3 mb-2">
            <input
            type="text"
            placeholder="Buscar por nombre"
            className='form-control me-2'
            value={busqueda}
            onChange={handleBuscar}
          />
        </div>
          
          <table>
            <thead className="cabecera">
              <tr>
                <th className="colum">Nombre</th>
                <th className="colum">Email</th>
                <th className="colum">Username</th>
                <th className="colum">Estado</th>
                <th className="colum">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="fila">
                    {usuario.first_name} {usuario.last_name}{' '}
                    {usuario.second_last_name}
                  </td>
                  <td className="fila">{usuario.email}</td>
                  <td className="fila">{usuario.username}</td>
                  <td className="fila">
                    {usuario.is_active ? 'Activo' : 'Inactivo'}
                  </td>
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

