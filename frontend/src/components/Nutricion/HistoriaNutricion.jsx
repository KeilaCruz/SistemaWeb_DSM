import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { useParams } from "react-router-dom"
import { SliderHistoriaNutricion } from "./SliderHistoriaNutricion"
import { HistoriaFormVisualizar } from "./HistoriaFormVisualizar"
import { useEffect } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import { getPaciente } from "../../services/Recepcionista"
import { visualizarHistoriasPaciente } from "../../services/Nutriologo"


export function HistoriaNutricion() {
    const [historias, setHistorias] = useState([])
    const { authTokens } = useContext(AuthContext)
    const { idPaciente } = useParams()
    const componentRender = historias.length > 1 ? <SliderHistoriaNutricion historia={historias} /> : <HistoriaFormVisualizar historia={historias} />
    useEffect(() => {
        async function loadHistorias() {
            await setToken(authTokens.access)
            const paciente = await getPaciente(idPaciente)
            const historia = await visualizarHistoriasPaciente(idPaciente)
            const historiaPaciente = historia.map(item => ({
                ...item,
                paciente: {
                    CURP: paciente.CURP,
                    nombre: paciente.datos_personales.nombre,
                    apePaterno: paciente.datos_personales.apePaterno,
                    apeMaterno: paciente.datos_personales.apeMaterno,
                    edad: paciente.datos_personales.edad,
                }
            }))
            setHistorias(historiaPaciente)
            console.log(historiaPaciente)
        }
        loadHistorias()
    }, [])
    return (
        <>
            {componentRender}
        </>
    )
}

