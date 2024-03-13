import { useContext, useState, useEffect } from "react";
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider";
import { getAllUsuarios } from "../../services/Recepcionista"


export function FormEvento({ onSubmit, register, usuarioSelect }) {
  const { authTokens } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);

  
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        await setToken(authTokens.access);
        const usuariosData = await getAllUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

 

  

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 mt-5">
          <div className="col-md-10 offset-md-1 text-center mt-5">
            <hr />
            <h3 className="title">CREAR EVENTO</h3>
            <hr />
          </div>
          

          

          <form className="row g-3" onSubmit={onSubmit}>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="usuariosSelect" className="form-label">
              ¿Quién creará el evento?
            </label>
            <select
              id="usuariosSelect"
              {...register("idUsuario", { required: true })}
              className="form-select"
            >
              <option value="">Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {`${usuario.first_name} ${usuario.last_name}`}
                </option>
              ))}
            </select>
          </div>

            <div className="col-md-9 offset-md-1">
              <label htmlFor="evento" className="form-label">
                Nombre del evento:
              </label>
              <input
                type="text"
                id="evento"
                name="nom_evento"
                className="form-control"
                placeholder="Nombre del Evento"
                {...register("nom_evento", { required: true })}
              />
            </div>

            <div className="col-md-2 offset-md-1">
              <label htmlFor="fecha" className="form-label">
                Fecha del evento:
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                {...register("fecha", { required: true })}
                className="form-control"
              />
            </div>

            <div className="col-md-2 offset-md-1">
              <label htmlFor="hora" className="form-label">
                Hora del evento:
              </label>
              <input
                type="time"
                id="hora"
                name="hora"
                {...register("hora", { required: true })}
                className="form-control"
              />
            </div>

            <div className="col-md-9 offset-md-1">
              <label htmlFor="ubicacion" className="form-label">
                Lugar del evento:
              </label>
              <input
                type="text"
                placeholder="Lugar"
                id="ubicacion"
                name="Ubicación"
                {...register("lugar", { required: true })}
                className="form-control"
              />
            </div>

            <div className="col-md-9 offset-md-1">
              <label htmlFor="descripcion" className="form-label">
                Descripcion del evento:
              </label>
              <textarea
                placeholder="Deescipción del evento"
                id="descripcion"
                name="descripcion"
                {...register("descripcion", { required: false })}
                className="form-control"
              ></textarea>
            </div>

            <div className="col-md-5 offset-1 mt-4 mb-4">
              <button className="button-guardar">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
