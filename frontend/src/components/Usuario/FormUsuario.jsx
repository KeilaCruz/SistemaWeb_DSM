import { useContext, useState, useEffect } from "react";
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider";

export function FormUsuario({ onSubmit, register }) {
  const { authTokens } = useContext(AuthContext);

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 mt-2">
         
        <div className="text-with-lines">
            <div className="line line-top"></div>
            <p className="display-5 fw-bold">REGISTRO USUARIOS</p>
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
                {...register("first_name", { required: true })}
                className="form-control"
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
                {...register("last_name", { required: true })}
                className="form-control"
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
                {...register("second_last_name", { required: true })}
                className="form-control"
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
                  {...register("is_active", { required: true })}
                  className="form-check-input"
                />
              </div>
            </div>

                <div className="col-md-2 offset-md-1 " >
                <label htmlFor="rol" className="form-label">Selecciona un rol:</label>

                     <select
              name="rol"
              id="rol"
              {...register("idRol", { required: true })}
              className="form-select"

            >
              <option value={1}>Psicologo</option>
              <option value={2}>Recepcionista</option>
            </select>
                </div>
           

            <div className="col-md-2 offset-md-1">
            <label htmlFor="username" className="form-label">nombre de usuario:</label>

                <input
              type="text"
              name="username"
              id="username"
              placeholder="Nombre de usuario"
              {...register("username", { required: true })}
              className="form-control"
            />
            </div>
            

            <div className="col-md-2 offset-md-1" >
            <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
              className="form-control"
            />
            </div>
            

            <div className="col-md-5 offset-1 mt-4 mb-4">
              <button className="button-guardar btn btn-success">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
