
export function ExamenMedicoCard({examen,paciente}) {

  return (
    <div className="col-md-4 mb-4">
      <div className="card w-75 ">
        <div className="card-body">
          <h5 className="card-title">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</h5>
          <p className="card-text">
            <b>Fecha de registro:</b> {examen.fecha_revision}
          </p>
          
          
        </div>
      </div>
    </div>
  )
}

