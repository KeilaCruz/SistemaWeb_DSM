import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { setToken } from '../../services/HeaderAuthorization'
import { getNotasNiño } from '../../services/Psicologia'
import { NotaPsicologica } from './NotaPsicologica'
import { SliderNotasEvolución } from './SliderNotasEvolución'

export function EvolucionPsicologiaNiño() {
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)
    const [data, setData] = useState([])
    const componentRender = data.length > 1 ? <SliderNotasEvolución data={data} /> : <NotaPsicologica data={data} />
    useEffect(() => {
        async function loadData() {
            await setToken(authTokens.access)
            const response = await getNotasNiño(idPaciente)
            setData(response)
        }
        loadData()
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

