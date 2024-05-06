import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { EditUsuario } from "./EditUsuario"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { getUsuario } from "../../services/Recepcionista"

export function ViewUsuario() {
  const { authTokens } = useContext(AuthContext)
  const [usuario, setUsuario] = useState({})
  const {id} = useParams()

  //Cargar el objeto que se manda al componente del form para cargar input
  useEffect(() => {
    async function loadUsuario() {
      try {
        await setToken(authTokens.access);
        const user = await getUsuario(id)
        setUsuario(user)
      } catch (error) {
        console.error(error)
      }
    }
    loadUsuario()
  }, [])

  return (
    <div>
        <EditUsuario usuario={usuario}/>
    </div>
  )
}