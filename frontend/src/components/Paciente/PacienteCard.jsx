
export function PacienteCard({ paciente, handleSelect }) {
    const selectPaciente = () => {
        handleSelect(paciente.CURP);
    };
    return (
        <>
            <div className="card" key={paciente.CURP} style={{ width: "70rem" }}>
                <div className="card-body cards">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <p className="card-text">{paciente.CURP}</p>
                                <p className="card-text">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</p>
                                <p className="card-text">{paciente.datos_personales.estado_civil}</p>
                                <p className="card-text">{paciente.datos_personales.escolaridad}</p>
                            </div>
                            <div className="col-md-4">
                                <p className="card-text">{paciente.datos_direccion.colonia}</p>
                                <p className="card-text">{paciente.datos_direccion.calle} {paciente.datos_direccion.numero_exterior}</p>
                                <p className="card-text">{paciente.datos_contacto.telefono}</p>
                                <p className="card-text">{paciente.datos_contacto.derecho_habiencia}</p>
                            </div>
                            <div className="col-md-4">
                                <input type="checkbox" id="paciente_seleccionado" onChange={selectPaciente} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
