import { useContext, useState } from "react";
import { searchUsuario } from "../../services/Recepcionista";
import { UsuarioCard } from "../Usuario/UsuarioCard";
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider";

export function FormEvento({ onSubmit, register, usuarioSelect }) {
  const { authTokens } = useContext(AuthContext);
  const [usuario, setUsuario] = useState([]);
  const [criterio, setCriterio] = useState("");

  const handleBarraBusqueda = (evt) => {
    setCriterio(evt.target.value);
  };

  const handleBuscarUsuario = async () => {
    try {
      await setToken(authTokens.access);
      const data = await searchUsuario(criterio);
      setUsuario(data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectUsuario = (id) => {
    usuarioSelect(id);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 mt-5">
          <div className="col-md-10 offset-md-1 text-center mt-5">
            <hr />
            <h3 className="title">CREAR EVENTO</h3>
            <hr />
          </div>
          <div>
            <div className="row">
              <div className="col-md-6 offset-1">
                <input
                  className="form-control input-form"
                  type="text"
                  id="busqueda_usuario"
                  placeholder="Nombre del creador del evento"
                  onChange={handleBarraBusqueda}
                />
              </div>
              <div className="col-md-3 mt-1">
                <button onClick={handleBuscarUsuario} className="button-buscar">
                  Buscar
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-9 offset-1">
    {Array.isArray(usuario) && usuario.length > 0 ? (
        usuario.map((user) => (
            <UsuarioCard
                usuario={user}
                key={user.id}
                handleSelect={selectUsuario}
            />
        ))
    ) : (
        <p>No hay usuarios para mostrar.</p>
    )}
</div>

          <form className="row g-3" onSubmit={onSubmit}>
            {/* Todo el cuerpo del formulario */}
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
