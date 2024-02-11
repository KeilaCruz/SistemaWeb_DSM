import axios from "axios";
const SAVE_HISTORIANUTRICION_URL = "http://127.0.0.1:8000/api/registrar_historia_nutricion"
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

export const registerHistoriaNutricion = (historiaNutricion) => {
    try {
        const response = axios.post(SAVE_HISTORIANUTRICION_URL, historiaNutricion, config)
        if (response.status === 201) {
            alert("Registrado con exito")
        }
    } catch (error) {
        console.error(error)
    }
}