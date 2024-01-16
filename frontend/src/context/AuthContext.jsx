import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export function AuthProvider({ children }) {

    const [authTokens, setAuthTokens] = useState( () =>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null )
    const [user, setUser] = useState(() =>  localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null )

    const navigate = useNavigate()

    const loginUser = async (e) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:8000/paciente/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        const data = await response.json()
       if (response.status === 200){
           setAuthTokens(data)
           setUser(jwtDecode(data.access))
           localStorage.setItem('authTokens', JSON.stringify(data))
           navigate('/home')
       }else{
           alert('Usuario o contraseña incorrectos')
       }

    }

    const logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

