import { useNavigate } from "react-router-dom"

export function EventoCard({evento}) {
    const navigate = useNavigate("")

    const handleNavigate = async () => {
        navigate(`/ver_evento/${evento.idEvento}`)
    }
  return (
    <div className="col-md-4 mb-4">
      <div className="card w-75 ">
        <div className="card-body">
          <h5 className="card-title">{evento.datos_evento.nom_evento}</h5>
          <p className="card-text">
            <b>Fecha:</b> {evento.datos_evento.fecha}
          </p>
          <p className="card-text">
            <b>Hora:</b> {evento.datos_evento.hora}
          </p>
          <p className="card-text">
            <b>Lugar:</b> {evento.datos_evento.lugar}
          </p>

          <button className="btn btn-primary" onClick={handleNavigate}>Ver</button>
          
          
        </div>
      </div>
    </div>
  )
}

