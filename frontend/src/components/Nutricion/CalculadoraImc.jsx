import { useContext, useState } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import AuthContext from "../../context/AuthProvider"
import { calcularIMC } from "../../services/Nutriologo"
import { Modal, Button } from "react-bootstrap"

export function CalculadoraImc() {
    const { authTokens } = useContext(AuthContext)
    const [categoria, setCategoria] = useState(1)
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [imc, setIMC] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleCalcularImc = async () => {
        await setToken(authTokens.access)
        const response = await calcularIMC(peso, altura);
        setCategoria(response.categoria)
        setIMC(response.imc)
    }
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        name === 'peso' ? setPeso(value) : setAltura(value)
    }
    const handleClearInputs = () => {
        setPeso('')
        setAltura('')
        setIMC('')
        setCategoria(1)
    }
    const handleShowModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    return (
        <>
            <button onClick={handleShowModal}>Mostrar</button>
            <Modal Modal show={showModal} onHide={handleCloseModal} dialogClassName="my-modal">
                <Modal.Header>
                    <Modal.Title>Calculadora IMC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 offset-md-1">
                                <label htmlFor="peso_paciente" className="form-label label-form">Peso:</label>
                                <input className="form-control " id="peso_paciente" type="number" step="any" placeholder="kg" name="peso" value={peso} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="altura_paciente" className="form-label label-form">Altura:</label>
                                <input className="form-control " id="altura_paciente" type="number" step="any" placeholder="m" name="altura" value={altura} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="imc_paciente" className="form-label label-form">IMC:</label>
                                <input className="form-control " id="imc_paciente" type="number" step="any" value={imc} placeholder="kg/m2" />
                            </div>
                            <div className="col-md-2 mt-4">
                                <button className="button-guardar" onClick={handleCalcularImc}>Calcular</button>
                            </div>
                            <div className="col-md-1 mt-4">
                                <button className="button-limpiar" onClick={handleClearInputs}>Limpiar</button>
                            </div>
                        </div>

                        {/**Estructura del range */}
                        <div className="col-md-10 mt-5 mb-2">
                            <input className="range-imc" type="range" min={1} max={6} value={categoria} />
                        </div>
                        <div className="row">
                            <div className="col-md-2 label-range"><label>Bajo peso</label></div>
                            <div className="col-md-2 label-range"><label>Normopeso</label></div>
                            <div className="col-md-2 label-range"><label>Sobrepeso</label></div>
                            <div className="col-md-2 label-range"><label>Obesidad I</label></div>
                            <div className="col-md-2 label-range"><label>Obesidad II</label></div>
                            <div className="col-md-2 label-range"><label>Obesidad III</label></div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

