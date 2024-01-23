import { useContext } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthProvider";
export function Login() {
    const { login, logout } = useContext(AuthContext);
    const navigate = useNavigate("")
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await login(data)
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    })
    const cerrarSesion = async () => {
        await logout()
    }
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="username" id="username" placeholder="Enter username" {...register("username", { required: true })} />
                    <input type="password" name="password" id="password" placeholder="Enter password" {...register("password", { required: true })} />
                    <input type="submit" />
                </form>
                <button onSubmit={cerrarSesion}>Cerrar</button>
            </div>
        </>
    )
}
