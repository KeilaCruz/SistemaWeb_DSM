import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const LIST_PACIENTES_URL = "http://127.0.0.1:8000/api/paciente/"
const SAVE_PACIENTE_URL = "http://127.0.0.1:8000/api/registrar_paciente/";
const SEARCH_PACIENTE_URL = "http://127.0.0.1:8000/api/buscar_paciente/";
const SAVE_CITA_URL = "http://127.0.0.1:8000/api/agendar_cita/";
const EDIT_PACIENTE_URL = "http://127.0.0.1:8000/api/editar_paciente/"
const LIST_CITA_PACIENTE_URL = "http://127.0.0.1:8000/api/citas_paciente/";
export const getAllPacientes = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(LIST_PACIENTES_URL, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.error("error al hacer solicitud")
        }
    } catch (error) {
        console.log(error)
    }
}
export const registerPaciente = async (paciente) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_PACIENTE_URL, paciente, config)
        if (response.status === 201) {
            alert("Registrado correctamente")
        } else {
            return response;
        }
    } catch (error) {
        console.error(error)
    }
}

export const searchPaciente = async (criterio) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${SEARCH_PACIENTE_URL}?query=${criterio}`, config)
        if (response.status === 200) {
            return response.data;
        } else {
            alert("Error al realizar la búsqueda")
        }
    } catch (error) {
        console.error(error)
    }
}

export const registerCita = async (cita) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_CITA_URL, cita, config)
        if (response.status === 201) {
            alert("Cita agendada con exito")
        } else {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}
export const getPaciente = async (CURP) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${EDIT_PACIENTE_URL}${CURP}/`, config)
        if (response.status == 200) {
            return response.data;
        } else {
            console.log("Error al hacer la llamada")
        }
    } catch (error) {
        console.log(error)
    }
}
export const editarPaciente = async (CURP, paciente) => {
    try {
        const config = await getConfig();
        const response = await axios.put(`${EDIT_PACIENTE_URL}${CURP}/`, paciente, config)
        if (response.status == 200) {
            alert("Modificacion realizada")
        } else {
            console.log("error al modificar")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getCitasPaciente = async (CURP) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${LIST_CITA_PACIENTE_URL}${CURP}/`, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las citas del paciente")
        }
    } catch (error) {
        console.error(error)
    }
}