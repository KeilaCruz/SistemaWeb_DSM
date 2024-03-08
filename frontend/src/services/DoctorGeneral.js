import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const SAVE_EXAMEN_MEDICO_URL = "http://127.0.0.1:8000/api/registrar_examen_medico/"
const LIST_EXAMEN_MEDICO_URL = "http://127.0.0.1:8000/api/examen_medico/"
const SAVE_HOJA_DE_EVALUACION_URL = "http://127.0.0.1:8000/api/registrar_hoja_evaluacion/"
const LIST_HOJA_DE_EVALUACION_URL = "http://127.0.0.1:8000/api/hoja_evaluacion/"

export const getAllExamenes = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(LIST_EXAMEN_MEDICO_URL, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.error("error al hacer solicitud")
        }
    } catch (error) {
        console.log(error)
    }
}

export const registerExamenMedico = async (examen) => {
    try {
        const config = await getConfig();
        const response = await axios.post(SAVE_EXAMEN_MEDICO_URL, examen, config);

        if (response.status === 201) {
            alert("Examen médico registrado correctamente");
        } else {
            console.error("Error al registrar examen médico:", response);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};


export const getAllHojasEvaluacion = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(LIST_HOJA_DE_EVALUACION_URL, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.error("error al hacer solicitud")
        }
    } catch (error) {
        console.log(error)
    }
}

export const registerHojaEvaluacion = async (evaluacion) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_HOJA_DE_EVALUACION_URL, evaluacion, config)
        if (response.status === 201) {
            alert("Registrado correctamente")
        } else {
            return response;
        }
    } catch (error) {
        console.error(error)
    }
}


