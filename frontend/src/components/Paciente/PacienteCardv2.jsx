
export function PacienteCardv2({ paciente }) {
    return (
        <>
            {/*COMIENZO DEL CARD*/}
            <div className="offset-md-1 card" key={paciente.CURP} style={{ width: "67rem" }}>
                <div className="card-bodyV2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-2 cardv2-label">
                                        <p>Curp:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.CURP || ""}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 cardv2-label">
                                        <p>Nombre:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_personales?.nombre || ""} {paciente.datos_personales?.apePaterno || ""} {paciente.datos_personales?.apeMaterno || ""}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 cardv2-label">
                                        <p>Edad:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_personales?.edad || ""} </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 cardv2-label">
                                        <p>Estado civil:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_personales?.estado_civil || ""}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 cardv2-label">
                                        <p>Escolaridad:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_personales?.escolaridad || ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-3 cardv2-label">
                                        <p>Colonia:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_direccion?.colonia || ""}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 cardv2-label">
                                        <p>Calle:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_direccion?.calle || ""} {paciente.datos_direccion?.numero_exterior || ""}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 cardv2-label">
                                        <p>Telefono:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_contacto?.telefono || ""}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 cardv2-label ">
                                        <p>Derechohabiencia:</p>
                                    </div>
                                    <div className="col-md-6 card-text">
                                        <p>{paciente.datos_contacto?.derecho_habiencia || ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*FIN DEL CARD*/}
        </>
    )
}

