import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const SAVE_URL_FICHAPSICO_NIÑO = "http://127.0.0.1:8000/api/registrar_fichapsi_nino";
const SAVE_URL_FICHAPSICO_ADULTO = "http://127.0.0.1:8000/api/registrar_fichapsi_adulto";

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