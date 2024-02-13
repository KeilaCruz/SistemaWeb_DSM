import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const SAVE_URL_FICHAPSICO_NIÑO = "http://127.0.0.1:8000/api/registrar_historia_nutricion"

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