import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { setToken } from '../../services/HeaderAuthorization'
import { getPaciente } from '../../services/Recepcionista'
import { getFichaPsicoPacienteAdulto } from '../../services/Psicologia'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function FichaPsicoAdulto() {
    const [fichas, setFichas] = useState([])
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)
    const [atencionPsicologica, setAtencionPsicologica] = useState(false)
    const [tieneMascotas, setTieneMascotas] = useState(false)
    const [tienePsicomaticos, setTienePsicomaticos] = useState(false)

    const textoPsicologia = atencionPsicologica ? 'Si' : 'No'
    const textoMascotas = tieneMascotas ? 'Si' : 'No'
    const textoPsicomaticos = tienePsicomaticos ? 'Si' : 'No'

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    useEffect(() => {
        async function loadFichas() {
            await setToken(authTokens.access);
            const paciente = await getPaciente(idPaciente);
            const ficha = await getFichaPsicoPacienteAdulto(idPaciente)
            const fichaInfoPaciente = ficha.map(item => ({
                ...item,
                paciente: {
                    CURP: paciente.CURP,
                    nombre: paciente.datos_personales.nombre,
                    apePaterno: paciente.datos_personales.apePaterno,
                    apeMaterno: paciente.datos_personales.apeMaterno,
                    edad: paciente.datos_personales.edad,
                }
            }))
            setFichas(fichaInfoPaciente)
            setAtencionPsicologica(ficha[0].datos_generales.recibido_orientacion_psico)
            setTieneMascotas(ficha[0].datos_familiares.tiene_mascotas)
            setTieneMascotas(ficha[0].datos_familiares.padece_sintomas_transtornos_psicomaticos)
        }
        loadFichas()
    }, [])

    return (
        <>
            <div>
                <Slider {...settings}>
                    {fichas.map(ficha => (
                        <div className='col-md-9 offset-md-1 container-fluid' >
                            <div className='row'>
                                <div className='col-md-4'>
                                    <label className='form-label label-form' htmlFor='expediente_ficha'>Número de expediente</label>
                                    <input className='form-control input-form' id='expediente_ficha' value={ficha.expedienteFicha} />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label label-form' htmlFor='expediente_ficha'>Fecha de registro</label>
                                    <input className='form-control input-form' id='expediente_ficha' value={ficha.fecha_registro} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="paciente_curp">CURP:</label>
                                    <input className="form-control input-form" id="paciente_curp" value={ficha.paciente.CURP} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="paciente_nombre">Nombre:</label>
                                    <input className="form-control input-form" id="paciente_nombre" value={`${ficha.paciente.nombre} ${ficha.paciente.apePaterno} ${ficha.paciente.apeMaterno}`} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="paciente_edad">Edad:</label>
                                    <input className="form-control input-form" id="paciente_edad" value={ficha.paciente.edad} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="genero">Genero:</label>
                                    <input className="form-control input-form" id="genero" value={ficha.datos_generales.genero} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="fecha_nacimiento">Fecha naciemiento:</label>
                                    <input className="form-control input-form" id="fecha_nacimiento" value={ficha.datos_generales.fecha_nacimiento} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="lugar_nacimiento">Lugar de nacimiento:</label>
                                    <input className="form-control input-form" id="lugar_nacimiento" value={ficha.datos_generales.lugar_nacimiento} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="numero_hijos">Número de hijos:</label>
                                    <input className="form-control input-form" id="numero_hijos" value={ficha.datos_generales.numero_hijos} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="edad_hijos">Edad de hijos:</label>
                                    <input className="form-control input-form" id="edad_hijos" value={ficha.datos_generales.edad_hijos} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="ocupacion_hijos">Ocupación de hijos:</label>
                                    <input className="form-control input-form" id="ocupacion_hijos" value={ficha.datos_generales.ocupacion_hijos} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="religion">Religión de hijos:</label>
                                    <input className="form-control input-form" id="religion" value={ficha.datos_generales.religion} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="ocupacion_paciente">Ocupación del paciente:</label>
                                    <input className="form-control input-form" id="ocupacion_paciente" value={ficha.datos_generales.ocupacion} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="nivel_socioeconomico">Nivel socioeconomico:</label>
                                    <input className="form-control input-form" id="nivel_socioeconomico" value={ficha.datos_generales.nivel_socioeconomico} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="motivo_consulta">Motivo de consulta:</label>
                                    <input className="form-control input-form" id="motivo_consulta" value={ficha.datos_generales.motivo_consulta} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="referido">Referido por:</label>
                                    <input className="form-control input-form" id="referido" value={ficha.datos_generales.referido} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="recibido_orientacion_psico">Recibido atención psicologica anteriormente:</label>
                                    <input className='form-control input-form' id='recibido_orientacion_psico' value={textoPsicologia} disabled={true} />
                                </div>

                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_actual_paciente">Historia actual del paciente:</label>
                                    <input className="form-control input-form" id="historia_actual_paciente" value={ficha.historia_actual_paciente} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_desarrollo">Historia de desarollo:</label>
                                    <input className="form-control input-form" id="historia_desarollo" value={ficha.datos_desarrollo.historia_desarrollo} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="primeros_cuatro_años">Referido por:</label>
                                    <input className="form-control input-form" id="primero_cuatro_años" value={ficha.datos_desarrollo.primeros_cuatro_años} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_escolar_kinder">Historia escolar en kinder:</label>
                                    <input className="form-control input-form" id="historia_escolar_kinder" value={ficha.datos_escolar.historia_escolar_kinder} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_escolar_primaria">Historia escolar en primaria:</label>
                                    <input className="form-control input-form" id="historia_escolar_primaria" value={ficha.datos_escolar.historia_escolar_primaria} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_escolar_secundaria">Historia escolar en secundaria:</label>
                                    <input className="form-control input-form" id="historia_escolar_secundaria" value={ficha.datos_escolar.historia_escolar_secundaria} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_escolar_preparatoria">Historia escolar en preparatoria:</label>
                                    <input className="form-control input-form" id="historia_escolar_preparatoria" value={ficha.datos_escolar.historia_escolar_preparatoria} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_escolar_profesional">Historia profesional:</label>
                                    <input className="form-control input-form" id="historia_escolar_profesional" value={ficha.datos_escolar.historia_escolar_profesional} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="historia_laboral">Historia laboral:</label>
                                    <input className="form-control input-form" id="historia_laboral" value={ficha.datos_laboral.historia_laboral} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="gusta_trabajo">Lo que más le gusta de su trabajo:</label>
                                    <input className="form-control input-form" id="gusta_trabajo" value={ficha.datos_laboral.gusta_trabajo} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="no_gusta_trabajo">Lo que no le gusta de su trabajo:</label>
                                    <input className="form-control input-form" id="no_gusta_trabajo" value={ficha.datos_laboral.no_gusta_trabajo} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="percibe_padres">Cómo percibe el paciente a sus padres:</label>
                                    <input className="form-control input-form" id="percibe_padres" value={ficha.datos_familiares.percibe_padres} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="contado_padres">¿Qué le han contado de sus padres?:</label>
                                    <input className="form-control input-form" id="contado_padres" value={ficha.datos_familiares.contado_padres} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="percibe_vive_casa">Historia escolar en primaria:</label>
                                    <input className="form-control input-form" id="percibe_vive_casa" value={ficha.datos_familiares.percibe_vive_casa} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="percibe_hijos">Historia escolar en primaria:</label>
                                    <input className="form-control input-form" id="percibe_hijos" value={ficha.datos_familiares.percibe_hijos} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="otros_familiares_significativos">Otros familiares significativos:</label>
                                    <input className="form-control input-form" id="otros_familiares_significativos" value={ficha.datos_familiares.otros_familiares_significativos} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="tiene_mascotas">Tiene mascotas:</label>
                                    <input className="form-control input-form" id="tiene_mascotas" value={textoMascotas} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="padecimientos_heredofamiliares">Padecimientos heredofamiliares:</label>
                                    <input className="form-control input-form" id="padecimientos_heredofafamiliares" value={ficha.datos_medico_quirurgica.padecimientos_heredofamiliares} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="enfermedades_padecido">Enfermedades más significativas que ha padecido:</label>
                                    <input className="form-control input-form" id="enfermedades_padecido" value={ficha.datos_medico_quirurgica.enfermedades_padecido} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="cuando_diferencia_genero">Cuándo noto diferencia de genero:</label>
                                    <input className="form-control input-form" id="cuando_diferencia_genero" value={ficha.datos_sexual.cuando_diferencia_genero} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="como_diferencia_genero">Cómo se dio cuenta de la diferencia:</label>
                                    <input className="form-control input-form" id="como_diferencia_genero" value={ficha.datos_sexual.como_diferencia_genero} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="genero_asignaron_niño">Qué genero le asignaron al paciente desde niño:</label>
                                    <input className="form-control input-form" id="genero_asignaron_niño" value={ficha.datos_sexual.genero_asignaron_niño} disabled={true} />
                                </div>
                                <div className='col-md-4'>
                                    <label className="form-label label-form" htmlFor="edad_primera_relacion_sexual">Edad de primera relación sexual:</label>
                                    <input className="form-control input-form" id="edad_primera_relacion_sexual" value={ficha.datos_sexual.edad_primera_relacion_sexual} disabled={true} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='col-md-3'>
                        <h1></h1>
                    </div>
                </Slider >
            </div >
        </>
    )
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#902829", borderRadius: "60%" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#902829", borderRadius: "60%" }}
            onClick={onClick}
        />
    );
}