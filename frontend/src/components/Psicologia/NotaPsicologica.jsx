
export function NotaPsicologica({ data }) {
    return (
        <>
            {data.map(data => (
                <div className="container-fluid" key={data.idNota}>
                    <div className="row">
                        <div className="col-md-4 offset-md-1">
                            <label className="label-form form-label" htmlFor="num_expediente">No.expediente</label>
                            <input className="input-form form-control" id="num_expediente" placeholder="Número de expediente" type="text" value={data.numero_expediente} />
                        </div>
                        <div className="col-md-4">
                            <label className="label-form form-label" htmlFor="fecha_registro">Fecha de nota</label>
                            <input className="input-form form-control" id="fecha_registro" type="date" value={data.fecha} />
                        </div>
                        <div className="col-md-5">
                            <label className="label-form form-label" htmlFor="CURP">CURP</label>
                            <input className="input-form form-control" id="CURP" placeholder="CURP" type="text" value={data.CURP} />
                        </div>
                        <div className="col-md-6">
                            <label className="label-form form-label" htmlFor="nombre_paciente">Nombre del paciente</label>
                            <input className="input-form form-control" id="nombre_paciente" placeholder="nombre del paciente" type="text" value={data.nombre_paciente} />
                            <div className="col-md-9 offset-md-1">
                                <label className="label-form form-label" htmlFor="nota_evolucion">Evolución</label>
                                <textarea className="input-form form-control" id="nota_evolucion" placeholder="Escriba sus comentarios aquí" value={data.nota_evolucion}></textarea>
                            </div>
                            <div className="col-md-4 offset-md-1">
                                <label className="label-form form-label" htmlFor="proxima_cita">Próxima cita</label>
                                <input className="input-form form-control" id="proxima_cita" type="date" value={data.proxima_cita} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

