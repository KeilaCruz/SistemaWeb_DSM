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
    const handleNavigateExamen = async () => {
        navigate(`/examen-medico/${paciente.CURP}`)
    }
    return (
        <>
            <div className="col-sm-11">
    <div className="card cards-buscar">
        <div className="card-body">
            <p className="cards-buscar-text text-center">{paciente.CURP}</p>
            <p className="cards-buscar-text text-center">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</p>
            <p className="cards-buscar-text text-center">{paciente.datos_contacto.telefono}</p>
            <div className="d-flex justify-content-center">
                <div className="col-md-2 mb-3 mx-2">
                    <button onClick={handleNavigateFicha} className="lni lni-eye button-card w-100" title="Ver Ficha"></button>
                </div>
                <div className="col-md-2 mb-3 mx-2">
                    <button onClick={handleNavigateCitas} className="lni lni-calendar button-card w-100" title="Ver Citas"></button>
                </div>
                <div className="col-md-2 mb-3 mx-2">
                    <button onClick={handleNavigateHistorial} className="lni lni-notepad button-card w-100" title="Ver Historial"></button>
                </div>
                <div className="col-md-2 mb-3 mx-2">
                    <button onClick={handleNavigateExamen} className="lni lni-heart button-card w-100" title="Ver Examen"></button>
                </div>
            </div>
        </div>
    </div>
</div>

        </>
    )
}

