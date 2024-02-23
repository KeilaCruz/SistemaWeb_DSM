import { useNavigate } from "react-router-dom"

export function PacienteCardResumen({ paciente }) {
    const navigate = useNavigate("")
    const handleNavigate = async () => {
        navigate(`/buscar_paciente/${paciente.CURP}`)
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <p className="card-title">{paciente.datos_personales.nombre} {paciente.datos_personales.apePaterno} {paciente.datos_personales.apeMaterno}</p>
                    <p>{paciente.CURP}</p>
                    <p>{paciente.datos_contacto.telefono}</p>
                    <button onClick={handleNavigate}>Ver</button>
                </div>
            </div>
        </>
    )
}

