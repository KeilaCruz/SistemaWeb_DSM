import { useContext, useEffect, useState } from "react"
import { searchPaciente } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider"

export function FormCita({ onSubmit, register, pacienteSelect }) {
    const { authTokens } = useContext(AuthContext);
    const [criterio, setCriterio] = useState("")
    const [paciente, setPaciente] = useState([])
    const handleBarraBusqueda = (evt) => {
        setCriterio(evt.target.value)
    }
    useEffect(() => {
        const loadPaciente = async () => {
            try {
                await setToken(authTokens.access)
                const data = await searchPaciente(criterio)
                setPaciente(data)
            } catch (error) {
                console.error(error)
            }
        }
        loadPaciente()
    }, [criterio])

    const selectPaciente = (CURP) => {
        pacienteSelect(CURP)
    }
    return (
        <>

            <div className="container-fluid">
                <div className="row g-3 mt-5">
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">AGENDAR CITA</h3>
                        <hr />
                    </div>
                    <div className="col-md-6 offset-1 mt-5">
                        <input className="form-control input-form" type="text" id="busqueda_paciente" placeholder="Buscar por CURP o nombre" onChange={handleBarraBusqueda} />
                    </div>
                </div>
                <form onSubmit={onSubmit} className="row g-3 mt-2">
                    <div className="col-md-2 offset-1">
                        <label htmlFor="fecha_cita" className="form-label label-form">Fecha de cita</label>
                        <input className="form-control input-form" id="fecha_cita" type="date" placeholder="fecha de cita" {...register('fecha_cita', { required: true })} />
                    </div>
                    <div className="col-md-3 offset-1">
                        <label htmlFor="horario_cita" className="form-label label-form">Horario de cita</label>
                        <input className="form-control input-form" id="horario_cita" type="time" placeholder="hora_cita" {...register('hora_cita', { required: true })} />
                    </div>
                    <div className="col-md-3 offset-1">
                        <label htmlFor="especialidad_cita" className="form-label label-form">Especialidad de cita</label>
                        <select className="form-control input-form" id="especialidad" {...register("especialidad", { required: true })}>
                            <option value="" disabled>Elija especialidad</option>
                            <option value="Nutricion">Nutrición</option>
                            <option value="Medico-general">Medico general</option>
                            <option value="Odontologia">Odontología</option>
                            <option value="Psicologia">Psicologia</option>
                        </select>
                    </div>
                    <div className="col-md-10 offset-md-1 mt-5">
                        <table >
                            <thead className="cabecera">
                                <tr>
                                    <th className="colum">Sl.</th>
                                    <th className="colum">CURP</th>
                                    <th className="colum">Nombre</th>
                                    <th className="colum">Edad</th>
                                    <th className="colum">Dirección</th>
                                    <th className="colum">Telefono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paciente.map(paciente => (
                                    <tr key={paciente.CURP}>
                                        <td className="fila">
                                            <input id="select_paciente" name="select_paciente" type="radio" value={paciente.CURP} onChange={() => selectPaciente(paciente.CURP)} />
                                        </td>
                                        <td className="fila">{paciente.CURP}</td>
                                        <td className="fila">{`${paciente.datos_personales.nombre} ${paciente.datos_personales.apePaterno} ${paciente.datos_personales.apeMaterno}`}</td>
                                        <td className="fila">{paciente.datos_personales.edad}</td>
                                        <td className="fila">{`${paciente.datos_direccion.colonia} ${paciente.datos_direccion.calle} #${paciente.datos_direccion.numero_exterior}`}</td>
                                        <td className="fila">{paciente.datos_contacto.telefono}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row g-3 mt-10">
                        <div className="col-md-1 offset-md-1">
                            <button className="button-cancelar">Cancelar</button>
                        </div>
                        <div className="col-md-1">
                            <button className="button-guardar">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

