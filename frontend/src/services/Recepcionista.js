import axios from "axios";

let config;

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

const SAVE_PACIENTE_URL = "http://127.0.0.1:8000/api/registrar_paciente/";

export const registerPaciente = async (paciente) => {
    try {
        const response = await axios.post(SAVE_PACIENTE_URL, paciente, config)
        if (response.status === 200) {
            alert("Registrado correctamente")
        } else {
            return response;
        }
    } catch (error) {
        console.error(error)
    }
}