import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";
import { Modal, Button } from "react-bootstrap"
import { registerEvolucionNiño } from "../../services/Psicologia";

export function FormEvoluciónPsicoNiño({ estado, datos, handleCloseModal }) {
    const { register, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(estado)

    const onSubmit = handleSubmit(async (data) => {
        await setToken(authTokens.access)
        const response = await registerEvolucionNiño(data);
        console.log(response)
        handleCloseModal()
    })

    return (
        <>
            <Modal Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>
                        Nota de evolución
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <form onSubmit={onSubmit} className="row">
                            <div className="col-md-4 offset-md-1 mt-1">
                                <label className="label-form form-label" htmlFor="num_expediente">No.expediente</label>
                                <input className="input-form form-control" id="num_expediente" placeholder="Número de expediente" type="text" value={datos.expedienteFicha} {...register("numero_expediente", { required: true })} />
                            </div>
                            <div className="col-md-6 mt-1">
                                <label className="label-form form-label" htmlFor="CURP">CURP</label>
                                <input className="input-form form-control" id="CURP" value={datos.idPaciente} placeholder="CURP" type="text" {...register("CURP", { required: true })} />
                            </div>
                            <div className="col-md-10 offset-md-1 mt-2">
                                <label className="label-form form-label" htmlFor="nombre_paciente">Nombre del paciente</label>
                                <input className="input-form form-control" id="nombre_paciente" placeholder="nombre del paciente" type="text" {...register("nombre_paciente", { required: true })} />
                            </div>
                            <div className="col-md-10 offset-md-1 mt-2">
                                <label className="label-form form-label" htmlFor="nota_evolucion">Evolución</label>
                                <textarea className="input-form form-control" id="nota_evolucion" placeholder="Escriba sus comentarios aquí"{...register("nota_evolucion", { required: true })}></textarea>
                            </div>
                            <div className="col-md-5 offset-md-1 mt-2">
                                <label className="label-form form-label" htmlFor="proxima_cita">Próxima cita</label>
                                <input className="input-form form-control" id="proxima_cita" type="date" {...register("proxima_cita", { required: true })} />
                            </div>
                            <div className="col-md-5 mt-5">
                                <button type="submit" className="button-guardar rounded">Guardar</button>
                            </div>
                        </form>
                    </div>
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

