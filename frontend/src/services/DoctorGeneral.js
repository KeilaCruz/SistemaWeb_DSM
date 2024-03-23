import axios from "axios";
import { getConfig } from "./HeaderAuthorization";
import Swal from 'sweetalert2'

const SAVE_EXAMEN_MEDICO_URL = "http://127.0.0.1:8000/api/registrar_examen_medico/"
const LIST_EXAMEN_MEDICO_URL = "http://127.0.0.1:8000/api/examen_medico/"
const EDIT_EXAMEN_MEDICO_URL ="http://127.0.0.1:8000/api/editar_examen_medico/"
const SAVE_HOJA_DE_EVALUACION_URL = "http://127.0.0.1:8000/api/registrar_hoja_evaluacion/"
const LIST_HOJA_DE_EVALUACION_URL = "http://127.0.0.1:8000/api/hoja_evaluacion/"
const EDIT_HOJA_DE_EVALUACION_URL = "http://127.0.0.1:8000/api/editar_hoja_evaluacion/"


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

export const getExamenMedico = async (idExamenMedico) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${EDIT_EXAMEN_MEDICO_URL}${idExamenMedico}/`, config)
        if (response.status == 200) {
            return response.data;
        } else {
            console.log("Error al hacer la llamada")
        }
    } catch (error) {
        console.log(error)
    }
}

export const editarExamenMedico = async (idExamenMedico, examen) => {
    try {
        const config = await getConfig();
        const response = await axios.put(`${EDIT_EXAMEN_MEDICO_URL}${idExamenMedico}/`, examen, config)
        if (response.status == 200) {
            alert("Modificacion realizada")
        } else {
            console.log("error al modificar")
        }
    } catch (error) {
        console.error(error)
    }
} 


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


export const getHojaEvaluacion = async (idHojaClinica) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${EDIT_HOJA_DE_EVALUACION_URL}${idHojaClinica}`, config)
        if (response.status == 200) {
            return response.data;
        } else {
            console.log("Error al hacer la llamada")
        }
    } catch (error) {
        console.log(error)
    }
}

export const editarHojaEvaluacion = async (idHojaClinica, evaluacion) => {
    try {
        const config = await getConfig();
        const response = await axios.put(`${EDIT_HOJA_DE_EVALUACION_URL}${idHojaClinica}`, evaluacion, config)
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Los cambios se guardaron correctamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('Se hizo clic en Aceptar');
                  location.href ='/ver_evaluacionClinica';
                }
              });
        } else {
            console.log("error al modificar")
        }
    } catch (error) {
        console.error(error)
    }
} 


