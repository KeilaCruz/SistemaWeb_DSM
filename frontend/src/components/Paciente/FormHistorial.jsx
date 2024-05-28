
export function FormHistorial({ historialPaciente }) {
    return (
        <>
            {historialPaciente.map(historial => (
                <div className="container-fluid pb-5">
                    <div className="row">
                        <div className="col-md-2 mx-3 mt-4" >
                            <label className="form-label label-form" htmlFor="fecha_revision">Fecha de revisión:</label>
                            <p className="text-informativo">{historial.fecha_revision}</p>
                        </div>
                        <div className="col-md-3 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="paciente_curp">CURP:</label>
                            <p className="text-informativo">{historial.paciente.CURP}</p>
                        </div>
                        <div className="col-md-3 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="paciente_nombre">Nombre:</label>
                            <p className="text-informativo">{`${historial.paciente.nombre} ${historial.paciente.apePaterno} ${historial.paciente.apeMaterno}`}</p>
                        </div>
                        <div className="col-md-1 mx-3 mt-4" >
                            <label className="form-label label-form" htmlFor="paciente_edad">Edad:</label>
                            <p className="text-informativo">{historial.paciente.edad}</p>
                        </div>
                        <div className="col-md-2 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="tension_arterial">Tensión arterial</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.tension_arterial} mmHG</p>
                        </div>

                        <div className="col-md-3 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="frecuencia_cardiaca">Frecuencia cardiaca</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.frecuencia_cardiaca} lpm</p>
                        </div>
                        <div className="col-md-3 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="frecuencia_respiratoria">Frecuencia respiratoria</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.frecuencia_respiratoria} rpm</p>
                        </div>
                        <div className="col-md-2 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="temperatura">Temperatura</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.temperatura} °C</p>
                        </div>
                        <div className="col-md-2 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="imc">IMC</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.imc} kg/m2</p>
                        </div>
                        <div className="col-md-3 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="saturacion_oxigeno">Saturación oxigeno</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.saturacion_oxigeno} SpO2 </p>
                        </div>
                        <div className="col-md-3 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="nivel_glucosa">Nivel de glucosa</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.glucosa} mg/dl</p>
                        </div>
                        <div className="col-md-2 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="peso">Peso</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.peso} kg</p>
                        </div>
                        <div className="col-md-2 mx-3 mt-4">
                            <label className="form-label label-form" htmlFor="talla">Talla/altura</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.talla} cm</p>
                        </div>
                        <div className="col-md-3 mx-3 mt-4 mb-4">
                            <label className="form-label label-form" htmlFor="circuferencia_cintura">Circuferencia de cintura</label>
                            <p className="text-informativo">{historial.datos_nota_enfermeria.cintura} cm</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

