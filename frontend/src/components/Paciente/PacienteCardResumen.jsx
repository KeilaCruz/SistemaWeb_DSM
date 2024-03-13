import { useNavigate } from "react-router-dom"

export function PacienteCardResumen({ paciente }) {
    const navigate = useNavigate("")
    const handleNavigate = async () => {
        navigate(`/buscar_paciente/${paciente.CURP}`)
    }
    return (
        <>
            <div className="col-sm-10">
                <div className="card cards-buscar">
                    <div className="card-body">
                        <p className="cards-buscar-text text-center">{paciente.CURP}</p>
                        <p className="cards-buscar-text text-center">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</p>
                        <p className="cards-buscar-text text-center">{paciente.datos_contacto.telefono}</p>
                        <button onClick={handleNavigate}>Ver</button>
                    </div>

                </div>
            </div>
        </>
    )
}

