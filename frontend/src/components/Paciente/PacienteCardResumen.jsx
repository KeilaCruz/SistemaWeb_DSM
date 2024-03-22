import { useNavigate } from "react-router-dom"

export function PacienteCardResumen({ paciente }) {
    const navigate = useNavigate("")
    const handleNavigateFicha = async () => {
        navigate(`/buscar_paciente/${paciente.CURP}`)
    }
    const handleNavigateCitas = async () => {
        navigate(`/citas_paciente/${paciente.CURP}`)
    }
    return (
        <>
            <div className="col-sm-11">
                <div className="card cards-buscar">
                    <div className="card-body">
                        <p className="cards-buscar-text text-center">{paciente.CURP}</p>
                        <p className="cards-buscar-text text-center">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</p>
                        <p className="cards-buscar-text text-center">{paciente.datos_contacto.telefono}</p>
                        <button onClick={handleNavigateFicha}>Ver</button>
                        <button onClick={handleNavigateCitas}>Citas</button>
                    </div>

                </div>
            </div>
        </>
    )
}

