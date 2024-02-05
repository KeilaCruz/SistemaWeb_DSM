import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

export function Header() {
    const {user, logout} = useContext(AuthContext);

    return (
        <>
        
{user ? (
  <>
    <a onClick={logout}>Logout</a>
    <span> | </span>
    <Link to="/crearUsuario">Crear Usuario</Link>
    <span> | </span>
    {user.idRol_id === 1 ? (
      <>
        <Link to="/homePsicologia">HomePage Psicologia</Link>
        <span> | </span>
        <Link to="/otraPagina">Otra Página para Rol 1</Link>
      </>
    ) : user.idRol_id === 2 ? (
      <Link to="/homeRecepcionista">HomePage Recepcionista</Link>
    ) : user.idRol_id === 3 ? (
      <>
        <Link to="/homeRol3Pagina1">Página 1 para Rol 3</Link>
        <Link to="/homeRol3Pagina2">Página 2 para Rol 3</Link>
      </>
    ) : user.idRol_id === 4 ? (
      <Link to="/homeRol4">HomePage para Rol 4</Link>
    ) : user.idRol_id === 5 ? (
      <Link to="/homeRol5">HomePage para Rol 5</Link>
    ) : user.idRol_id === 6 ? (
      <>
        <Link to="/homeRol6Pagina1">Página 1 para Rol 6</Link>
        <Link to="/homeRol6Pagina2">Página 2 para Rol 6</Link>
      </>
    ) : (
      <Link to="/homeOtroRol">HomePage Otro Rol</Link>
    )}
  </>
) : (
  <Link to="/login">Login</Link>
)}



        
       

        {user &&  <p>Hello {user.username}</p>}


        </>
    )
}

