import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthProvider'
import { setToken } from '../../services/HeaderAuthorization'
import { useParams } from 'react-router-dom'
import { getFichaPsicoPacienteNiño } from '../../services/Psicologia'
import { getPaciente } from '../../services/Recepcionista'
import { FormVisualizarNiño } from './FormVisualizarNiño'
import { SliderFichaPsicoNiño } from './SliderFichaPsicoNiño'

export function FichaPsicoNiño() {
    const [fichas, setFichas] = useState([])
    const { authTokens } = useContext(AuthContext)
    const { idPaciente } = useParams()
    const componentRender = fichas.length > 1 ? <SliderFichaPsicoNiño ficha={fichas} /> : <FormVisualizarNiño ficha={fichas} />


    useEffect(() => {
        async function loadFichas() {
            await setToken(authTokens.access)
            const paciente = await getPaciente(idPaciente)
            const ficha = await getFichaPsicoPacienteNiño(idPaciente)
            const fichaInfoPaciente = ficha.map(item => ({
                ...item,
                paciente: {
                    CURP: paciente.CURP,
                    nombre: paciente.datos_personales.nombre,
                    apePaterno: paciente.datos_personales.apePaterno,
                    apeMaterno: paciente.datos_personales.apeMaterno,
                    edad: paciente.datos_personales.edad,
                }
            }))
            setFichas(fichaInfoPaciente)
            console.log(fichaInfoPaciente)
        }
        loadFichas()
    }, [])
    return (
        <>
            {componentRender}
        </>
    )
}

