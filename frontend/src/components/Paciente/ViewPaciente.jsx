
import { EditPacienteForm } from "./EditPacienteForm"
import { useForm } from "react-hook-form"

export function ViewPaciente() {
  const { register, handleSubmit } = useForm()


  //Actualizar la información del paciente
  const onSubmit = handleSubmit(async (data) => {
    try {
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
      <EditPacienteForm />
    </>
  )
}




