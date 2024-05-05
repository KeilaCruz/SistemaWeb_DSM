
import { useContext, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { calcularCircuferencia } from "../../services/Nutriologo"

export function CalculadoraCircuferencia() {
    const { authTokens } = useContext(AuthContext)
    const [genero, setGenero] = useState('')
    const [circuferencia, setCircuferencia] = useState('')
    const [riesgo, setRiesgo] = useState(0)
    const [showModal, setModal] = useState(false)

    const handleCalcularCircuferencia = async () => {
        await setToken(authTokens.access)
        const response = await calcularCircuferencia(genero, circuferencia)
        setRiesgo(response.riesgo)
    }
    const handleChangeInput = (evt) => {
        const valor = evt.target.value
        setGenero(valor)
    }
    const handleChangeCircuferencia = (evt) => {
        const valor = evt.target.value
        setCircuferencia(valor)
    }
    const handleClearInputs = () => {
        setGenero('')
        setCircuferencia('')
        setRiesgo(0)
    }
    const handleShowModal = () => {
        setModal(true)
    }
    const handleCloseModal = () => {
        setModal(false)
    }
    return (
        <>
            <button onClick={handleShowModal}>Mostrar</button>

            <Modal Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Calculadora de circuferencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div>
                                <label className="form-label label-form">Género:</label>
                                <label className="form-check-label mx-4">Femenino
                                    <input className="form-check-input" type="radio" id="femenino" name="option_genero" value={"F"} onChange={handleChangeInput} />
                                </label>
                                <label className="form-check-label">Masculino
                                    <input className="form-check-input" type="radio" id="masculino" name="option_genero" value={"M"} onChange={handleChangeInput} />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="circuferencia form-label">Tamaño de circuferencia</label>
                                <input className="form-control input-form"type="number" id="circuferencia" placeholder="cm" step="any" name="circuferencia" value={circuferencia} onChange={handleChangeCircuferencia} />
                            </div>
                            <div>
                                <button onClick={handleCalcularCircuferencia}>Calcular</button>
                            </div>
                            <div>
                                <button onClick={handleClearInputs}>Limpiar</button>
                            </div>
                        </div>

                        {/**Estructura de range*/}
                        <div>
                            <input id="range_circuferencia" type="range" min={0} max={2} value={riesgo} />
                        </div>
                        <div className="row">
                            <div className="col-md-2"><label>Bajo riesgo</label></div>
                            <div className="col-md-2"><label>Alto riesgo</label></div>
                        </div>
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

