import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function SliderHistorial({ historialPaciente }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <>
            <Slider {...settings}>
                {historialPaciente.map(historial => (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mx-4 mt-4" >
                                <label className="form-label label-form" htmlFor="fecha_revision">Fecha de revisión:</label>
                                <input className="form-control input-form" id="fecha_revision" value={historial.fecha_revision} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="paciente_curp">CURP:</label>
                                <input className="form-control input-form" id="paciente_curp" value={historial.paciente.CURP} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="paciente_nombre">Nombre:</label>
                                <input className="form-control input-form" id="paciente_nombre" value={`${historial.paciente.nombre} ${historial.paciente.apePaterno} ${historial.paciente.apeMaterno}`} disabled={true} />
                            </div>
                            <div className="col-md-1 mx-4 mt-4" >
                                <label className="form-label label-form" htmlFor="paciente_edad">Edad:</label>
                                <input className="form-control input-form" id="paciente_edad" value={historial.paciente.edad} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="tension_arterial">Tensión arterial</label>
                                <input className="form-control input-form" id="tension_arterial" value={historial.datos_nota_enfermeria.tension_arterial} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="frecuencia_cardiaca">Frecuencia cardiaca</label>
                                <input className="form-control input-form" id="frecuencia_cardiaca" value={historial.datos_nota_enfermeria.frecuencia_cardiaca} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="frecuencia_respiratoria">Frecuencia respiratoria</label>
                                <input className="form-control input-form" id="frecuencia_respiratoria" value={historial.datos_nota_enfermeria.frecuencia_respiratoria} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="temperatura">Temperatura</label>
                                <input className="form-control input-form" id="temperatura" value={historial.datos_nota_enfermeria.temperatura} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="imc">IMC</label>
                                <input className="form-control input-form" id="imc" value={historial.datos_nota_enfermeria.imc} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="saturacion_oxigeno">Saturación oxigeno</label>
                                <input className="form-control input-form" id="saturacion_oxigeno" value={historial.datos_nota_enfermeria.saturacion_oxigeno} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="nivel_glucosa">Nivel de glucosa</label>
                                <input className="form-control input-form" id="nivel_glucosa" value={historial.datos_nota_enfermeria.glucosa} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="peso">Peso</label>
                                <input className="form-control input-form" id="peso" value={historial.datos_nota_enfermeria.peso} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4">
                                <label className="form-label label-form" htmlFor="talla">Talla/altura</label>
                                <input className="form-control input-form" id="talla" value={historial.datos_nota_enfermeria.talla} disabled={true} />
                            </div>
                            <div className="col-md-3 mx-4 mt-4 mb-4">
                                <label className="form-label label-form" htmlFor="circuferencia_cintura">Circuferencia de cintura</label>
                                <input className="form-control input-form" id="circuferencia_cintura" value={historial.datos_nota_enfermeria.cintura} disabled={true} />
                            </div>
                        </div>

                    </div>
                ))}
            </Slider>

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