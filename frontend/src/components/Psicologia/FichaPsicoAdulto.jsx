import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { setToken } from '../../services/HeaderAuthorization'
import { getPaciente } from '../../services/Recepcionista'
import { getFichaPsicoPacienteAdulto } from '../../services/Psicologia'
import { SliderFichaPsiAdulto } from './SliderFichaPsiAdulto'
import { FormAdultoVisualizar } from './FormAdultoVisualizar'


export function FichaPsicoAdulto() {
    const [fichas, setFichas] = useState([])
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)
    const componentRender = fichas.length === 1 ? <FormAdultoVisualizar ficha={fichas} /> : <SliderFichaPsiAdulto ficha={fichas} />
    useEffect(() => {
        async function loadFichas() {
            await setToken(authTokens.access);
            const paciente = await getPaciente(idPaciente);
            const ficha = await getFichaPsicoPacienteAdulto(idPaciente)
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
        }
        loadFichas()
    }, [])

    return (
        <>
            {componentRender}
        </>
    )
}

