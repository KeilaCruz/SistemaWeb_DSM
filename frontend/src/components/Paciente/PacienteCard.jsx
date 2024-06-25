
export function PacienteCard({ paciente, handleSelect }) {
    const selectPaciente = () => {
        handleSelect(paciente.CURP);
    };
    return (
        <>
            <div className="card" key={paciente.CURP} style={{ width: "67rem" }}>
                <div className="card-body cards">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <p className="card-text">CURP: {paciente.CURP}</p>
                                <p className="card-text">Nombre: {paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</p>
                                <p className="card-text">Edad: {paciente.datos_personales.edad}</p>
                                <p className="card-text">Estado civil: {paciente.datos_personales.estado_civil}</p>

                            </div>
                            <div className="col-md-4">
                                <p className="card-text">Escolaridad: {paciente.datos_personales.escolaridad}</p>
                                <p className="card-text">Colonia: {paciente.datos_direccion.colonia}</p>
                                <p className="card-text">Calle: {paciente.datos_direccion.calle} {paciente.datos_direccion.numero_exterior}</p>
                                <p className="card-text">Teléfono: {paciente.datos_contacto.telefono}</p>
                            </div>
                            <div className="col-md-4">
                                <p className="card-text">{paciente.datos_contacto.derecho_habiencia}</p>
                                <input className="select-card form-check-input" type="checkbox" id="paciente_seleccionado" onChange={selectPaciente} />
                                <label class="form-check-label card-text" for="paciente_seleccionado">
                                    Seleccionar
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
