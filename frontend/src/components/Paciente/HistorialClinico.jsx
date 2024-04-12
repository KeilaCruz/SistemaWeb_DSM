import { useContext, useEffect, useState } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import { useParams } from "react-router-dom"
import { historialClinicoPaciente } from "../../services/Recepcionista"
import AuthContext from "../../context/AuthProvider"
import { PacienteCardv2 } from "./PacienteCardv2"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function HistorialClinico() {
    const [historial, setHistorial] = useState([])
    const [paciente, setPaciente] = useState({})
    const [historialPaciente, setHistorialPaciente] = useState([])
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)
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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
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
            <div className="col-md-8 offset-md-1 mt-5 slider-container">
                {/*Aqui ira las slides*/}
                <Slider {...settings}>
                    {historialPaciente.map(historial => (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="paciente_curp">CURP:</label>
                                    <input className="form-control" id="paciente_curp" value={historial.paciente.CURP} disabled={true} />
                                </div>
                                <div className="col-md-3" htmlFor="paciente_nombre">
                                    <label className="form-label">Nombre:</label>
                                    <input className="form-control" id="paciente_nombre" value={`${historial.paciente.nombre} ${historial.paciente.apePaterno} ${historial.paciente.apeMaterno}`} disabled={true} />
                                </div>
                                <div className="col-md-3" htmlFor="paciente_edad">
                                    <label className="form-label">Edad:</label>
                                    <input className="form-control" id="paciente_edad" value={historial.paciente.edad} disabled={true} />
                                </div>
                                <div className="col-md-3" htmlFor="fehca_revision">
                                    <label className="form-label">Fecha de revisión:</label>
                                    <input className="form-control" id="fecha_revision" value={historial.fecha_revision} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="tension_arterial">Tensión arterial</label>
                                    <input className="form-control" id="tension_arterial" value={historial.datos_nota_enfermeria.tension_arterial} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="frecuencia_cardiaca">Frecuencia cardiaca</label>
                                    <input className="form-control" id="frecuencia_cardiaca" value={historial.datos_nota_enfermeria.frecuencia_cardiaca} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="frecuencia_respiratoria">Frecuencia respiratoria</label>
                                    <input className="form-control" id="frecuencia_respiratoria" value={historial.datos_nota_enfermeria.frecuencia_respiratoria} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="temperatura">Temperatura</label>
                                    <input className="form-control" id="temperatura" value={historial.datos_nota_enfermeria.temperatura} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="imc">IMC</label>
                                    <input className="form-control" id="imc" value={historial.datos_nota_enfermeria.imc} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="saturacion_oxigeno">Saturación oxigeno</label>
                                    <input className="form-control" id="saturacion_oxigeno" value={historial.datos_nota_enfermeria.saturacion_oxigeno} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="nivel_glucosa">Nivel de glucosa</label>
                                    <input className="form-control" id="nivel_glucosa" value={historial.datos_nota_enfermeria.glucosa} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="peso">Peso</label>
                                    <input className="form-control" id="peso" value={historial.datos_nota_enfermeria.peso} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="talla">Talla/altura</label>
                                    <input className="form-control" id="talla" value={historial.datos_nota_enfermeria.talla} disabled={true} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="circuferencia_cintura">Circuferencia de cintura</label>
                                    <input className="form-control" id="circuferencia_cintura" value={historial.datos_nota_enfermeria.cintura} disabled={true} />
                                </div>
                            </div>

                        </div>
                    ))}
                </Slider>

            </div>
        </div>
    );
}



