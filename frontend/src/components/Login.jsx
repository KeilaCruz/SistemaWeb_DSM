import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useForm } from "react-hook-form";

export function Login() {
    const { login } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        await login(data)
    })
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="username" id="username" placeholder="Enter username" {...register("username", { required: true })} />
                    <input type="password" name="password" id="password" placeholder="Enter password" {...register("password", { required: true })} />
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

