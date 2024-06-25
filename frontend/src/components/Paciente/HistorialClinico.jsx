import { useContext, useEffect, useState } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import { useParams } from "react-router-dom"
import { historialClinicoPaciente } from "../../services/Recepcionista"
import AuthContext from "../../context/AuthProvider"
import { PacienteCardv2 } from "./PacienteCardv2"
import { SliderHistorial } from "./SliderHistorial"
import { FormHistorial } from "./FormHistorial"


export function HistorialClinico() {
    const [historial, setHistorial] = useState([])
    const [paciente, setPaciente] = useState({})
    const [historialPaciente, setHistorialPaciente] = useState([])
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)
    const componentRender = historialPaciente.length > 1 ? <SliderHistorial historialPaciente={historialPaciente} /> : <FormHistorial historialPaciente={historialPaciente} />
    useEffect(() => {
        async function loadHistorial() {
            await setToken(authTokens.access)
            const response = await historialClinicoPaciente(idPaciente)
            const { paciente, hoja } = response;
            //agregar los datos del paciente en el mismo arreglo
            const historialPaciente = hoja.map(item => ({
                ...item,
                paciente: {
                    CURP: paciente.CURP,
                    nombre: paciente.datos_personales.nombre,
                    apePaterno: paciente.datos_personales.apePaterno,
                    apeMaterno: paciente.datos_personales.apeMaterno,
                    edad: paciente.datos_personales.edad,
                }
            }))
            setHistorial(hoja);
            setPaciente(paciente)
            setHistorialPaciente(historialPaciente)
        }
        loadHistorial()
    }, [])

    return (
        <div className="container-fluid pb-4">
            <div className="row g-2">
                <div className="col-md-10 offset-md-1 text-center mt-1">
                    <hr />
                    <h3 className="title">HISTORIAL CLÍNICO DEL PACIENTE</h3>
                    <hr />
                </div>
                <div className="col-md-12">
                    <PacienteCardv2 paciente={paciente} />
                </div>
                <table className="col-md-10 offset-md-1 mt-5 table-bordered">
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
                                <td className="filav2">{historial.datos_nota_enfermeria.tension_arterial} mmHG</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.frecuencia_cardiaca} lpm</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.frecuencia_respiratoria} rpm</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.temperatura} °C</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.saturacion_oxigeno} SpO2</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.glucosa} mg/dl</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.peso} kg</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.talla} m</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.imc} kg/m2</td>
                                <td className="filav2">{historial.datos_nota_enfermeria.cintura} cm</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-md-10 offset-md-1 mt-4">
                <h2 className="sub-title">Historias clínicas del paciente</h2>
            </div>
            <div className="col-md-10 offset-md-1 slider-container mt-3">
                {componentRender}
            </div>
        </div>
    );
}


