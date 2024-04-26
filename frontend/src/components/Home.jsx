import { CalendarioHome } from "./Calendario/CalendarioHome"
import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

export function Home() {
    const { user } = useContext(AuthContext);

    return (
        <>
    <div className="d-flex justify-content-center">
     {user && <h1 className="fw-bold ml-3">Bienvenido {user.username}</h1>}
     </div>
     
    
    <CalendarioHome especialidad={'Psicologia'}/>
        </>
    )
}

