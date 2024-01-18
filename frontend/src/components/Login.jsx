import { useContext } from "react"
import AuthContext from "../context/AuthProvider"
import axios from "axios"
import { useForm } from "react-hook-form";

const LOGIN_URL = "http://127.0.0.1:8000/api/iniciosesion"
export function Login() {
    const { setAuth } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await axios.post(LOGIN_URL, data, { headers: { 'Content-Type': 'application/json' } });
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.token_access;
            setAuth({ accessToken })
        } catch (error) {
            console.error(error)
        }
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

