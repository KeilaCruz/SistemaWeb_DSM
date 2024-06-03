import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthProvider'
import { setToken } from '../../services/HeaderAuthorization'
import { getAllFichasPsiAdultos } from '../../services/Psicologia'
import { useNavigate } from 'react-router-dom'
import { FormEvoluciónPsicoAdulto } from './FormEvolucionPsicoAdulto.jxs'


export function VisualizarFichaPsicoAdulto() {
    const [fichas, setFichas] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const navigate = useNavigate()
    const { authTokens } = useContext(AuthContext)
    useEffect(() => {
        async function loadFichas() {
            await setToken(authTokens.access)
            const response = await getAllFichasPsiAdultos();
            setFichas(response)
        }
        loadFichas()
    }, [])

    const handleFichas = (idPaciente) => {
        navigate(`/fichapsico_adulto/${idPaciente}`)
    }
    const handleNotas = (idPaciente) => {
        navigate(`/visualizar_evolucion_adulto/${idPaciente}`)
    }
    const handleModal = (datos) => {
        setSelectedData(datos)
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">FICHAS DE IDENTIFICACIÓN ADULTOS</h3>
                        <hr />
                    </div>
                </div>
                <div className='col-md-10 offset-md-1'>
                    <table className="table-bordered">
                        <thead className='cabecera'>
                            <tr>
                                <th className='colum'>Número expediente</th>
                                <th className='colum'>Fecha registro</th>
                                <th className='colum'>Motivo consulta</th>
                                <th className='colum'>Curp paciente</th>
                                <th className='colum'>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fichas.map(ficha => (
                                <tr>
                                    <td className='fila'>{ficha.expedienteFicha}</td>
                                    <td className='fila'>{ficha.fecha_registro}</td>
                                    <td className='fila'>{ficha.datos_generales.motivo_consulta}</td>
                                    <td className='fila'>{ficha.idPaciente}</td>
                                    <td className="fila">
                                        <div className='row'>
                                            <div className="col-md-2 offset-md-1">
                                                <button type="button" className="button-filter mx-auto rounded" onClick={() => handleFichas(ficha.idPaciente)}>
                                                    <i class="lni lni-folder"></i>
                                                </button>
                                            </div>
                                            <div className="col-md-2 offset-md-1">
                                                <button type="button" className="button-filter mx-auto rounded" onClick={() => handleModal(ficha)}>
                                                    <i class="lni lni-add-files"></i>
                                                </button>
                                            </div>
                                            <div className="col-md-2 offset-md-1">
                                                <button type="button" className="button-filter mx-auto rounded" onClick={() => handleNotas(ficha.idPaciente)}>
                                                    <i class="lni lni-empty-file"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && <FormEvoluciónPsicoAdulto estado={true} datos={selectedData} handleCloseModal={handleCloseModal} />}
        </>
    )
}

