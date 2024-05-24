import { useNavigate } from "react-router-dom"

export function PacienteCardResumen({ paciente }) {
    const navigate = useNavigate("")
    const handleNavigateFicha = async () => {
        navigate(`/buscar_paciente/${paciente.CURP}`)
    }
    const handleNavigateCitas = async () => {
        navigate(`/citas_paciente/${paciente.CURP}`)
    }
    const handleNavigateHistorial = async () => {
        navigate(`/historial-clinico/${paciente.CURP}`)
    }
    return (
        <>
            <div className="col-sm-11">
                <div className="card cards-buscar">
                    <div className="card-body">
                        <p className="cards-buscar-text text-center">{paciente.CURP}</p>
                        <p className="cards-buscar-text text-center">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</p>
                        <p className="cards-buscar-text text-center">{paciente.datos_contacto.telefono}</p>
                        <div className="row">
                            <div className="col-md-3 offset-md-1">
                                <button onClick={handleNavigateFicha} className="lni lni-eye button-card"></button>
                            </div>
                            <div className="col-md-3">
                                <button onClick={handleNavigateCitas} class="lni lni-calendar button-card"></button>
                            </div>
                            <div className="col-md-3 offset-md-1">
                                <button onClick={handleNavigateHistorial} className="lni lni-notepad button-card"></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

