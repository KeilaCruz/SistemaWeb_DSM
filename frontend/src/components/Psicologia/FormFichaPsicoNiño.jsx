import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization";
import { searchPaciente } from "../../services/Recepcionista";
import { PacienteCard } from "../Paciente/PacienteCard";

export function FormFichaPsicoNiño({ onSubmit, register, pacienteSelect, setPacienteSelect, errors, trigger }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { authTokens } = useContext(AuthContext);
    const [criterio, setCriterio] = useState("")
    const [paciente, setPaciente] = useState([])
    const [isResult, setIsResult] = useState(true)
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([])

    const handleBarraBusqueda = (evt) => {
        setCriterio(evt.target.value)
    }
    const handleBuscarPaciente = async () => {
        try {
            if (criterio.trim() === "") {
                setIsResult(false);
                return;
            }
            await setToken(authTokens.access);
            const response = await searchPaciente(criterio)
            setPaciente(response)
            setIsResult(response.length > 0)
        } catch (error) {
            console.error(error)
            setIsResult(false)
        }
    }
    const selectPaciente = (CURP) => {
        setPacienteSelect(CURP)
    }
    const handleNextPage = async () => {
        const isValid = await trigger()
        if (isValid && currentPage < 4) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleFileChange = (evt) => {
        const archivos = evt.target.files;
        const nombreArchivos = Array.from(archivos).map((archivo) => archivo.name)
        setArchivosSeleccionados(nombreArchivos)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row g-3 ">
                    <div className="col-md-10 offset-md-1 text-center ">
                        <hr />
                        <h3 className="title">FICHA DE IDENTIFICACIÓN PARA NIÑOS</h3>
                        <hr />
                    </div>
                </div>
                <form onSubmit={onSubmit} className="row g-3 mt-2 align-items-center">
                    {currentPage === 1 && (
                        <div className="row">
                            <div className="row">
                                <div className="col-md-6 offset-1 mt-1">
                                    <input className="form-control " id="barra_busqueda" type="search" placeholder="Buscar por CURP o nombre" onChange={handleBarraBusqueda} />
                                </div>
                                <div className="col-md-2 mt-1">
                                    <button type="button" onClick={handleBuscarPaciente} className="button-buscar rounded">
                                        <i class="lni lni-search-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-9 offset-md-1 mt-3">
                                <label htmlFor="datos_generales" className="form-label label-section">DATOS GENERALES</label>
                            </div>
                            <div className="col-md-9 offset-1">
                                {isResult ? (
                                    <div>
                                        {paciente.map(paciente => (
                                            <PacienteCard paciente={paciente} key={paciente.CURP} handleSelect={selectPaciente} isSelected={paciente.CURP === pacienteSelect} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-danger mt-4">NO SE ENCONTRARON RESULTADOS DE BÚSQUEDA</p>
                                )}
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="codigo_expediente" className="form-label label-form">Expediente</label>
                                <input id="codigo_expediente" className="form-control " type="text" placeholder="Número de expediente" {...register("expedienteFicha", { required: true, pattern: /^[A-Za-z0-9]+$/ })} />
                                {errors.expedienteFicha?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.expedienteFicha?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="años_edad" className="form-label label-form">Años de edad</label>
                                <input id="años_edad" className="form-control " type="number" placeholder="Años" {...register("años", { required: true })} />
                                {errors.años?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.años?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="meses_edad" className="form-label label-form">Meses de edad</label>
                                <input id="meses_edad" className="form-control " type="number" placeholder="Meses"{...register("meses", { required: true })} />
                                {errors.meses?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.meses?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="fecha_nacimiento" className="form-label label-form">Fecha de nacimiento</label>
                                <input id="fecha_nacimiento" className="form-control " type="date" placeholder="Fecha de nacimiento" {...register("fecha_nacimiento", { required: true })} />
                                {errors.fecha_nacimiento?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="lugar_nacimiento" className="form-label label-form">Lugar de nacimiento</label>
                                <input id="lugar_nacimiento" className="form-control " type="text" placeholder="Lugar de nacimiento" {...register("lugar_nacimiento", { required: true, pattern: /^[A-Za-z .#,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.lugar_nacimiento?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.lugar_nacimiento?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="grado_escolar" className="form-label label-form">Grado escolar</label>
                                <input id="grado_escolar" className="form-control " type="text" placeholder="Grado escolar" {...register("grado_escolar", { required: true, pattern: /^[A-Za-z .°,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.grado_escolar?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.grado_escolar?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="nom_escuela" className="form-label label-form">Nombre de la escuela</label>
                                <input id="nom_escuela" className="form-control " type="text" placeholder="Nombre de la escuela" {...register("nombre_escuela", { required: true, pattern: /^[A-Za-z .°#,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.nombre_escuela?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.nombre_escuela?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="ubicacion_escuela" className="form-label label-form">Ubicación de la escuela</label>
                                <input id="ubicacion_escuela" className="form-control " type="text" placeholder="Ubicación de la escuela" {...register("ubicacion_escuela", { required: true, pattern: /^[A-Za-z .°#,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.ubicacion_escuela?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.ubicacion_escuela?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="lugar_ocupa_familia" className="form-label label-form">Lugar que ocupa el niño en la familia</label>
                                <input id="lugar_ocupa_familia" className="form-control " type="text" placeholder="Lugar ocupa el niño en la familia" {...register("lugar_ocupa_familia", { required: true, pattern: /^[A-Za-z .°#,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.lugar_ocupa_familia?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.lugar_ocupa_familia?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="info_hermanos" className="form-label label-form">Informacion de los hermanos</label>
                                <textarea id="info_hermanos" className="form-control " placeholder="Nombres, edades y ocupaciones de los hermanos(orden descendente)"{...register("informacion_hermanos", { required: true, pattern: /^[A-Za-z ,ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.informacion_hermanos?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.informacion_hermanos?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="nom_padre" className="form-label label-form">Nombre del padre</label>
                                <input id="nom_padre" className="form-control " type="text" placeholder="Nombre del padre" {...register("nombre_padre", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                {errors.nombre_padre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.nombre_padre?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_padre" className="form-label label-form">Edad</label>
                                <input id="edad_padre" className="form-control " type="number" placeholder="Edad" {...register("edad_padre", { required: true })} />
                                {errors.edad_padre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_padre?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="escolaridad_padre" className="form-label label-form">Escolaridad</label>
                                <select id="escolaridad-padre" className="form-control " {...register("escolaridad_padre", { required: true })}>
                                    <option value="Primaria">Primaria</option>
                                    <option value="Secundaria">Secundaria</option>
                                    <option value="Bachillerato">Bachillerato</option>
                                    <option value="Bachillerato">Licenciatura</option>
                                </select>
                                {errors.escolaridad_padre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Selecciona la opción</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="ocupacion_padre" className="form-label label-form">Ocupación</label>
                                <input id="ocupacion_padre" className="form-control " type="text" placeholder="Ocupación" {...register("ocupacion_padre", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                {errors.ocupacion_padre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.ocupacion_padre?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="nom_madre" className="form-label label-form">Nombre de la madre</label>
                                <input id="nom_madre" className="form-control " type="text" placeholder="Nombre" {...register("nombre_madre", { required: true, pattern: /^[A-Za-z ,ÁÉÍÓÚáéíóú]+$/ })} />
                                {errors.nombre_madre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.nombre_madre?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_madre" className="form-label label-form">Edad</label>
                                <input id="edad_madre" className="form-control " type="number" placeholder="Edad" {...register("edad_madre", { required: true })} />
                                {errors.edad_madre?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="escolaridad_madre" className="form-label label-form">Escolaridad</label>
                                <select className="form-control " id="escolaridad-madre" {...register("escolaridad_madre", { required: true })}>
                                    <option value="Primaria">Primaria</option>
                                    <option value="Secundaria">Secundaria</option>
                                    <option value="Bachillerato">Bachillerato</option>
                                    <option value="Bachillerato">Licenciatura</option>
                                </select>
                                {errors.escolaridad_madre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Selecciona la opción</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="ocupacion_madre" className="form-label label-form">Ocupacion</label>
                                <input id="ocupacion_madre" className="form-control " type="text" placeholder="Ocupación" {...register("ocupacion_madre", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                {errors.ocupacion_madre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.ocupacion_madre?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="estado_padres" className="form-label label-form">Estado civil de los padres</label>
                                <select className="form-control " id="estado-padres" {...register("estado_civil_padres", { required: true })}>
                                    <option value="Primaria">Casados</option>
                                    <option value="Primaria">Divorciados</option>
                                </select>
                                {errors.estado_civil_padres?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Seleccione la opción</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="años_casados" className="form-label label-form">Años</label>
                                <input id="años_casados" className="form-control " type="number" placeholder="Años" {...register("años_estado_civil", { required: true })} />
                                {errors.años_estado_civl?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="no_conocer_padres" className="form-label sub-title">En el caso que el niño no viva con los padres</label>
                            </div>
                            <div className="row">
                                <div className="col-md-4 offset-md-1 mt-1">
                                    <label htmlFor="edad_tutor" className="form-label label-form">Nombre o nombres</label>
                                    <input id="nom_tutor" className="form-control " type="text" placeholder="Nombre del tutor o tutores del niño" {...register("nombre_tutor", { pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.nombre_tutor?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 offset-md-1 mt-1">
                                    <label htmlFor="edad_tutor" className="form-label label-form">Edad</label>
                                    <input id="edad_tutor" className="form-control " type="number" placeholder="Edad" {...register("edad_tutor")} />
                                    {errors.edad_tutor?.type === "valueAsNumber" &&
                                        (
                                            <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 offset-md-1 mt-1">
                                    <label htmlFor="ocupacion_tutor" className="form-label label-form">Ocupación</label>
                                    <input id="ocupacuion" className="form-control " type="text" placeholder="Ocupacion" {...register("ocupacion_tutor", { pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                    {errors.ocupacion_tutor?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 offset-md-1 mt-1">
                                    <label htmlFor="motivos_niño_acargo" className="form-label label-form">Motivos por los cuales el niño está a su cargo</label>
                                    <input id="motivos_niño_acargo" className="form-control " type="text" placeholder="Motivos" {...register("motivos_niño_cargo_tutor", { pattern: /^[A-Za-z .,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                    {errors.motivos_niño_cargo_tutor?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-4 offset-md-1 mt-1">
                                    <label htmlFor="desde_cuando_acargo" className="form-label label-form">Desde cuándo</label>
                                    <input id="desde_cuando_acargo" className="form-control " type="text" placeholder="Desde cuándo" {...register("desde_cuando_tutor", { pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                    {errors.desde_cuando_tutor?.type === "pattern" &&
                                        (
                                            <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="info_vive_niño" className="form-label label-form">Información con los que vive el niño</label>
                                <textarea id="info_vive_niño" className="form-control " placeholder="Personas que viven casa con el niño, nombre, edad, parentesco y ocupación de cada uno (no padres ni hermanos)" {...register("descripcion_viven_con_niño", { required: true, pattern: /^[A-Za-z .°,ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.descripcion_viven_con_niño?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.descripcion_viven_con_niño?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="motivo_consulta" className="form-label label-form">Motivo de consulta reportado por los padres</label>
                                <textarea id="motivos_consulta" className="form-control " placeholder="Motivo" {...register("motivo", { required: true, pattern: /^[A-Za-z .,ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.motivo?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.motivo?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="canalizado_por" className="form-label label-form">Canalizador por quién</label>
                                <input id="canalizado_por" className="form-control " type="text" placeholder="Canalizado por" {...register("canalizado_por", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]+$/ })} />
                                {errors.canalizado_por?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.canalizado_por?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>

                        </div>
                    )}
                    {currentPage === 2 && (
                        <div className="row">
                            <div className="col-md-9 offset-md-1">
                                <label htmlFor="antecedentes_padecimiento_actual" className="form-label label-section">ANTECEDENTES RESPECTO AL PADECIMIENTO ACTUAL</label>
                            </div>
                            <div className="col-md-4 offset-md-1 mt-2">
                                <label htmlFor="asistencia_anterior" className="form-label label-form">Asistencia con otro profesional</label>
                                <label className="form-check-label mx-2">Si
                                    <input className="form-check-input" type="radio" id="asistencia_si" name="asistencia_profesional" value={true} {...register("consulta_otro_profesional", { required: true })} />
                                </label>
                                <label className="form-check-label mx-2">No
                                    <input className="form-check-input" type="radio" id="asistencia_no" name="asistencia_profesional" value={false} {...register("consulta_otro_profesional", { required: true })} />
                                </label>
                                {errors.consulta_otro_profesional?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Seleccione la opción</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="diagnostico_medico" className="form-label label-form">Diagnóstico</label>
                                <textarea id="diagnostico_otorgado" className="form-control " placeholder="Diagnóstico otorgado" {...register("diagnostico_otorgado", { pattern: /^[A-Za-z .,ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.diagnostico_otorgado?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-5 offset-md-1 mt-1">
                                <label className="form-label label-form">El niño actualmente toma algún medicamento</label>
                                <label className="form-check-label mx-2">Si
                                    <input className="form-check-input" type="radio" id="medicacion-si" name="option-medicacion" value={true} {...register("toma_medicamento", { required: true })} />
                                </label>
                                <label className="form-check-label mx-2">No
                                    <input className="form-check-input" type="radio" id="medicacion-no" name="option-medicacion" value={false} {...register("toma_medicamento", { required: true })} />
                                </label>
                                {errors.toma_medicamento?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.toma_medicamento?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="motivo_medicamento" className="form-label label-form">Motivo</label>
                                <input id="motivo_medicamento" className="form-control " type="text" placeholder="Motivo" {...register("motivo_medicamento", { pattern: /^[A-Za-z .,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.motivo_medicamento?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="nom_medicamento" className="form-label label-form">Nombre</label>
                                <input input="nom_medicamento" className="form-control " type="text" placeholder="Nombre del medicamento" {...register("nombre_medicamento", { pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.nombre_medicamento?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="dosis_medicamento" className="form-label label-form">Dosis</label>
                                <input className="form-control " id="dosis_medicamento" type="text" placeholder="Dosis del medicamento" {...register("dosis_medicamento", { pattern: /^[A-Za-z .°ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.dosis_medicamento?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="otro_estudio" className="form-label label-form">Algún otro estudio</label>
                                <input id="otro_estudio" className="form-control " type="text" placeholder="Se le ha realizado algún otro tipo de estudio (señalarlo)" {...register("realizado_estudio", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.realizado_estudio?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.realizado_estudio?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                        </div>
                    )}
                    {currentPage === 3 && (
                        <div className="row">
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="antecedentes_desarrollo" className="form-label label-section">ANTECEDENTES DEL DESARROLLO</label>
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="num_embarazos" className="form-label label-form">Número de embarazos de la madre</label>
                                <input id="numero_embarazos_madre" className="form-control " type="number" placeholder="Número" {...register("numero_embarazos_madre", { required: true })} />
                                {errors.numero_embarazos_madre?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.numero_embarazos_madre?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="tiempo_gestacion" className="form-label label-form">Tiempo gestación del niño</label>
                                <input className="form-control " type="number" id="tiempo_gestacion" placeholder="Tiempo" {...register("tiempo_gestacion", { required: true })} />
                                {errors.tiempo_gestacion?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.tiempo_gestacion?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="complicaciones_embarazo" className="form-label label-form">Problemas, enfermedades o complicaciones durante el embarazo</label>
                                <textarea className="form-control " placeholder="Descripción" {...register("problemas_durante_embarazo", { required: true, pattern: /^[A-Za-z ,ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.problemas_durante_embarazo?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.problemas_durante_embarazo?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-5 offset-md-1 mt-1">
                                <label htmlFor="medicamentos_embarazo" className="form-label label-form">Ingirió medicamentos durante el embarazo</label>
                                <label className="form-check-label mx-2">Si
                                    <input className="form-check-input" type="radio" id="medi-embarazo-si" name="option-embarazo" value={true} {...register("medicamentos_embarazo", { required: true })} />
                                </label>
                                <label className="form-check-label mx-2">No
                                    <input className="form-check-input" type="radio" id="medi-embarazo-no" name="option-embarazo" value={false} {...register("medicamentos_embarazo", { required: true })} />
                                </label>
                                {errors.medicamentos_embarazo?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Seleccione la opción</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="motivo_medicamento_embarazo" className="form-label label-form">Motivo</label>
                                <input className="form-control " id="motivo_medicamento" type="text" placeholder="Motivo" {...register("motivo_medicamento_embarazo", { pattern: /^[A-Za-z ,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.motivo_medicamento_embarazo?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="nom_medicamento_embarazo" className="form-label label-form">Nombre</label>
                                <input id="nom_medicamento_embarazo" className="form-control " type="text" placeholder="Nombre del medicamento" {...register("nombre_medicamento_embarazo", { pattern: /^[A-Za-z ,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.nombre_medicamento_embarazo?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1">
                                <label htmlFor="dosis_medicamento_embarazo" className="form-label label-form">Dosis</label>
                                <input id="dosis_medicamento_embarazo" className="form-control " type="text" placeholder="Dosis del medicameto" {...register("dosis_medicamento_embarazo", { pattern: /^[A-Za-z .°ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.dosis_medicamento_embarazo?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="tipo_parto" className="form-label label-form">Tipo de parto</label>
                                <select className="form-select " id="tipo_parto" {...register("tipo_parto", { required: true })}>
                                    <option value="" disabled selected>Elija tipo de parto</option>
                                    <option value="natural">Parto natural</option>
                                    <option value="normal">Parto normal</option>
                                    <option value="agua">Parto en el agua</option>
                                    <option value="cuclillas">Parto en cuclillas</option>
                                    <option value="forceps">Parto con fórceps</option>
                                    <option value="forceps">Parto Leboyer</option>
                                    <option value="cesarea">Cesárea</option>
                                </select>
                                {errors.tipo_parto?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Seleccione la opción</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="duracion_parto" className="form-label label-form">Duración</label>
                                <input id="duracion_parto" className="form-control " type="text" placeholder="Duración" {...register("duracion_parto", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.duracion_parto?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.duracion_parto?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="complicaciones_parto" className="form-label label-form">Complicaciones en el parto</label>
                                <input id="complicaciones_parto" className="form-control " type="text" placeholder="Complicaciones" {...register("complicaciones_parto", { required: true, pattern: /^[A-Za-z ,ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.complicaciones_parto?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.complicaciones_parto?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="peso_nacer" className="form-label label-form">Peso al nacer</label>
                                <input id="peso_nacer" className="form-control " type="number" step="any" placeholder="Peso kg" {...register("peso_nacer", { required: true })} />
                                {errors.peso_nacer?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.peso_nacer?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="talla_nacer" className="form-label label-form">Talla</label>
                                <input className="form-control " type="number" step="any" placeholder="Talla cm" {...register("talla_nacer", { required: true })} />
                                {errors.talla_nacer?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.talla_nacer?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-3">
                                <label htmlFor="alimentacion_seno_materno" className="form-label label-form">Alimentación por seno materno</label>
                                <label className="form-check-label mx-2">Si
                                    <input className="form-check-input" type="radio" id="alimentacion-seno-si" name="option-alimentacion-seno" value={true} {...register("alimentacion_seno_materno", { required: true })} />
                                </label>
                                <label className="form-check-label mx-2">No
                                    <input className="form-check-input" type="radio" id="alimentacion-seno-no" name="option-alimentacion-seno" value={false} {...register("alimentacion_seno_materno", { required: true })} />
                                </label>
                                {errors.alimentacion_seno_materno?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Selecciona la opción</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="tiempo_alimentacion_seno" className="form-label label-form">Tiempo de alimentación por seno</label>
                                <input className="form-control " id="tiempo_alimentacion_seno" type="text" placeholder="Tiempo" {...register("tiempo_alimentacion_seno", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.tiempo_alimentacion_seno?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.tiempo_alimentacion_seno?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>

                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_sosten_cefalico" className="form-label label-form">Edad a la que logo sostén cefálico</label>
                                <input id="edad_sosten_cefalico" className="form-control " type="number" placeholder="Edad" {...register("edad_sosten_cefalico", { required: true })} />
                                {errors.edad_sosten_cefalico?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_sosten_cefalico?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_aparicion_balbuceo" className="form-label label-form">Edad de aparicion del balbuceo</label>
                                <input id="edad_balbuceo" className="form-control " type="number" placeholder="Edad" {...register("edad_balbuceo", { required: true })} />
                                {errors.edad_balbuceo?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_balbuceo?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_logro_sentarse" className="form-label label-form">Edad a la que logró sentarse</label>
                                <input id="edad_logro_sentarse" className="form-control " type="number" placeholder="Edad" {...register("edad_sentarse", { required: true })} />
                                {errors.edad_sentarse?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_sentarse?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_logro_ponerse_pie" className="form-label label-form">Edad a la que logró sentarse</label>
                                <input type="number" className="form-control " id="edad_logro_ponerse_pie" placeholder="Edad" {...register("edad_ponerse_pie", { required: true })} />
                                {errors.edad_ponerse_pie?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_ponerse_pie?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="controla_esfinter" className="form-label label-form">Edad a la que caminó sin ayuda</label>
                                <input id="edad_camino" className="form-control " type="number" placeholder="Edad" {...register("edad_camino", { required: true })} />
                                {errors.edad_camino?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_camino?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-3">
                                <label className="form-label label-form">Controla actualmente esfinter</label>
                                <label className="form-check-label mx-2">Si
                                    <input className="form-check-input" type="radio" id="controla-esfinter-si" name="option-esfinter" value={true} {...register("controla_esfinter", { required: true })} />
                                </label>
                                <label className="form-check-label mx-2">No
                                    <input className="form-check-input" type="radio" id="controla-esfinter-no" name="option-esfinter" value={false} {...register("controla_esfinter", { required: true })} />
                                </label>
                                {errors.controla_esfinter?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_control_esfinter" className="form-label label-form">Edad de control</label>
                                <input className="form-control " id="edad_control_esfinter" type="number" placeholder="Edad" {...register("edad_control_esfinter", { required: true })} />
                                {errors.edad_control_esfinter?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_control_esfinter?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="enfermedad_primer_año" className="form-label label-form">Enfermedades significativas durante el primer año de vida</label>
                                <textarea id="enfermedad_primer_año" className="form-control " placeholder="Enfermedades significativas" {...register("enfermedades_primer_año_vida", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.enfermedades_primer_año_vida?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.enfermedades_primer_año_vida?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="enfermedades_posteriores" className="form-label label-form">Enfermedades posteriores</label>
                                <textarea className="form-control " id="enfermedades_posteriores" placeholder="Enfermedades, operaciones, crisis febriles, o accidentes posteriores" {...register("enfermedades_posteriores", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.enfermedades_posteriores?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.enfermedades_posteriores?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="antecedentes_padecimiento" className="form-label label-form">Antecedentes familiares hereditarios vinculados al padecimiento actual</label>
                                <input id="antecedentes_padecimiento" className="form-control " type="text" placeholder="Antecedentesfamiliares hereditarios" {...register("antecedentes_padecimiento_actual", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.antecedentes_padecimiento_actual?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.antecedentes_padecimiento_actual?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="salud_fisica_actual" className="form-label label-form">Salud física Actual</label>
                                <textarea id="salud_fisica_actual" className="form-control " placeholder="Salud física actual (energia, fatiga, regularidad de funciones, sueño, quejas, alimentación " {...register("salud_fisica_actual", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú\d]+$/ })}></textarea>
                                {errors.salud_fisica_actual?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.salud_fisica_actual?.type === "pattern" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                        </div>
                    )}
                    {currentPage === 4 && (
                        <div className="row">
                            <div className="col-md-9 offset-md-1">
                                <label htmlFor="area_escolar" className="form-label label-section">ÁREA ESCOLAR</label>
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="edad_ingreso_sistema" className="form-label label-form">Edad de ingreso al sistema escolar</label>
                                <input id="edad_ingreso_escolar" className="form-control " type="number" placeholder="Edad" {...register("edad_ingreso_escolar", { required: true })} />
                                {errors.edad_ingreso_escolar?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.edad_ingreso_escolar?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label htmlFor="nivel_ingreso" className="form-label label-form">Nivel</label>
                                <input id="nivel_ingreso" className="form-control " type="text" placeholder="Nivel" {...register("nivel_ingreso", { required: true, pattern: /^[A-Za-z °ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.nivel_ingreso?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.nivel_ingreso?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-9 offset-md-1 mt-1">
                                <label htmlFor="conducta_niño" className="form-label label-form"> Conducta del niño al ingresar a la escuela de acuerdo a padres y maestros</label>
                                <input id="conducta_niño" className="form-control " type="text" placeholder="Conducta" {...register("conducta_ingreso", { required: true, pattern: /^[A-Za-z ,.ÁÉÍÓÚáéíóú\d]+$/ })} />
                                {errors.conducta_ingreso?.type === "required" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                                    )
                                }
                                {errors.conducta_ingreso?.type === "valueAsNumber" &&
                                    (
                                        <p className="mt-2 mb-2 errors"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                                    )
                                }
                            </div>
                            <div className="col-md-5 offset-md-1 mt-2">
                                <input className="form-control" type="file" id="archivo" onChange={handleFileChange} multiple {...register("archivo")} />
                                {archivosSeleccionados.map((nombreArchivo, index) => (
                                    <label key={index}>{nombreArchivo}</label>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className=" col-md-9 mt-4 d-flex  offset-md-1 justify-content-between">
                        {currentPage > 1 && (
                            <button type="button" className="btn button-pagination me-2 rounded" onClick={handlePrevPage}>Anterior</button>
                        )}
                        {currentPage < 4 ? (
                            <button type="button" className="btn button-pagination rounded" onClick={handleNextPage}>Siguiente</button>
                        ) : (
                            <button type="submit" className="btn button-guardar rounded">Enviar</button>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

