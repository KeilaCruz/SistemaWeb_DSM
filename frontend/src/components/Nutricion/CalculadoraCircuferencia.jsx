
import { useContext, useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { calcularCircuferencia } from "../../services/Nutriologo"

export function CalculadoraCircuferencia({ status, handleCloseModal }) {
    const { authTokens } = useContext(AuthContext)
    const [genero, setGenero] = useState('')
    const [circuferencia, setCircuferencia] = useState('')
    const [riesgo, setRiesgo] = useState(0)
    const [showModal, setShowModal] = useState(status)

    useEffect(() => {
        setShowModal(status);
    }, [status]);

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

    return (
        <>

            <Modal Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Calculadora de circuferencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-4">
                                <label htmlFor="circuferencia" className="form-label label-form">Circuferencia</label>
                                <input className="form-control " type="number" id="circuferencia" placeholder="cm" step="any" name="circuferencia" value={circuferencia} onChange={handleChangeCircuferencia} />
                            </div>
                            <div className="col-md-8 mt-4">
                                <label className="form-label label-form">Género:</label>
                                <label className="form-check-label mx-2 ">Femenino
                                    <input className="form-check-input" type="radio" id="femenino" name="option_genero" value={"F"} onChange={handleChangeInput} />
                                </label>
                                <label className="form-check-label mx-2">Masculino
                                    <input className="form-check-input" type="radio" id="masculino" name="option_genero" value={"M"} onChange={handleChangeInput} />
                                </label>
                            </div>
                            <div className="col-md-3 mt-2">
                                <button className="button-guardar btn rounded" onClick={handleCalcularCircuferencia}>Calcular</button>
                            </div>
                            <div className="col-md-3 mt-2">
                                <button className="button-limpiar btn rounded" onClick={handleClearInputs}>Limpiar</button>
                            </div>
                        </div>

                        {/**Estructura de range*/}
                        <div className="col-md-8 mt-4">
                            <input className="range-circuferencia" id="range_circuferencia" type="range" min={0} max={2} value={riesgo} />
                        </div>
                        <div className="row">
                            <div className="col-md-6"><label>Bajo riesgo</label></div>
                            <div className="col-md-6"><label>Alto riesgo</label></div>
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

