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
    const componentRender = data.length === 1 ? <NotaPsicologica data={data} /> : <SliderNotasEvolución data={data} />
    useEffect(() => {
        async function loadDatos() {
            await setToken(authTokens.access)
            const response = await getNotasAdulto(idPaciente)
            setData(response)
        }
        loadDatos()
    }, [])

    return (
        <>
            {componentRender}
        </>
    )
}

