import axios from "axios";
import Swal from "sweetalert2";
import { getConfig, getConfigFiles } from "./HeaderAuthorization";

const SAVE_URL_FICHAPSICO_NIÑO = "http://127.0.0.1:8000/api/registrar_fichapsi_nino";
const SAVE_URL_FICHAPSICO_ADULTO = "http://127.0.0.1:8000/api/registrar_fichapsi_adulto";
const URL_GET_FICHAPSICO_ADULTO = "http://127.0.0.1:8000/api/visualizar_fichapsi_adulto";
const URL_GET_FICHAPSICO_NIÑO = "http://127.0.0.1:8000/api/visualizar_fichapsi_nino";
const URL_GET_FICHAADULTO_PACIENTE = "http://127.0.0.1:8000/api/fichapsico_paciente_adulto/";
const URL_GETFICHANIÑO_PACIENTE = "http://127.0.0.1:8000/api/fichapsico_paciente_nino/";
const URL_EVOLUCION_ADULTO = "http://127.0.0.1:8000/api/registrar_evolucion_adulto";
const URL_EVOLUCION_NIÑO = "http://127.0.0.1:8000/api/registrar_evolucion_nino";
const URL_GETEVOLUCION_ADULTO = "http://127.0.0.1:8000/api/visualizar_evolucion_adulto/"
const URL_GETEVOLUCION_NINO = "http://127.0.0.1:8000/api/visualizar_evolucion_ninio/"
const SEARCH_URL_ADULTO = "http://127.0.0.1:8000/api/buscar_ficha_psico_ninio"
const SEARCH_URL_NINO = "http://127.0.0.1:8000/api/buscar_ficha_psico_adulto"

export const registerFichaPsiNiño = async (fichaPsicoNiño) => {
    try {
        const config = await getConfigFiles()
        const response = await axios.post(SAVE_URL_FICHAPSICO_NIÑO, fichaPsicoNiño, config)
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Registrado con exito.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Se hizo clic en Aceptar');
                }
            });
        } else {
            return response
        }
    } catch (error) {
        console.error(error);
    }
}
export const registerFichaPsiAdulto = async (fichaPsicoAdulto) => {
    try {
        const config = await getConfigFiles()
        const response = await axios.post(SAVE_URL_FICHAPSICO_ADULTO, fichaPsicoAdulto, config)
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Registrado con exito.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Se hizo clic en Aceptar');
                }
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error)
    }
}

export const getAllFichasPsiAdultos = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(URL_GET_FICHAPSICO_ADULTO, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas psico de adultos")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getAllFichasPsiNiños = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(URL_GET_FICHAPSICO_NIÑO, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas psico de niños")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getFichaPsicoPacienteAdulto = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${URL_GET_FICHAADULTO_PACIENTE}${idPaciente}/`, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas del paciente")
        }
    } catch (error) {
        console.error(error)
    }
}

export const getFichaPsicoPacienteNiño = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${URL_GETFICHANIÑO_PACIENTE}${idPaciente}/`, config)
        if (response.status == 200) {
            return response.data
        } else {
            console.log("Error al retornar las fichas del paciente")
        }
    } catch (error) {
        console.error(error)
    }
}

export const registerEvolucionAdulto = async (nota) => {
    try {
        const config = await getConfig()
        const response = await axios.post(URL_EVOLUCION_ADULTO, nota, config);
        if (response.status == 201) {
            alert("Registrado")
        } else {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}

export const getNotasAdulto = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${URL_GETEVOLUCION_ADULTO}${idPaciente}/`, config);
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al retornar las notas")
        }
    } catch (error) {
        console.error
    }
}

export const registerEvolucionNiño = async (nota) => {
    try {
        const config = await getConfig()
        const response = await axios.post(URL_EVOLUCION_NIÑO, nota, config);
        if (response.status === 201) {
            alert("Registrado")
        } else {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}

export const getNotasNiño = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${URL_GETEVOLUCION_NINO}${idPaciente}/`, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al retornar los datos")
        }
    } catch (error) {
        console.error(error)
    }
}
export const buscarFichaAdulto = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${SEARCH_URL_ADULTO}/${idPaciente}/`, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al retornar ficha adulto")
        }
    } catch (error) {
        console.error(error)
    }
}
export const buscarFichaNino = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${SEARCH_URL_NINO}/${idPaciente}/`, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al retornar ficha nino")
        }
    } catch (error) {
        console.error(error)
    }
}