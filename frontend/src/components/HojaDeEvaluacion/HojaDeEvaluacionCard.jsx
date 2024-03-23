import { useNavigate } from "react-router-dom"

export function HojaDeEvaluacionCard({evaluacion, paciente}) {

  const navigate = useNavigate("")
    const handleNavigate = async () => {
        navigate(`/ver_evaluacionClinica/${evaluacion.idHojaClinica}`)
    }

  return (
    

    <div className="col-md-4 mb-4">
      <div className="card w-75 ">
        <div className="card-body">
          <h5 className="card-title">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</h5>
          <p className="card-text">
            <b>Fecha de registro:</b> {evaluacion.fecha_revision}
          </p>
          <p className="card-text">
            <b>Nota:</b> {evaluacion.nota_medica}
          </p>
          <button className="btn btn-primary" onClick={handleNavigate}>Ver</button>
          
        </div>
      </div>
    </div>

    
  )
}

