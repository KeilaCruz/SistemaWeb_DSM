
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { getPaciente } from "../../services/Recepcionista"
import { useState, useEffect, useContext } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import AuthContext from "../../context/AuthProvider"

export function EditPacienteForm({ onSubmit, registro }) {
    const { register, setValue } = useForm()
    const { idPaciente } = useParams()
    const [paciente, setPaciente] = useState({})
    const [activateEdit, setActiEdit] = useState(false)
    const [programaFederal, setProgramaFederal] = useState(false);
    const [programaEstatal, setProgramaEstatal] = useState(false);
    const [programaMunicipal, setProgramaMunicipal] = useState(false);
    const { authTokens } = useContext(AuthContext)
    const handleActivateEditar = () => {
        setActiEdit(!activateEdit)
    }
    useEffect(() => {
        async function loadInput() {
            try {
                await setToken(authTokens.access)
                const response = await getPaciente(idPaciente);
                setPaciente(response)
                setValue("nombre", response.datos_personales.nombre)
                setValue("apePaterno", response.datos_personales.apePaterno)
                setValue("apeMaterno", response.datos_personales.apeMaterno)
                setValue("edad", response.datos_personales.edad)
                setValue("estado_civil", response.datos_personales.estado_civil)
                setValue("CURP", response.CURP)
                setValue("escolaridad", response.datos_personales.escolaridad)
                setValue("colonia", response.datos_direccion.colonia)
                setValue("calle", response.datos_direccion.calle)
                setValue("numero_exterior", response.datos_direccion.numero_exterior)
                setValue("referencia", response.datos_direccion.referencia)
                setValue("CP", response.datos_direccion.CP)
                setValue("telefono", response.datos_contacto.telefono)
                setValue("derecho_habiencia", response.datos_contacto.derecho_habiencia)
                setValue("unidad_salud", response.datos_contacto.unidad_salud)
                setValue("ultima_visita_medico", response.datos_contacto.ultima_visita_medico)
                setValue("programa_gobierno_federal", response.otros_datos?.participa_programa_federal || false);
                setValue("cual_programa_federal", response.otros_datos?.nombre_programa_federal || '');
                setValue("programa_gobierno_estatal", response.otros_datos?.participa_programa_estatal || false);
                setValue("cual_programa_estatal", response.otros_datos?.nombre_programa_estatal || '');
                setValue("programa_gobierno_municipal", response.otros_datos?.participa_programa_municipal || false);
                setValue("cual_programa_municipal", response.otros_datos?.nombre_programa_municipal || '');
                setProgramaFederal(response.otros_datos?.participa_programa_federal || false);
                setProgramaEstatal(response.otros_datos?.participa_programa_estatal || false);
                setProgramaMunicipal(response.otros_datos?.participa_programa_municipal || false);
                setValue("numero_personas_vive", response.datos_contacto.numero_personas_vive)
            } catch (error) {
                console.error("error al cargar input", error)
            }
        }
        loadInput();
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row g-2 mt-5">
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">FICHA DE IDENTIDAD DEL PACIENTE</h3>
                        <hr />
                    </div>
                </div>
                <form onSubmit={onSubmit} className="row g-3">
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="CURP" className="form-label label-form">CURP</label>
                        <input id="CURP" className="form-control input-form" type="text" {...register("CURP")} disabled={true} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nombre" className="form-label label-form">Nombre(s)</label>
                        <input type="text" id="nombre" className="form-control input-form" {...register("nombre")} disabled={true} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apePaterno" className="form-label label-form">Apellido paterno</label>
                        <input type="text" id="apePaterno" className="form-control input-form" {...register("apePaterno")} disabled={true} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apeMaterno" className="form-label label-form">Apellido materno</label>
                        <input type="text" id="apeMaterno" className="form-control input-form" {...register("apeMaterno")} disabled={true} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="estado_civil" className="form-label label-form">Estado civil</label>
                        <select id="estado_civil" className="form-select input-form" {...register("estado_civil")} disabled={!activateEdit}>
                            <option value="" disabled selected>Elija estado civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Divorciado">Divorciado</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="escolaridad" className="form-label label-form" >Escolaridad</label>
                        <select name="escolaridad" className="form-select input-form" {...register("escolaridad")} disabled={!activateEdit}>
                            <option value="" disabled selected>Elija estado civil</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Bachillerato">Bachillerato</option>
                            <option value="Divorciado">Universidad</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="colonia" className="form-label label-form">Colonia</label>
                        <input type="text" id="colonia" className="form-control input-form" {...register("colonia")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="calle" className="form-label label-form">Calle</label>
                        <input type="text" id="calle" className="form-control input-form" {...register("calle")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="referencia" className="form-label label-form">Entre calles o referencia</label>
                        <textarea type="text" id="referencia" className="form-control input-form" {...register("referencia")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="telefono" className="form-label label-form">Telefono</label>
                        <input type="text" id="telefono" className="form-control input-form" {...register("telefono")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="derecho_habiencia" className="form-label label-form">Derechohabiencia</label>
                        <input id="derecho_habiencia" className="form-control input-form" {...register("derecho_habiencia")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="georeferencia" className="form-label label-form">Georeferencia</label>
                        <input type="text" id="georeferencia" className="form-control input-form" {...register("unidad_salud")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="ultima_visita_medico" className="form-label label-form">Última visita al médico</label>
                        <input type="date" id="ultima_visita_medico" className="form-control input-form" {...register("ultima_visita_medico")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="num_persona_vive" className="form-label label-form">Número de personas con la que vive</label>
                        <input type="number" id="num_persona_vive" className="form-control input-form"  {...register("numero_personas_vive")} disabled={!activateEdit}></input>
                    </div>
                    <div className="col-md-10 offset-md-1">
                        <label className="form-label label-form">Es beneficiario de algún programa de gobierno</label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">Federal</label>
                        <label htmlFor="federal_si" className="form-label mx-2">Si
                            <input
                                type="radio" id="federal_si" name="programa_gobierno_federal" checked={programaFederal} onChange={() => {
                                    setProgramaFederal(true);
                                    setValue("programa_gobierno_federal", true);
                                }}
                                disabled={!activateEdit}
                            />
                        </label>
                        <label htmlFor="federal_no" className="form-label mx-2">No
                            <input
                                type="radio" id="federal_no" name="programa_gobierno_federal" checked={!programaFederal} onChange={() => {
                                    setProgramaFederal(false);
                                    setValue("programa_gobierno_federal", false);
                                }}
                                disabled={!activateEdit}
                            />
                        </label>
                    </div>

                    {paciente && paciente.otros_datos && paciente.otros_datos.participa_programa_federal && (
                        <div>
                            <input type="text" id="programa_federal" {...register("cual_programa_federal")} disabled={!activateEdit} />
                        </div>
                    )}

                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">Estatal</label>
                        <label htmlFor="estatal_si" className="form-label mx-2">Si
                            <input
                                type="radio" id="estatal_si" name="programa_gobierno_estatal" checked={programaEstatal} onChange={() => {
                                    setProgramaEstatal(true);
                                    setValue("programa_gobierno_estatal", true);
                                }}
                                disabled={!activateEdit}
                            />
                        </label>
                        <label htmlFor="estatal_no" className="form-label mx-2">No
                            <input
                                type="radio" id="estatal_no" name="programa_gobierno_estatal" checked={!programaEstatal} onChange={() => {
                                    setProgramaEstatal(false);
                                    setValue("programa_gobierno_estatal", false);
                                }}
                                disabled={!activateEdit}
                            />
                        </label>
                    </div>

                    {paciente && paciente.otros_datos && paciente.otros_datos.participa_programa_estatal && (
                        <div className="col-md-4 offset-md-1">
                            <input type="text" id="programa_estatal" {...register("cual_programa_estatal")} disabled={!activateEdit} />
                        </div>
                    )}

                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">Municipal</label>
                        <label htmlFor="municipal_si" className="form-label mx-2">Si
                            <input
                                type="radio" id="municipal_si" name="programa_gobierno_municipal" checked={programaMunicipal} onChange={() => {
                                    setProgramaMunicipal(true);
                                    setValue("programa_gobierno_municipal", true);
                                }}
                                disabled={!activateEdit}
                            />
                        </label>
                        <label htmlFor="municipal_no" className="form-label mx-2">No
                            <input
                                type="radio" id="municipal_no" name="programa_gobierno_municipal" checked={!programaMunicipal} onChange={() => {
                                    setProgramaMunicipal(false);
                                    setValue("programa_gobierno_municipal", false);
                                }}
                                disabled={!activateEdit}
                            />
                        </label>
                    </div>

                    {paciente && paciente.otros_datos && paciente.otros_datos.participa_programa_municipal && (
                        <div className="col-md-4 offset-md-1">
                            <input type="text" id="programa_municipal" {...register("cual_programa_municipal")} disabled={!activateEdit} />
                        </div>
                    )}

                    {activateEdit && (
                        <div>
                            <button>Guardar</button>
                        </div>
                    )}
                </form>
                <button onClick={handleActivateEditar}>Editar</button>
            </div>
        </>
    )
}

