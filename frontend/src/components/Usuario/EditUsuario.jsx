import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";
import { editarUsuario } from "../../services/Recepcionista";

export function EditUsuario({ usuario }) {
  const { register, setValue, handleSubmit } = useForm();
  const { authTokens } = useContext(AuthContext);
  const [activateEdit, setActiEdit] = useState(false);

  const handleActivateEditar = () => {
    setActiEdit(!activateEdit);
  };

  useEffect(() => {
    async function loadInput() {
      try {
        setValue("first_name", usuario?.first_name || "");
        setValue("last_name", usuario?.last_name || "");
        setValue("email", usuario?.email || "");
        setValue("is_active", usuario?.is_active || "");
        setValue("second_last_name", usuario?.second_last_name || "");
        setValue("idRol", usuario?.idRol || "");
        setValue("username", usuario?.username || "");
        setValue("password", usuario?.password || '');
      } catch (error) {
        console.error("error al cargar input", error);
      }
    }
    loadInput();
  }, [usuario]);

  const onSubmit = handleSubmit(async (data) => {
    const usuarioData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      is_active: data.is_active,
      second_last_name: data.second_last_name,
      idRol: data.idRol,
      username: data.username,
      password: data.password,
    };

    try {
      await setToken(authTokens.access);
      const response = await editarUsuario(usuario.id, usuarioData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 mt-2">
          <div className="text-with-lines">
            <div className="line line-top"></div>
            <p className="display-5 fw-bold">REGISTRO DE USUARIO</p>
            <div className="line line-bottom"></div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="col-md-9 offset-md-1">
              <label htmlFor="nombre" className="form-label">
                Nombre(s):
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                className="form-control"
                disabled={true}
                {...register("first_name", { required: true })}
              />
            </div>

            <div className="col-md-9 offset-md-1">
              <label htmlFor="apellido" className="form-label">
                Apellido paterno:
              </label>

              <input
                type="text"
                name="apellido"
                id="apellido"
                placeholder="Apellido"
                className="form-control"
                disabled={true}
                {...register("last_name", { required: true })}
              />
            </div>

            <div className="col-md-9 offset-md-1">
              <label htmlFor="segundoApellido" className="form-label">
                Apellido materno:
              </label>

              <input
                type="text"
                name="segundoApellido"
                id="segundoApellido"
                placeholder="segundo Apellido"
                className="form-control"
                disabled={true}
                {...register("second_last_name", { required: true })}
              />
            </div>

            <div className="col-md-4 offset-md-1">
              <label htmlFor="correo" className="form-label">
                Correo electronico:
              </label>

              <input
                type="email"
                name="correo"
                id="correo"
                placeholder="Correo"
                {...register("email", { required: true })}
                className="form-control"
                disabled={!activateEdit}
              />
            </div>

            <div className="col-md-4 offset-md-1">
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="estado"
                  id="estado"
                  {...register("is_active", { required: false })}
                  className="form-check-input"
                  disabled={!activateEdit}
                />
              </div>
            </div>

            <div className="col-md-2 offset-md-1 ">
              <label htmlFor="rol" className="form-label">
                Selecciona un rol:
              </label>

              <select
                name="rol"
                id="rol"
                {...register("idRol", { required: true })}
                className="form-select"
                disabled={!activateEdit}
              >
                <option value={1}>Psicologo</option>
                <option value={2}>Recepcionista</option>
                <option value={3}>Medico General</option>
                <option value={4}>Odontologo</option>
                <option value={5}>Nutriologo</option>
              </select>
            </div>

            <div className="col-md-2 offset-md-1">
              <label htmlFor="username" className="form-label">
                nombre de usuario:
              </label>

              <input
                type="text"
                name="username"
                id="username"
                placeholder="Nombre de usuario"
                {...register("username", { required: true })}
                className="form-control"
                disabled={!activateEdit}
              />
            </div>

            <div className="col-md-2 offset-md-1">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                {...register("password", { required: true })}
                className="form-control"
                disabled={!activateEdit}
              />
            </div>
           
            {activateEdit && (
                        <div className="col-md-5 offset-1 mt-4 mb-4">
                            <button className="btn btn-success">Guardar</button>
                        </div>
                    )}
        </form>

        {!activateEdit && (
                        <div className="col-md-5 offset-1 mt-4 mb-4">
                            <button className="btn btn-primary"  onClick={handleActivateEditar}>Editar</button>
                        </div>
                    )}
        </div>
      </div>
    </>
  );
}
