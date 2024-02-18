import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const SAVE_HISTORIANUTRICION_URL = "http://127.0.0.1:8000/api/registrar_historia_nutricion"

export const registerHistoriaNutricion = async (historiaNutricion) => {
    try {
        const config = await getConfig()
        const response = axios.post(SAVE_HISTORIANUTRICION_URL, historiaNutricion, config)
        if (response.status === 201) {
            alert("Registrado con exito")
        } else {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}