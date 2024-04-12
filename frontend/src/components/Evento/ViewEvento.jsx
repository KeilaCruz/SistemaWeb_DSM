import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { EditEvento } from "./EditEvento"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { getEvento } from "../../services/Recepcionista"

export function ViewEvento() {
  const { authTokens } = useContext(AuthContext)
  const [evento, setEvento] = useState({})
  const {idEvento} = useParams()

  //Cargar el objeto que se manda al componente del form para cargar input
  useEffect(() => {
    async function loadEvento() {
      try {
        await setToken(authTokens.access);
        const evento = await getEvento(idEvento)
        setEvento(evento)
      } catch (error) {
        console.error(error)
      }
    }
    loadEvento()
  }, [])

  return (
    <div>
        <EditEvento evento={evento}/>
    </div>
  )
}