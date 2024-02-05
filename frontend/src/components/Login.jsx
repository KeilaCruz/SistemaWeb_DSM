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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            {...register("username", { required: true })}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
