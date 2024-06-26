import { useContext, useEffect, useState } from "react"
import { searchPaciente } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization"
import { PacienteCard } from "../Paciente/PacienteCard"
import AuthContext from "../../context/AuthProvider"

export function FormHistoriaNutricion({ onSubmit, register, pacienteSelect, errors }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(5)
    const { authTokens } = useContext(AuthContext);
    const [showCampusFem, setShowCampus] = useState(false)
    const [criterio, setCriterio] = useState("")
    const [paciente, setPaciente] = useState([])
    const [isResult, setIsResult] = useState(true)
    const handleBarraBusqueda = (evt) => {
        setCriterio(evt.target.value)
    }
    const handleBuscarPaciente = async () => {
        try {
            if (criterio.trim() === "") {
                setIsResult(false);
                return;
            }
            await setToken(authTokens.access)
            const data = await searchPaciente(criterio)
            setPaciente(data)
            setIsResult(data.length > 0)
        } catch (error) {
            console.error(error)
            setIsResult(false)
        }
    }
    const handleCampusFemenino = (evt) => {
        const valor = evt.target.value
        if (valor === "F") {
            setShowCampus(true)
        } else if (valor === "M") {
            setShowCampus(false)
        }
    }
    const selectPaciente = (CURP) => {
        pacienteSelect(CURP)
    }
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row g-3">
                    <div className="col-md-10 offset-md-1 text-center ">
                        <hr />
                        <h3 className="title">HISTORIA CLÍNICA-NUTRICIÓN</h3>
                        <hr />
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 offset-md-1">
                                <button onClick={handlePrevPage} className="button-pagination rounded">
                                    <i class="lni lni-angle-double-left"></i> Anterior
                                </button>
                            </div>
                            <div className="col-md-3 offset-md-5">
                                <button onClick={handleNextPage} className="button-pagination rounded">
                                    Siguiente <i class="lni lni-angle-double-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={onSubmit}>
                        {currentPage === 1 && (
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-6 offset-1">
                                        <input className="form-control input-form" type="search" id="busqueda_paciente" placeholder="Buscar por primer nombre, telefono o CURP" onChange={handleBarraBusqueda} />
                                    </div>
                                    <div className="col-md-3 mt-1">
                                        <button type="button" onClick={handleBuscarPaciente} className="button-buscar">
                                            <i class="lni lni-search-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-9 offset-1">
                                    <label className="form-label label-section">DATOS PERSONALES</label>
                                </div>
                                <div className="col-md-9 offset-1">
                                    {isResult ? (
                                        <div>
                                            {paciente.map(paciente => (
                                                <PacienteCard paciente={paciente} key={paciente.CURP} handleSelect={selectPaciente} register={register} />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-danger mt-4">NO SE ENCONTRARON RESULTADOS DE BÚSQUEDA</p>
                                    )}
                                </div>
                                <div className="col-md-3 offset-1 mt-1">
                                    <label htmlFor="num_expediente" className="form-label label-form">Número expediente</label>
                                    <input className="form-control input-form" id="num_expediente" placeholder="Número expediente" type="number" {...register("num_expediente", { required: true, pattern: /^[A-Za-z0-9]+$/ })} />
                                    {errors.num_expediente?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.num_expediente?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-3 mt-1">
                                    <label htmlFor="fecha_nacimiento" className="form-label label-form">Fecha de nacimiento</label>
                                    <input className="form-control input-form" type="date" id="fecha_nacimiento" placeholder="Fecha de nacimiento" {...register("fecha_nacimiento", { required: true })} />
                                    {errors.fecha_nacimiento?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 mt-1">
                                    <label htmlFor="municipio_nacimiento" className="form-label label-form">Municipio de nacimiento</label>
                                    <input className="form-control input-form" type="text" id="municipio_nacimiento" placeholder="Municipio de nacimiento" {...register("municipio_nacimiento", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.municipio_nacimiento?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.municipio_nacimiento?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-3 offset-1 mt-1">
                                    <label htmlFor="estado_nacimiento" className="form-label label-form">Estado de nacimiento</label>
                                    <input className="form-control input-form" type="text" id="estado_nacimiento" placeholder="Estado de nacimiento" {...register("estado_nacimiento", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.estado_nacimiento?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.estado_nacimiento?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-7 mt-1">
                                    <label htmlFor="motivo_consulta" className="form-label label-form">Motivo de consulta</label>
                                    <textarea id="motivo_consulta" className="form-control input-form" placeholder="Motivo de consulta" {...register("motivo_consulta", {
                                        required: true, pattern: { value: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ }
                                    })}></textarea>
                                    {errors.motivo_consulta?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.motivo_consulta?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 offset-1 mt-4">
                                    <label className="form-label label-form">Género</label>
                                    <label className="form-check-label mx-1">Femenino
                                        <input className="form-check-input" type="radio" id="sexo_femenino" name="option_sexo" value="F" {...register("sexo", { required: true })} onChange={handleCampusFemenino} />
                                    </label>
                                    <label className="form-check-label mx-1">Masculino
                                        <input className="form-check-input" type="radio" id="sexo_masculino" name="option_sexo" value="M" {...register("sexo", { required: true })} onChange={handleCampusFemenino} />
                                    </label>
                                    {errors.sexo?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                        {currentPage === 2 && (
                            <div className="row">
                                <div className="col-md-9 offset-1 mt-1">
                                    <label htmlFor="Indicadores_clinicos" className="form-label label-section">INDICADORES CLÍNICOS</label>
                                </div>
                                <div className="col-md-9 offset-1 mt-2">
                                    <label htmlFor="AHF" className="form-label label-form">AHF</label>
                                </div>
                                <div className="col-md-3 offset-1 mt-1">
                                    <label className="form-label label-form">Diabetes</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="diabetes_si" name="option_diabetes" value={true} {...register("AHF_diabetes", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="diabetes_no" name="option_diabetes" value={false} {...register("AHF_diabetes", { required: true })} />
                                    </label>
                                    {errors.AHF_diabetes?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 offset-1 mt-2">
                                    <input id="quien_diabetes" className="form-control input-form" type="text" placeholder="¿Quién?" {...register("quien_diabetes")} />
                                </div>
                                <div className="col-md-3 offset-1 mt-1">
                                    <label htmlFor="hipetension" className="form-label label-form">Hipertensión</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="hipertension_si" name="option_hipertension" value={true} {...register("AHF_hipertension", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="hipertension_no" name="option_hipertension" value={false} {...register("AHF_hipertension", { required: true })} />
                                    </label>
                                    {errors.AHF_hipertension?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 offset-1 mt-1">
                                    <input className="form-control input-form" type="text" placeholder="¿Quién?" {...register("quien_hipertension", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.quien_hipertension?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-3 offset-1 mt-2">
                                    <label htmlFor="Dislipidemias" className="form-label label-form">Dislipidemias</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="dislipidemias_si" name="option_dislipidemias" value={true} {...register("AHF_dislipidemias", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="dislipidemias_no" name="option_dislipidemias" value={false} {...register("AHF_dislipidemias", { required: true })} />
                                    </label>
                                    {errors.AHF_dislipidemias?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 offset-1 mt-2">
                                    <input id="quien_dislipidemias" className="form-control input-form" type="text" placeholder="¿Quién?" {...register("quien_dislipidemias", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} />
                                    {errors.quien_dislipidemias?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                        {currentPage === 3 && (
                            <div className="row">
                                <div className="col-md-9 offset-1 mt-1">
                                    <label htmlFor="antecedentes_patologicos" className="form-label label-section">ANTECEDENTES PATOLÓGICOS</label>
                                </div>
                                <div className="col-md-3 offset-1 mt-1">
                                    <label htmlFor="diabetes_mellitus" className="form-label label-form">Diabetes mellitus</label>
                                    <label className="mx-4">Si
                                        <input type="radio" id="diabetesmellitus_si" name="option_diabetesmellitus" value={true} {...register("AP_diabetes_mellitus", { required: true })} />
                                    </label>
                                    <label className="mx-4">No
                                        <input type="radio" id="diabetesmellitus_no" name="option_diabetesmellitus" value={false} {...register("AP_diabetes_mellitus", { required: true })} />
                                    </label>
                                    {errors.AP_diabetes_mellitus?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-9 offset-1 mt-1">
                                    <label className="label-form">Hipertensión</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="ap_hipertension_si" name="option_ap_hipertension" value={true} {...register("AP_hipertension", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="ap_hipertension-no" name="option_ap_hipertension" value={false} {...register("AP_hipertension", { required: true })} />
                                    </label>
                                    {errors.AP_hipertension?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-9 offset-1 mt-1">
                                    <label className="label-form form-label">Dislipidemias</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="ap_dislipidemias_si" name="option_ap_dislipidemias" value={true} {...register("AP_dislipidemias", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="ap_dislipidemias_no" name="option_ap_dislipidemias" value={false} {...register("AP_dislipidemias", { required: true })} />
                                    </label>
                                    {errors.AP_dislipidemias?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-9 offset-1 mt-1">
                                    <label className="form-label label-form">¿Presenta problemas gastrointestinales como diarrea, gastritis, colitis, estreñimiento, ulceras, diarrea?</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="problema_gastro_si" name="option_gastro" value={true} {...register("problema_gastrointestinal", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="problema_gastro_no" name="option_gastro" value={false} {...register("problema_gastrointestinal", { required: true })} />
                                    </label>
                                    {errors.problema_gastrointestinal?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 offset-1 mt-1">
                                    <label htmlFor="cual_problema_gastro" className="form-label label-form">¿Cuál es su padecimiento gastrointestinal?</label>
                                    <input id="cual_problema_gastro" className="form-control input-form" type="text" placeholder="¿Cuál?" {...register("cual_problema_gastrointestinal", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.cual_problema_gastrointestinal?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.cual_problema_gastrointestinal?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 offset-1 mt-1">
                                    <label htmlFor="observaciones_gastro" className="form-label label-form">Observaciones gastrointestinal</label>
                                    <textarea id="observaciones_gastro" className="input-form form-control" placeholder="Observaciones" {...register("observaciones_patologicas", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })}></textarea>
                                    {errors.observaciones_patologicas?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.observaciones_patologicas?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 offset-1 mt-2">
                                    <label htmlFor="intervención_quirurgica" className="form-label label-form">Intervenciones quirurgicas</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="from-check-input" type="radio" id="inter_quirurgica_si" name="option_quirurgica" value={true} {...register("intervencion_quirurgica", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="from-check-input" type="radio" id="inter_quirurgica_no" name="option_quirurgica" value={false} {...register("intervencion_quirurgica", { required: true })} />
                                    </label>
                                    {errors.observaciones_patologicas?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 mt-2">
                                    <input id="cual_intervencion_quirurgica" className="input-form form-control" type="text" placeholder="¿Cuál?" {...register("cual_intervencion_quirurgica", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.cual_intervencion_quirurgica?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.cual_intervencion_quirurgica?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 offset-1 mt-2">
                                    <label htmlFor="alergia_alimento" className="form-label label-form">Alergia/Intolerancia a un alimento</label>
                                    <label className="form-check-label mx-4">Si
                                        <input type="radio" id="aler_alimento_si" name="option_aler_alimento" value={true} {...register("alergia_alimento", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input type="radio" id="aler_alimento_no" name="option_aler_alimento" value={false} {...register("alergia_alimento", { required: true })} />
                                    </label>
                                    {errors.alergia_alimento?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 mt-2">
                                    <input id="cual_alergia_alimento" className="input-form form-control" type="text" placeholder="¿Cuál?" {...register("cual_alergia_alimento", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.cual_alergia_alimento?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.cual_alergia_alimento?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>

                                <div className="col-md-4 offset-1 mt-2">
                                    <label className="form-label label-form">¿Consume algún farmáco?</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="consume_farmaco_si" name="option_consume_farmaco" value={true} {...register("consume_farmaco_alergia", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="consume_farmaco_no" name="option-consume-farmaco" value={false} {...register("consume_farmaco_alergia", { required: true })} />
                                    </label>
                                    {errors.consume_farmaco_alergia?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 mt-2">
                                    <input className="form-control input-form" type="text" placeholder="¿Cuál?" {...register("cual_alergia_farmaco", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.cual_alergia_farmaco?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.cual_alergia_farmaco?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-2">
                                    <input className="form-control input-form" type="text" placeholder="¿Desde cuándo?" {...register("desde_cuando_farmaco", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                    {errors.desde_cuando_farmaco?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.desde_cuando_farmaco?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                        {currentPage === 4 && (
                            <div className="row">
                                <div className="col-md-9 offset-1">
                                    <label htmlFor="ANP" className="form-label label-section">ANP</label>
                                </div>
                                <div className="col-md-5 offset-1">
                                    <label htmlFor="actividad_fisica" className="form-label label-form">Realiza actividad fisica</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="actividad_fisica_si" name="option_actividad_fisica" value={true} {...register("realiza_actividad_fisica", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="actividad_fisica_no" name="option_actividad_fisica" value={false} {...register("realiza_actividad_fisica", { required: true })} />
                                    </label>
                                    {errors.realiza_actividad_fisica?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 offset-1 mt-1">
                                    <input className="form-control input-form" type="text" placeholder="¿Cuál?" {...register("cual_actividad_fisica", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.cual_actividad_fisica?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.cual_actividad_fisica?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="text" placeholder="Duración" {...register("duracion", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                    {errors.duracion?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.duracion?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>

                                <div className="col-md-9 offset-1">
                                    <label htmlFor="sustancias_consume" className="form-label label-form">¿Consume alguna de las siguientes sustancias?</label>
                                </div>
                                <div className="col-md-9 offset-1 mt-1">
                                    <label htmlFor="consume_alcohol" className="form-label label-form">Alcohol</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="consume_alcohol_si" name="option_consume_alcohol" value={true} {...register("consume_alcohol", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="consume_alcohol_no" name="option_consume_alcohol" value={false} {...register("consume_alcohol", { required: true })} />
                                    </label>
                                    {errors.consume_alcohol?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-9 offset-1 mt-1">
                                    <label htmlFor="consume_tabaco" className="form-label label-form">Tabaco</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="consume_tabaco_si" name="option_consume_tabaco" value={true} {...register("consume_tabaco", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="consume-tabaco-no" name="option-consume-tabaco" value={false} {...register("consume_tabaco", { required: true })} />
                                    </label>
                                    {errors.consume_tabaco?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-9 offset-1 mt-1">
                                    <label htmlFor="consume_drogas">Drogas</label>
                                    <label className="form-check-label mx-4">Si
                                        <input className="form-check-input" type="radio" id="consume_drogas_si" name="option_consume_drogas" value={true} {...register("consume_droga", { required: true })} />
                                    </label>
                                    <label className="form-check-label mx-4">No
                                        <input className="form-check-input" type="radio" id="consume_drogas_no" name="option_consume_drogas" value={false} {...register("consume_droga", { required: true })} />
                                    </label>
                                    {errors.consume_droga?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Seleccione el campo</p>
                                        )
                                    }
                                </div>
                                {showCampusFem && (
                                    <div className="row">
                                        <div className="row mt-2">
                                            <div className="col-md-10 offset-1">
                                                <label htmlFor="AGO" className="form-label label-section">AGO</label>
                                            </div>
                                            <div className="col-md-2 offset-1 mt-1">
                                                <label htmlFor="num_gestas" className="form-label label-form">Número de gestas</label>
                                                <input id="num_gestas" className="form-control input-form" type="number" placeholder="Número de gestas" {...register("numero_gestas", { pattern: /^[\d]+$/ })} />
                                                {errors.numero_gestas?.type === "pattern" &&
                                                    (
                                                        <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                                    )
                                                }
                                            </div>
                                            <div className="col-md-3 offset-1 mt-1">
                                                <label htmlFor="num_partos" className="form-label label-form">Números de partos y/o cesárea</label>
                                                <input id="num_partos_cesarea" className="form-control input-form" type="number" placeholder="Número de partos cesarea" {...register("numero_partos_cesarea", { pattern: /^[\d]+$/ })} />
                                                {errors.numero_partos_cesarea?.type === "pattern" &&
                                                    (
                                                        <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                                    )
                                                }
                                            </div>
                                            <div className="col-md-3 offset-1 mt-1">
                                                <label htmlFor="num_abortos" className="form-label label-form">Abortos</label>
                                                <input id="num_abortos" className="form-control input-form" type="number" placeholder="Número de abortos" {...register("numero_abortos", { pattern: /^[\d]+$/ })} />
                                                {errors.numero_abortos?.type === "pattern" &&
                                                    (
                                                        <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                                    )
                                                }
                                            </div>
                                            <div className="col-md-2 mt-4 offset-1 mt-1">
                                                <label htmlFor="ultima_mestruacion" className="form-label label-form">Última menstruación</label>
                                                <input className="form-control input-form" id="ultima_menstruacion" type="date" placeholder="Ultima menstruación" {...register("fecha_ultima_menstruacion")} />
                                            </div>
                                            <div className="col-md-4 offset-1 mt-4">
                                                <label htmlFor="actualmente_lactando" className="form-label label-form">Actualmente lactando</label>
                                                <label className="form-check-label mx-4">Si
                                                    <input className="form-check-input" type="radio" id="lactando_si" name="option_lactando" value={true} {...register("actualmente_lactando")} />
                                                </label>
                                                <label className="form-check-label mx-4">No
                                                    <input className="form-check-input" type="radio" id="lactando_no" name="option_lactando" value={false} {...register("actualmente_lactando")} />
                                                </label>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                <label htmlFor="menoupasia" className="form-label label-form">Presenta menoupasia</label>
                                                <label className="form-check-label mx-4">Si
                                                    <input className="form-check-input" type="radio" id="menopausia-si" name="option_menopausia" value={true} {...register("presenta_menoupasia")} />
                                                </label>
                                                <label className="form-check-label mx-4">No
                                                    <input className="form-check-input" type="radio" id="menopausia_no" name="option_menopausia" value={false} {...register("presenta_menoupasia")} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {currentPage === 5 && (
                            <div className="row">
                                <div className="col-md-9 offset-1 mt-1">
                                    <label htmlFor="indicadores_diabeticos" className="form-label label-section">INDICADORES DIETÉTICOS</label>
                                </div>
                                <div className="col-md-9 offset-1 mt-1">
                                    <label htmlFor="frecuencia_alimentos" className="form-label label-form">Frecuencia de grupo de alimentos</label>
                                </div>
                                <div className="col-md-2 offset-1 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencia_cereales" placeholder="Frecuencia de cereales" {...register("frecuencia_cereales", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_cereales?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_cereales?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencia_frutas" placeholder="Frecuencia de frutas" {...register("frecuencia_frutas", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_frutas?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_frutas?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencia_verduras" placeholder="Frecuencia de verduras" {...register("frecuencia_verduras", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_verduras?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_verduras?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencia_carne" placeholder="Frecuencia de carne roja" {...register("frecuencia_carne_roja", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_verduras?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_verduras?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencia_pollo" placeholder="Frecuencia de pollo" {...register("frecuencia_pollo", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_pollo?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_pollo?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 offset-1 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencias_lacteos" placeholder="Frecuencia de lacteos" {...register("frecuencia_lacteos", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_lacteos?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_lacteos?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencia_leguminosas" placeholder="Frecuencia de leguminosas" {...register("frecuencia_leguminosas", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_leguminosas?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_leguminosas?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencias_azucar" placeholder="Frecuencia de azucar" {...register("frecuencia_azucar", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_azucar?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_azucar?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencias_grasas" placeholder="Frecuencia de grasas" {...register("frecuencia_grasas", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_grasas?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_grasas?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input className="form-control input-form" type="number" id="frecuencia_pescado" placeholder="Frecuencia de pescado" {...register("frecuencia_pescado", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.frecuencia_pescado?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.frecuencia_pescado?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>

                                <div className="col-md-3 offset-1 mt-1">
                                    <label htmlFor="veces_come" className="form-label label-form">¿Cuántas veces come al día?</label>
                                    <input className="form-control input-form" type="number" id="veces_come" placeholder="¿Cuántas veces?" {...register("cuantas_veces_come", { required: true, pattern: /^[\d]+$/ })} />
                                    {errors.cuantas_veces_come?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.cuantas_veces_come?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 mt-1">
                                    <label htmlFor="quien_prepara_alimentos" className="form-label label-form">¿Quién preparara los alimentos?</label>
                                    <input className="form-control input-form" type="text" id="quien_prepara_ali" placeholder="¿Quién?" {...register("quien_prepara_alimentos", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.quien_prepara_alimentos?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.quien_prepara_alimentos?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-3 mt-1">
                                    <label htmlFor="litros_agua" className="form-label label-form">¿Cuánto consume de agua?</label>
                                    <input className="form-control input-form" type="number" id="litros_agua" placeholder="Litros de agua que consume" step="0.01" {...register("litro_consume_agua", { required: true, valueAsNumber: true })} />
                                    {errors.litro_consume_agua?.type === "valueAsNumber" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese un número válido</p>
                                        )
                                    }
                                    {errors.litro_consume_agua?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-3 offset-1 mt-1">
                                    <label htmlFor="litros_refresco" className="form-label label-form">¿Cuánto consume de refresco?</label>
                                    <input className="form-control input-form" type="number" id="litros_refresco" placeholder="Litros de refresco que consume" step="0.01" {...register("litro_consume_refresco", { required: true, valueAsNumber: true })} />
                                    {errors.litro_consume_refresco?.type === "valueAsNumber" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese un número válido</p>
                                        )
                                    }
                                    {errors.litro_consume_refresco?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 mt-1">
                                    <label htmlFor="tipo_grasa_alimentos" className="form-label label-form">¿Qué tipo de grasa utiliza para preparar sus alimentos?</label>
                                    <input className="form-control input-form" id="grasa_alimentos" type="text" placeholder="Aceite vegetal, manteca o mantequilla" {...register("tipo_grasa_preparar_alimentos", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,]+$/ })} />
                                    {errors.tipo_grasa_preparar_alimento?.type === "valueAsNumber" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.tipo_grasa_preparar_alimento?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-3 mt-1">
                                    <label htmlFor="litros_cafe" className="form-label label-form">¿Cuánto consume de café?</label>
                                    <input className="form-control input-form" type="number" id="litros_cafe" placeholder="Litros de café que consume" step="0.01" {...register("litro_consume_cafe", { required: true, valueAsNumber: true })} />
                                    {errors.litro_consume_cafe?.type === "valueAsNumber" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese un número válido</p>
                                        )
                                    }
                                    {errors.litro_consume_cafe?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 offset-1 mt-1">
                                    <label htmlFor="alimentos_malestar" className="form-label label-form">Alimentos que causan malestar</label>
                                    <textarea className="form-control input-form" id="alimentos_malestar" placeholder="Alimentos que causan malestar" {...register("alimentos_causan_malestar", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,]+$/ })} ></textarea>
                                    {errors.alimentos_causan_malestar?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.alimentos_causan_malestar?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 offset-1 mt-1">
                                    <label htmlFor="R24" className="form-label label-form">R24</label>
                                </div>
                                <div className="col-md-5 offset-1 mt-1">
                                    <textarea className="form-control input-form" id="r24_desayuno" placeholder="Desayuno" {...register("r24_desayuno", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} />
                                    {errors.r24_desayuno?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.r24_desayuno?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-5 offset-0.6 mt-1">
                                    <textarea className="form-control input-form" id="r24_colacion_uno" placeholder="Colacion" {...register("r24_colacion_uno", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} />
                                    {errors.r24_colacion_uno?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.r24_colacion_uno?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-5 offset-1 mt-1">
                                    <textarea className="form-control input-form" id="r24_comida" placeholder="Comida" {...register("r24_comida", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} />
                                    {errors.r24_comida?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.r24_comida?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-5 offset-0.6 mt-1">
                                    <textarea className="form-control input-form" id="r24_colacion_dos" placeholder="Colación dos" {...register("r24_colacion_dos", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} />
                                    {errors.r24_colacion_dos?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.r24_colacion_dos?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-5 offset-1 mt-1">
                                    <textarea className="form-control input-form" id="r24_cena" placeholder="Cena" {...register("r24_cena", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} />
                                    {errors.r24_cena?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.r24_cena?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 offset-1 mt-1">
                                    <label htmlFor="diagnostico_nutricional" className="form-label label-form">Diagnóstico nutricio</label>
                                    <textarea className="form-control input-form" id="diagnostico_nutricio" placeholder="Diagnostico nutricional" {...register("diagnostico_nutricio", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} ></textarea>
                                    {errors.diagnostico_nutricio?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.diagnostico_nutricio?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 offset-1 mt-1">
                                    <label htmlFor="diagnostico_nutricional" className="form-label label-form">Tratamiento nutricional</label>
                                    <textarea className="form-control input-form" id="tratamiento_nutricional" placeholder="Tratamiento nutricional" {...register("tratamiento_nutricional", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú,.;\d]+$/ })} ></textarea>
                                    {errors.tratamiento_nutricional?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                    {errors.tratamiento_nutricional?.type === "required" &&
                                        (
                                            <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-5 offset-1 mt-4 mb-4">
                                    <button className="button-guardar rounded">Guardar</button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}