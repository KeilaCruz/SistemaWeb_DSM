import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { EditHojaDeEvaluacion } from "./EditHojaDeEvaluacion"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { getHojaEvaluacion } from "../../services/DoctorGeneral"

export function ViewHojaDeEvaluacion() {
  const { authTokens } = useContext(AuthContext)
  const [hojaClinica, setHojaClinica] = useState({})
  const {idHojaClinica} = useParams()


  //Cargar el objeto hojaClinica que se manda al componente del form para cargar input
  useEffect(() => {
    async function loadHojaClinica() {
      try {
        await setToken(authTokens.access);
        const hojaClinica = await getHojaEvaluacion(idHojaClinica)
        setHojaClinica(hojaClinica)
      } catch (error) {
        console.error(error)
      }
    }
    loadHojaClinica()
  }, [])

  return (
    <div>
      <EditHojaDeEvaluacion hojaClinica ={hojaClinica} />
    </div>
  )
}

