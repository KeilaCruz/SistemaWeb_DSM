
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { getPaciente } from "../../services/Recepcionista"
import { useState, useEffect, useContext } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import AuthContext from "../../context/AuthProvider"

export function EditPacienteForm() {
    const { register, setValue } = useForm()
    const { idPaciente } = useParams()
    const [paciente, setPaciente] = useState(null)
    const [activateEdit, setActiEdit] = useState(false)
    const { authTokens } = useContext(AuthContext)
    const handleActivateEditar = () => {
        setActiEdit(!activateEdit)
    }
    useEffect(() => {
        async function loadPaciente() {
            try {
                await setToken(authTokens.access)
                const response = await getPaciente(idPaciente)
                setPaciente(response)
            } catch (error) {
                console.error("Error al cargar el paciente", error)
            }
        }
        if (idPaciente) {
            loadPaciente();
        }
    }, [idPaciente])
    useEffect(() => {
        if (paciente) {
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
            setValue("programa_gobierno_federal", response.otros_datos.programa_gobierno.federal.participa)
            setValue("cual_programa_federal", response.otros_datos.programa_gobierno.federal.nombre)
            setValue("programa_gobierno_estatal", response.otros_datos.programa_gobierno.estatal.participa)
            setValue("cual_programa_estatal", response.otros_datos.programa_gobierno.estatal.nombre)
            setValue("programa_gobierno_municipal", response.otros_datos.programa_gobierno.municipal.participa)
            setValue("cual_programa_municipal", response.otros_datos.programa_gobierno.municipal.participa)
            setValue("numero_personas_vive", response.datos_contacto.numero_personas_vive)
        }
        if (!paciente) {
            return <div>Cargando paciente...</div>;
        }
    }, [paciente])
    return (
        <>
            <h2>Ficha de identidad del paciente</h2>
            <form>
                <label>CURP</label>
                <input id="CURP"  {...register("CURP")} disabled={true} />
                <label>Nombre(s)</label>
                <input type="text" id="nombre" {...register("nombre")} disabled={true} />
                <label>Apellido paterno</label>
                <input type="text" id="apePaterno"  {...register("apePaterno")} disabled={true} />
                <label>Apellido materno</label>
                <input type="text" id="apeMaterno"  {...register("apeMaterno")} disabled={true} />
                <label>Estado civil</label>
                <select id="estado_civil" {...register("estado_civil")} disabled={!activateEdit}>
                    <option value="Soltero">Soltero</option>
                    <option value="Casado">Casado</option>
                    <option value="Divorciado">Divorciado</option>
                </select>
                <label>Escolaridad</label>
                <select name="escolaridad" {...register("escolaridad")} disabled={!activateEdit}>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Bachillerato">Bachillerato</option>
                    <option value="Divorciado">Universidad</option>
                </select>
                <label>Colonia</label>
                <input type="text" id="colonia" {...register("colonia")} disabled={!activateEdit} />
                <label>Calle</label>
                <input type="text" id="calle" {...register("calle")} disabled={!activateEdit} />
                <label>Entre calles o referencia</label>
                <textarea type="" id="referencia" {...register("referencia")} disabled={!activateEdit} />
                <label>Telefono</label>
                <input type="text" id="telefono" {...register("telefono")} disabled={!activateEdit} />
                <label>Derechohabiencia</label>
                <input id="derecho_habiencia" {...register("derecho_habiencia")} disabled={!activateEdit} />
                <label>Georeferencia</label>
                <input type="text" id="georeferencia" {...register("unidad_salud")} disabled={!activateEdit} />
                <label>Última visita al médico</label>
                <input type="date" id="ultima_visita_medico" {...register("ultima_visita_medico")} disabled={!activateEdit} />
                <label>Es beneficiario de algún programa de gobierno</label>
                <label>Federal</label>
                <label>Si
                    <input type="radio" id="federal_si" name="programa_gobierno_federal" checked={paciente.programa_gobierno_federal === true} {...register("programa_gobierno_federal")} disabled={!activateEdit} />
                </label>
                <label>No
                    <input type="radio" id="federal_no" name="programa_gobierno_federal" checked={paciente.programa_gobierno_federal === true} {...register("programa_gobierno_federal")} disabled={!activateEdit} />
                </label>
                {paciente.programa_gobierno_federal && (
                    <div>
                        <input type="text" id="programa_federal" {...register("cual_programa_federal")} disabled={!activateEdit} />
                    </div>
                )}
                <label>Estatal</label>
                <label>Si
                    <input type="radio" id="estatal_si" name="programa_gobierno_estatal" checked={paciente.programa_gobierno_estatal === true} {...register("programa_gobierno_estatal")} disabled={!activateEdit} />
                </label>
                <label>No
                    <input type="radio" id="estatal_no" name="programa_gobierno_estatal" checked={paciente.programa_gobierno_estatal === false} {...register("programa_gobierno_estatal")} disabled={!activateEdit} />
                </label>
                {paciente.programa_gobierno_estatal && (
                    <div>
                        <input type="text" id="programa_municipal" {...register("cual_programa_estatal")} disabled={!activateEdit} />
                    </div>
                )}
                <label>Municipal</label>
                <label>Si
                    <input type="radio" id="municipal_si" name="programa_gobierno_municipal" defaultChecked={paciente.programa_gobierno_municipal === true} {...register("programa_gobierno_municipal")} disabled={!activateEdit} />
                </label>
                <label>No
                    <input type="radio" id="municipal_no" name="programa_gobierno_municipal" defaultChecked={paciente.programa_gobierno_municipal === false} {...register("programa_gobierno_municipal")} disabled={!activateEdit} />
                </label>
                {paciente.programa_gobierno_municipal && (
                    <div>
                        <input type="text" id="programa_federal" {...register("cual_programa_municipal")} disabled={!activateEdit} />
                    </div>
                )}
                <input type="number" id="num_per_vive"  {...register("numero_personas_vive")} disabled={!activateEdit}></input>
                {activateEdit && (
                    <div>
                        <button>Guardar</button>
                    </div>
                )}
            </form>
            <button onClick={handleActivateEditar}>Editar</button>
        </>
    )
}

