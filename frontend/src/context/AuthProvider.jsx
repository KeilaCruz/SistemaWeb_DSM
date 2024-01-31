import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { jwtDecode } from "jwt-decode"

const LOGIN_URL = "http://127.0.0.1:8000/api/iniciosesion"
const UPDATE_TOKEN_URL = "http://127.0.0.1:8000/api/actualizartoken"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //almacenar token access y refresh en el localStorage
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens')
        return storedTokens ? JSON.parse(storedTokens) : null
    })
    //establecer la información decodificada apartir del token access
    const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access) : null)
    const [loading, setLoading] = useState(true);

    const login = async (usuario) => {
        try {
            const response = await axios.post(LOGIN_URL, usuario, { headers: { 'Content-Type': 'application/json' } });
            if (response.status === 200) {
                //console.log(response.data)
                setAuthTokens(response.data)
                setUser(jwtDecode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                //console.log(localStorage.getItem('authTokens'))
                //console.log("hOLA", user.username)
            } else {
                alert("Fallo al iniciar sesion")
            }
        } catch (error) {
            console.error("Error al conectar", error)
        }
    }

    const logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    const updateToken = async () => {
        try {
            const response = await axios.post(UPDATE_TOKEN_URL, { refresh: authTokens?.refresh }, { headers: { 'Content-type': 'application/json' } })
            if (response.status === 200) {
                console.log("Actualizacion", response.data)
                setAuthTokens(response.data)
                setUser(jwtDecode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
            } else {
                logout()
            }
        } catch (error) {
            console.error("Error al actualizar el token", error)
            logout()
        }
        if (loading) {
            setLoading(false);
        }
    }
    //Tiempo establecido en donde el token tiene que actualizarse en la sesion
    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;

        const intervalo = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(intervalo);
    }, [authTokens, loading]);
    const contextData = {
        user,
        authTokens,
        login,
        logout,
    }
    return (<AuthContext.Provider value={contextData}>
        {loading ? null : children}
    </AuthContext.Provider>)
}

export default AuthContext;

