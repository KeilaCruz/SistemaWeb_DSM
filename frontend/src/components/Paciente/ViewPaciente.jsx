
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { EditPacienteForm } from "./EditPacienteForm"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { getPaciente } from "../../services/Recepcionista"

export function ViewPaciente() {
  const { authTokens } = useContext(AuthContext)
  const [paciente, setPaciente] = useState({})
  const { idPaciente } = useParams()

  //Cargar el objeto paciente que se manda al componente del form para cargar input
  useEffect(() => {
    async function loadPacienteData() {
      try {
        await setToken(authTokens.access);
        const paciente = await getPaciente(idPaciente)
        setPaciente(paciente)
      } catch (error) {
        console.error(error)
      }
    }
    loadPacienteData()
  }, [])

  return (
    <>
      <EditPacienteForm paciente={paciente} />
    </>
  )
}




