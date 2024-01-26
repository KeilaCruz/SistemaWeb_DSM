import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext()

export default AuthContext;


export function AuthProvider({ children }) {

    //alamacenar el token en el local storage
    const [authTokens, setAuthTokens] = useState( () =>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null )

    // The initial value is determined by checking if 'authTokens' exist in the local storage.
    // If 'authTokens' exist, decode them using 'jwtDecode' and set it as the initial value.
    const [user, setUser] = useState(() =>  localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null )

    const [loading, setLoading] = useState(true) 

    const navigate = useNavigate()

        const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
            'http://localhost:8000/paciente/api/token/',
            {
                username: e.target.username.value,
                password: e.target.password.value,
            },
            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
            );

            const data = response.data;

            if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/home');
            } else {
            alert('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Puedes manejar el error de la manera que desees
            alert('Error durante el inicio de sesión');
        }
        };


    const updateTokens = async () =>{

        console.log('updating tokens')
        const response = await fetch('http://localhost:8000/paciente/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: authTokens?.refresh || '' })
        })
        const data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if (loading){
            setLoading(false)
        }
    }

    useEffect(() => {

        if (loading){
            updateTokens()
        }

        const refreshTime = 1000 * 60 * 4
        const interval = setInterval(()=>{
            if (authTokens){
                updateTokens()
            }
        }, refreshTime) //tiempo en el que sera llamado el updateTokens
        return () => clearInterval(interval)
        
    }, [authTokens, loading])



    const logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

