import axios from "axios";

let config;
const SAVE_PACIENTE_URL = "http://127.0.0.1:8000/api/registrar_paciente/";
const SEARCH_PACIENTE_URL = "http://127.0.0.1:8000/api/buscar_paciente/";
const SAVE_CITA_URL = "http://127.0.0.1:8000/api/agendar_cita/";
export const setConfig = async (token) => {
    /**
     * Crea la configuracion del encabezado con el token de acceso
     */
    config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }
}

export const registerPaciente = async (paciente) => {
    try {
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