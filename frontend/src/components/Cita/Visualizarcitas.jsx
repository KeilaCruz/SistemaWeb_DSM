import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization";
import { getAllCitas, getCita, reagendarCita } from "../../services/Recepcionista";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
export function VisualizarCitas() {
  const [citas, setCitas] = useState([])
  const [cita, setCita] = useState({})
  const [showModal, setShowModal] = useState(false)
  const { authTokens } = useContext(AuthContext);
  const { register, setValue, handleSubmit } = useForm()
  useEffect(() => {
    async function loadCitas() {
      try {
        await setToken(authTokens.access);
        const response = await getAllCitas()
        setCitas(response)
      } catch (error) {
        console.error(error)
      }
    }
    loadCitas()
  }, [])

  useEffect(() => {
    async function loadInput() {
      setValue("idCita", cita.idCita || '')
      setValue("idPaciente", cita.idPaciente || '')
      setValue("fecha_cita", cita.datos_cita.fecha_cita || '')
      setValue("horario_cita", cita.datos_cita.horario_cita || '')
      setValue("especialidad", cita.datos_cita.especialidad || '')
    }
    loadInput()
  }, [cita, setValue])

  const handleOpenModal = async (id) => {
    try {
      await setToken(authTokens.access)
      const response = await getCita(id)
      setCita(response)
    } catch (error) {
      console.error(error)
    }
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const onSubmit = handleSubmit(async (data) => {
    const citaData = {
      "datos_cita": {
        fecha_cita: data.fecha_cita,
        horario_cita: data.horario_cita,
        especialidad: data.especialidad,
      },
      estado: true,
      idPaciente: data.idPaciente,
    }
    try {
      await setToken(authTokens.access)
      const response = await reagendarCita(data.idCita, citaData);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 mt-5">
          <div className="col-md-10 offset-md-1 text-center mt-5">
            <hr />
            <h3 className="title">CITAS AGENDADAS</h3>
            <hr />
          </div>
        </div>
        <div className="col-md-10 offset-md-1 mt-5">
          <table>
            <thead className="cabecera">
              <tr>
                <th className="colum">Numero</th>
                <th className="colum">Curp</th>
                <th className="colum">Fecha horario</th>
                <th className="colum">Especialidad</th>
                <th className="colum">Estado</th>
                <th className="colum"></th>
              </tr>
            </thead>
            <tbody>
              {citas.map(cita => (
                <tr key={cita.idCita}>
                  <td className="fila">{cita.idCita}</td>
                  <td className="fila">{cita.idPaciente}</td>
                  <td className="fila">{cita.datos_cita.fecha_cita} {cita.datos_cita.horario_cita}</td>
                  <td className="fila">{cita.datos_cita.especialidad}</td>
                  {cita.estado && (
                    <td className="fila">Activa</td>
                  )
                  }
                  <td td className="fila">
                    <button onClick={() => handleOpenModal(cita.idCita)}>Edit</button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div >

      {/**Modal para editar datos de la cita */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reagendar cita
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-4 offset-md-2">
              <label htmlFor="id_cita" className="form-label label-form">Número de cita</label>
              <input type="number" id="id_cita" className="form-control input-form" {...register("idCita", { required: true })} />
            </div>
            <div className="col-md-8 offset-md-2">
              <label htmlFor="curp_paciente" className="form-label label-form">Curp paciente</label>
              <input type="text" id="curp_paciente" className="form-control input-form" {...register("idPaciente", { required: true })} />
            </div>
            <div className="col-md-8 offset-md-2">
              <label htmlFor="fecha_cita" className="form-label label-form">Fecha de cita</label>
              <input type="date" id="fecha_cita" className="form-control input-form" {...register("fecha_cita", { required: true })} />
            </div>
            <div className="col-md-8 offset-md-2">
              <label htmlFor="horario_cita" className="form-label label-form">Hora de cita</label>
              <input type="time" id="horario_cita" className="form-control input-form" {...register("horario_cita", { required: true })} />
            </div>
            <div className="col-md-8 offset-md-2">
              <label htmlFor="especialidad" className="form-label label-form">Especialidad</label>
              <select className="form-select input-form" id="especialidad" {...register("especialidad", { required: true })}>
                <option value="" disabled>Elija especialidad</option>
                <option value="Nutricion">Nutrición</option>
                <option value="Medico-general">Medico general</option>
                <option value="Odontologia">Odontología</option>
                <option value="Psicologia">Psicologia</option>
              </select>
            </div>
            <div className="col-md-6 offset-md-2">
              <button className="button-guardar btn bt mx-auto">Guardar cambios</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

