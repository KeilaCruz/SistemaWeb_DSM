import { useContext, useEffect, useState } from "react"
import { searchPaciente } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider"
export function FormCita({ onSubmit, register, pacienteSelect, errors }) {
    const { authTokens } = useContext(AuthContext);
    const [criterio, setCriterio] = useState("")
    const [paciente, setPaciente] = useState([])
    const [isResult, setIsResult] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    //Calculos para hacer la paginacion
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPacientes = paciente.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleBarraBusqueda = (evt) => {
        setCriterio(evt.target.value)
    }

    useEffect(() => {
        const loadPaciente = async () => {
            try {
                await setToken(authTokens.access)
                const data = await searchPaciente(criterio)
                setPaciente(data)
                setIsResult(data.length > 0);
            } catch (error) {
                console.error(error)
                setIsResult(false)
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
                <div className="row g-3 ">
                    <div className="col-md-10 offset-md-1 text-center mt-2">
                        <hr />
                        <h3 className="title">AGENDAR CITA</h3>
                        <hr />
                    </div>
                    <div className="col-md-5 offset-1 mt-4">
                        <input className="form-control input-form" type="search" id="busqueda_paciente" placeholder="Buscar por CURP, primer nombre o teléfono" onChange={handleBarraBusqueda} />
                    </div>
                </div>
                <form onSubmit={onSubmit} className="row g-3 mt-2">
                    <div className="col-md-3 offset-md-1">
                        <label htmlFor="fecha_cita" className="form-label label-form">Fecha de cita</label>
                        <input className="form-control input-form" id="fecha_cita" type="date" placeholder="fecha de cita" {...register('fecha_cita', { required: true })} />
                        {errors.fecha_cita?.type === "required" &&
                            (
                                <p className="errors"> <i class="lni lni-warning"></i> Ingrese la fecha de la cita</p>
                            )
                        }
                    </div>
                    <div className="col-md-3 mx-5">
                        <label htmlFor="horario_cita" className="form-label label-form">Horario de cita</label>
                        <input className="form-control input-form" id="horario_cita" type="time" placeholder="hora_cita" {...register('hora_cita', { required: true })} />
                        {errors.hora_cita?.type === "required" &&
                            (
                                <p className="errors"> <i class="lni lni-warning"></i> Ingrese la hora</p>
                            )
                        }
                    </div>
                    <div className="col-md-3 mx-4">
                        <label htmlFor="especialidad_cita" className="form-label label-form">Especialidad de cita</label>
                        <select className="form-select input-form" id="especialidad" {...register("especialidad", { required: true })}>
                            <option value="" disabled selected>Elija especialidad</option>
                            <option value="Nutricion">Nutrición</option>
                            <option value="Medico-general">Medico general</option>
                            <option value="Odontologia">Odontología</option>
                            <option value="Psicologia">Psicologia</option>
                        </select>
                        {errors.especialidad?.type === "required" &&
                            (
                                <p className="errors"> <i class="lni lni-warning"></i>Seleccione la especialidad</p>
                            )
                        }
                    </div>
                    <div className="col-md-10 offset-md-1">
                        {isResult ? (
                            <table className="table-bordered">
                                <thead className="cabecera">
                                    <tr>
                                        <th className="columv2">Sl.</th>
                                        <th className="colum">CURP</th>
                                        <th className="colum">Nombre</th>
                                        <th className="columv2">Edad</th>
                                        <th className="colum">Colonia</th>
                                        <th className="colum">Calle</th>
                                        <th className="colum">Telefono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPacientes.map(paciente => (
                                        <tr key={paciente.CURP}>
                                            <td className="fila">
                                                <input id="select_paciente" name="select_paciente" type="radio" value={paciente.CURP} onChange={() => selectPaciente(paciente.CURP)} />
                                            </td>
                                            <td className="fila">{paciente.CURP}</td>
                                            <td className="fila">{`${paciente.datos_personales.nombre} ${paciente.datos_personales.apePaterno} ${paciente.datos_personales.apeMaterno}`}</td>
                                            <td className="fila">{paciente.datos_personales.edad}</td>
                                            <td className="fila">{`${paciente.datos_direccion.colonia}`}</td>
                                            <td className="fila">{`${paciente.datos_direccion.calle} #${paciente.datos_direccion.numero_exterior}`}</td>
                                            <td className="fila">{paciente.datos_contacto.telefono}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-danger">NO SE ENCONTRARON RESULTADOS DE BÚSQUEDA</p>
                        )}
                    </div>
                    <div className="pagination mt-2 col-md-10 offset-md-1">
                        {[...Array(Math.ceil(paciente.length / itemsPerPage)).keys()].map(number => (
                            <button type="button" key={number} onClick={() => paginate(number + 1)} className="page-link button-pagination rounded">
                                {number + 1}
                            </button>
                        ))}
                    </div>
                    <div className="col-md-1 offset-md-1">
                        <button type="submit" className="button-guardar rounded">Guardar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

