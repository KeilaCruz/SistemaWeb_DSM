import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const SAVE_URL_FICHAPSICO_NIÑO = "http://127.0.0.1:8000/api/registrar_fichapsi_nino";
const SAVE_URL_FICHAPSICO_ADULTO = "http://127.0.0.1:8000/api/registrar_fichapsi_adulto";
const URL_GET_FICHAPSICO_ADULTO = "http://127.0.0.1:8000/api/visualizar_fichapsi_adulto";
const URL_GET_FICHAPSICO_NIÑO = "http://127.0.0.1:8000/api/visualizar_fichapsi_nino";
const URL_GET_FICHAADULTO_PACIENTE = "http://127.0.0.1:8000/api/fichapsico_paciente_adulto/";
const URL_GETFICHANIÑO_PACIENTE = "http://127.0.0.1:8000/api/fichapsico_paciente_nino/";

export const registerFichaPsiNiño = async (fichaPsicoNiño) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_URL_FICHAPSICO_NIÑO, fichaPsicoNiño, config)
        if (response.status === 201) {
            alert("Registrada historia psicologica del niño")
        } else {
            return response
        }
    } catch (error) {
        console.error(error);
    }
}
export const registerFichaPsiAdulto = async (fichaPsicoAdulto) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_URL_FICHAPSICO_ADULTO, fichaPsicoAdulto, config)
        if (response.status === 201) {
            alert("Registrada historia psicologica del adulto")
        } else {
            return response;
        }
    } catch (error) {
        console.error(error)
    }
}

export const getAllFichasPsiAdultos = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(URL_GET_FICHAPSICO_ADULTO, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas psico de adultos")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getAllFichasPsiNiños = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(URL_GET_FICHAPSICO_NIÑO, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas psico de niños")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getFichaPsicoPacienteAdulto = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${URL_GET_FICHAADULTO_PACIENTE}${idPaciente}/`, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas del paciente")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getFichaPsicoPacienteNiño = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${URL_GETFICHANIÑO_PACIENTE}${idPaciente}/`, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas del paciente")
        }
    } catch (error) {
        console.error(error)
    }
}