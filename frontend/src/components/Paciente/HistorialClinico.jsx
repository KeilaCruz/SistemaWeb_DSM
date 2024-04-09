import { useContext, useEffect, useState } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import { useParams } from "react-router-dom"
import { getPaciente, historialClinicoPaciente } from "../../services/Recepcionista"
import AuthContext from "../../context/AuthProvider"
import { PacienteCardv2 } from "./PacienteCardv2"

export function HistorialClinico() {
    const [paciente, setPaciente] = useState({})
    const [historial, setHistorial] = useState([])
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)
    useEffect(() => {
        async function loadPaciente() {
            try {
                await setToken(authTokens.access);
                const response = await getPaciente(idPaciente);
                setPaciente(response);
            } catch (error) {
                console.error("Error al cargar el paciente:", error);
            }
        }
        loadPaciente();
    }, [idPaciente, authTokens.access]);
    useEffect(() => {
        async function loadHistorial() {
            await setToken(authTokens.access)
            const response = await historialClinicoPaciente(idPaciente)
            setHistorial(response)
        }
        loadHistorial()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row g-2 mt-5">
                <div className="col-md-10 offset-md-1 text-center mt-5">
                    <hr />
                    <h3 className="title">HISTORIAL CLINICO DEL PACIENTE</h3>
                    <hr />
                </div>
                <PacienteCardv2 paciente={paciente} />
                <table className="col-md-10 offset-md-1 mt-5">
                    <thead className="cabecera">
                        <th className="columv2">Fecha</th>
                        <th className="columv2">T/A</th>
                        <th className="columv2">FC</th>
                        <th className="columv2">FR</th>
                        <th className="columv2">Temp</th>
                        <th className="columv2">SPOZ(%)</th>
                        <th className="columv2">Glucosa</th>
                        <th className="columv2">Peso</th>
                        <th className="columv2">Talla</th>
                        <th className="columv2">IMC</th>
                        <th className="columv2">Cintura</th>
                    </thead>
                    <tbody>
                        {historial.map(historial => (
                            <tr>
                                <td className="filav2">{historial.fecha_revision}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.tension_arterial}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.frecuencia_cardiaca}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.frecuencia_respiratoria}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.temperatura}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.imc}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.saturacion_oxigeno}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.glucosa}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.peso}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.talla}</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.cintura}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

