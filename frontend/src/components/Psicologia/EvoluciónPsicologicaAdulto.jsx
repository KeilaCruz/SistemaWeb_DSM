import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { setToken } from "../../services/HeaderAuthorization"
import AuthContext from "../../context/AuthProvider"
import { getNotasAdulto } from "../../services/Psicologia"
import { NotaPsicologica } from "./NotaPsicologica"
import { SliderNotasEvolución } from "./SliderNotasEvolución"

export function EvoluciónPsicologicaAdulto() {
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)
    const [data, setData] = useState([])
    const componentRender = data.length > 1 ? <SliderNotasEvolución data={data} /> : <NotaPsicologica data={data} />
    useEffect(() => {
        async function loadDatos() {
            await setToken(authTokens.access)
            console.log(authTokens)
            const response = await getNotasAdulto(idPaciente)
            setData(response)
        }
        loadDatos()
    }, [])

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">NOTAS DE EVOLUCIÓN PSICOLÓGICA</h3>
                        <hr />
                    </div>
                </div>
                <div className='mt-2 mb-2'>
                    {componentRender}
                </div>
            </div>
        </>
    )
}

