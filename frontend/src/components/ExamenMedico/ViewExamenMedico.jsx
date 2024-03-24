import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { EditExamenMedico } from "./EditExamenMedico"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { getExamenMedico } from "../../services/DoctorGeneral"

export function ViewExamenMedico() {
  const { authTokens } = useContext(AuthContext)
  const [examenMedico, setExamenMedico] = useState({})
  const {idExamenMedico} = useParams()

  //Cargar el objeto examenMedico que se manda al componente del form para cargar input
  useEffect(() => {
    async function loadExamenMedico() {
      try {
        await setToken(authTokens.access);
        const examenMedico = await getExamenMedico(idExamenMedico)
        setExamenMedico(examenMedico)
      } catch (error) {
        console.error(error)
      }
    }
    loadExamenMedico()
  }, [])

  return (
    <div>
        <EditExamenMedico examenMedico={examenMedico}/>
    </div>
  )
}

