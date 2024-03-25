import { useNavigate } from "react-router-dom"

export function ExamenMedicoCard({examen,paciente}) {

  const navigate = useNavigate("")

    const handleNavigate = async () => {
        navigate(`/ver_examenMedico/${examen.idExamenMedico}`)
    }
  return (
    <div className="col-md-4 mb-4">
      <div className="card w-75 ">
        <div className="card-body">
          <h5 className="card-title">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</h5>
          <p className="card-text">
            <b>Fecha de registro:</b> {examen.fecha_revision}
          </p>

          <button className="btn btn-primary" onClick={handleNavigate}>Ver</button>
          
          
        </div>
      </div>
    </div>
  )
}

