import { createContext, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [authTokens, setAuthTokens] = useState(() => JSON.parse(localStorage.getItem("authTokens")) || null)
    const [user, setUser] = useState(() => (authTokens ? jwtDecode(authTokens.access) : null))
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const login = async (usuario) => {
        try {
            const { data } = await axios.post("http://127.0.0.1:8000/api/iniciosesion", usuario)
            console.log(data)
            setAuthTokens(data);
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate("/home")
        } catch (error) {
            console.error("Error al iniciar sesion", error)
            alert("No se inicio sesion");
        }
    }
    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    }
    const contextData = {
        authTokens,
        user,
        login,
        logout,
    }
    return (
        <>
            <AuthContext.Provider value={contextData}>
                {loading ? null : children}
            </AuthContext.Provider>
        </>
    )
}

