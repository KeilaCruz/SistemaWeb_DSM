
import { useContext } from "react"
import { EditPacienteForm } from "./EditPacienteForm"
import { useForm } from "react-hook-form"
import AuthContext from "../../context/AuthProvider"

export function ViewPaciente() {
  const { register, handleSubmit } = useForm()
  const { authTokens } = useContext(AuthContext)

  //Actualizar la información del paciente
  const onSubmit = handleSubmit(async (data) => {
    const pacienteData = {
      
    }
    try {

    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
      <EditPacienteForm onSubmit={onSubmit} registro={register} />
    </>
  )
}




