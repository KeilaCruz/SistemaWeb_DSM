import { useNavigate } from "react-router-dom"

export function EventoCard({ evento }) {
  
  const navigate = useNavigate()

  const handleNavigate = (idEvento) => {
    navigate(`/ver_evento/${idEvento}`)
  }

  return (
    <table className="table-bordered">
      <thead className="cabecera">
        <tr>
          <th className="colum">Nombre del Evento</th>
          <th className="colum">Fecha</th>
          <th className="colum">Hora</th>
          <th className="colum">Lugar</th>
          <th className="colum">Opciones</th>
        </tr>
      </thead>
      <tbody>
        
          <tr key={evento.idEvento}>
            <td className="fila">{evento.datos_evento.nom_evento}</td>
            <td className="fila">{evento.datos_evento.fecha}</td>
            <td className="fila">{evento.datos_evento.hora}</td>
            <td className="fila">{evento.datos_evento.lugar}</td>
            <td className="fila">
              <button 
                className="btn btn-primary" 
                onClick={() => handleNavigate(evento.idEvento)}
              >
                Ver
              </button>
            </td>
          </tr>
      
      </tbody>
    </table>
  )
}


