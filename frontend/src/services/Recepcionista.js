import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const LIST_PACIENTES_URL = "http://127.0.0.1:8000/api/paciente/"
const SAVE_PACIENTE_URL = "http://127.0.0.1:8000/api/registrar_paciente/";
const SEARCH_PACIENTE_URL = "http://127.0.0.1:8000/api/buscar_paciente/";
const SAVE_CITA_URL = "http://127.0.0.1:8000/api/agendar_cita/";
const LIST_CITAS_URL ="http://127.0.0.1:8000/api/cita/";
const SAVE_EVENTO_URL = "http://127.0.0.1:8000/api/registrar_evento/";
const SEARCH_USUARIO_URL = "http://127.0.0.1:8000/api/buscar_usuario/";
const LIST_USUARIOS_URL = "http://127.0.0.1:8000/api/visualizar_usuario/";
const EDIT_PACIENTE_URL = "http://127.0.0.1:8000/api/editar_paciente/";

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

export const getAllCitas = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(LIST_CITAS_URL, config)
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
        const response = await axios.post(`${EDIT_PACIENTE_URL}${CURP}`, paciente, config)
        if (response.status == 201) {
            alert("Modificacion realizada")
        } else {
            console.log("error al modificar")
        }
    } catch (error) {
        console.error(error)
    }
} 

export const registerEvento = async (evento) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_EVENTO_URL, evento, config)
        if (response.status === 201) {
            alert("Evento registrado con exito")
        } else {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}

export const searchUsuario = async (criterio) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${SEARCH_USUARIO_URL}?query=${criterio}`, config)
        if (response.status === 200) {
            return response.data;
        } else {
            alert("Error al realizar la búsqueda")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getAllUsuarios = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(LIST_USUARIOS_URL, config);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error al hacer la solicitud");
        }
    } catch (error) {
        console.error("Error en getAllUsuarios:", error);
        throw error; // Lanza la excepción para que pueda ser manejada externamente
    }
};





