import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate("");
  const { register, handleSubmit } = useForm();

  // Utiliza un useEffect para observar cambios en el contexto y redirigir cuando sea necesario
  useEffect(() => {
    if (user && user.idRol_id) {
      switch (user.idRol_id) {
        case 1:
          navigate("/homePsicologia");
          break;
        case 2:
          navigate("/homeRecepcionista");
          break;
        // Agrega más casos según los roles que tengas
        default:
          navigate("/homeOtroRol");
      }
    }
  }, [user, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data);
      // No necesitas realizar la redirección aquí, el useEffect lo manejará cuando la información esté disponible
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <div>
      {/* Img grande de la página */}
      <section className="main ">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="/images/LogoBarco.png"
                className="img-fluid img-thumbnail"
                alt="Sample image"
              />
            </div>

            {/* Formulario */}
            <div
              className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 "
              
            >
              <form onSubmit={onSubmit}>
                <div className="divider d-flex align-items-center my-2">
                  <p className="text-center fw-bold mx-2  display-4">
                    Inicio de sesión
                  </p>
                </div>

                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label fw-bold" htmlFor="username">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    maxLength="150"
                    required=""
                    id="username"
                    className="form-control form-control-lg border-3"
                    placeholder="Ingrese usuario"
                    {...register("username", { required: true })}
                  />
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label fw-bold" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    required=""
                    id="password"
                    className="form-control form-control-lg border-3"
                    placeholder="Ingrese contraseña"
                    {...register("password", { required: true })}
                  />
                </div>
                {/* Recuperar contraseña */}
                <div className="d-flex justify-content-between align-items-center">
                  <a href="#!" className="text-body">
                    Recuperar contraseña
                  </a>
                </div>

                <div className="text-center text-lg-start mt-2 pt-2">
                  <button
                    type="submit"
                    className="btn btn-lg btn-danger button-login">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </div>
    </>
  );
}
