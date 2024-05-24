import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthProvider"
import { setToken } from "../../services/HeaderAuthorization"
import { visualizarHistorias } from "../../services/Nutriologo"


export function VisualizarHistoriasNutricion() {
    const [historias, setHistorias] = useState([])
    const navigate = useNavigate()
    const { authTokens } = useContext(AuthContext)
    useEffect(() => {
        async function loadHistorias() {
            await setToken(authTokens.access)
            const response = await visualizarHistorias()
            setHistorias(response)
        }
        loadHistorias()
    }, [])
    const handleHistorias = (idPaciente) => {
        navigate(`/historia_nutricion/${idPaciente}`)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">HISTORIAS DE NUTRICIÓN</h3>
                        <hr />
                    </div>
                </div>
                <div className='offset-md-1'>
                    <table>
                        <thead className='cabecera'>
                            <tr>
                                <th className='colum'>Id</th>
                                <th className='colum'>Fecha registro</th>
                                <th className='colum'>Motivo consulta</th>
                                <th className='colum'>Curp paciente</th>
                                <th className='colum'>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historias.map(historia => (
                                <tr>
                                    <td className="fila">{historia.idHistoriaNutricion}</td>
                                    <td className="fila">{historia.fecha_registro}</td>
                                    <td className="fila">{historia.datos_personales.motivo_consulta}</td>
                                    <td className="fila">{historia.idPaciente}</td>
                                    <td>
                                        <button onClick={() => handleHistorias(historia.idPaciente)}>Historias</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

