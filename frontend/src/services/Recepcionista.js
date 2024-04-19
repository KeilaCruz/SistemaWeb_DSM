import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const LIST_PACIENTES_URL = "http://127.0.0.1:8000/api/paciente/"
const SAVE_PACIENTE_URL = "http://127.0.0.1:8000/api/registrar_paciente/";
const SEARCH_PACIENTE_URL = "http://127.0.0.1:8000/api/buscar_paciente/";
const SAVE_CITA_URL = "http://127.0.0.1:8000/api/agendar_cita/";
const LIST_CITASACTIVAS_URL = "http://127.0.0.1:8000/api/cita_activas/";
const LIST_CITASINACTIVAS_URL = "http://127.0.0.1:8000/api/cita_inactivas/";
const EDIT_PACIENTE_URL = "http://127.0.0.1:8000/api/editar_paciente/"
const LIST_CITA_PACIENTE_URL = "http://127.0.0.1:8000/api/citas_paciente/";
const LIST_REAGENDARCITA_URL = "http://127.0.0.1:8000/api/reagendar_cita/";
const LIST_HISTORIALCLINICO_URL = "http://127.0.0.1:8000/api/historial_clinico/"
const MARCAR_ASISTENCIA_URL = "http://127.0.0.1:8000/api/marcar_asistencia/"

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
export const getAllCitas = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(LIST_CITASACTIVAS_URL, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.error("error al hacer solicitud")
        }
    } catch (error) {
        console.log(error)
    }
}
export const getCitasInactivas = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(LIST_CITASINACTIVAS_URL, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.error("error al hacer solicitud")
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
            return response;
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
export const getCita = async (idCita) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${LIST_REAGENDARCITA_URL}${idCita}/`, config)
        if (response.status == 200) {
            return response.data;
        } else {
            console.log("Error al hacer la llamada")
        }
    } catch (error) {
        console.error(error)
    }
}

export const reagendarCita = async (idCita, cita) => {
    try {
        const config = await getConfig();
        const response = await axios.put(`${LIST_REAGENDARCITA_URL}${idCita}/`, cita, config)
        if (response.status == 200) {
            alert("Modificacion realizada")
        } else {
            console.log("error al modificar")
            return response;
        }
    } catch (error) {
        console.log(error)
    }
}

export const historialClinicoPaciente = async (idPaciente) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${LIST_HISTORIALCLINICO_URL}${idPaciente}/`, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar el historial")
        }
    } catch (error) {
        console.error(error)
    }
}

export const marcarAsistencia = async (idCita, estado) => {
    try {
        const config = await getConfig();
        const response = await axios.put(`${MARCAR_ASISTENCIA_URL}${idCita}/`, estado, config)
        if (response.status == 200) {
            console.log("Marcar asistencia listo")
        } else {
            console.log("Error al marcar asistencia")
        }
    } catch (error) {
        console.error(error)
    }
}