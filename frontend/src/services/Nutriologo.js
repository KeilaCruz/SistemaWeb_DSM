import axios from "axios";
import { getConfig, getConfigFiles } from "./HeaderAuthorization";
import Swal from "sweetalert2";


const SAVE_HISTORIANUTRICION_URL = "http://127.0.0.1:8000/api/registrar_historia_nutricion"
const LIST_HISTORIA_NUTRICION_URL = "http://127.0.0.1:8000/api/historia_nutricion/"
const CALCULADORA_IMC_URL = "http://127.0.0.1:8000/api/calcular_imc"
const CALCULADORA_CIRCUFERENCIA_URL = "http://127.0.0.1:8000/api/calculadora_circuferencia"
const VISUALIZAR_URL = "http://127.0.0.1:8000/api/visualizar_historia_nutricion"
const SEARCH_URL = "http://127.0.0.1:8000/api/buscar_historia_nutricion"


export const getAllHistoriaNutricion = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(LIST_HISTORIA_NUTRICION_URL, config);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error en la solicitud: ' + response.status);
        }
    } catch (error) {
        throw new Error('Error al obtener historias de nutrición: ' + error.message);
    }
};

export const visualizarHistorias = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(VISUALIZAR_URL, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al retornar las historias de nutricion")
        }
    } catch (error) {
        console.error(error)
    }
}

export const registerHistoriaNutricion = async (historiaNutricion) => {
    try {
        const config = await getConfigFiles();
        const response = await axios.post(SAVE_HISTORIANUTRICION_URL, historiaNutricion, config)
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
        console.error(error)
    }
}

export const calcularIMC = async (peso, altura) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${CALCULADORA_IMC_URL}/${altura}/${peso}/`, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al utilizar calculadora")
        }
    } catch (error) {
        console.error(error)
    }
}

export const calcularCircuferencia = async (genero, circuferencia) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${CALCULADORA_CIRCUFERENCIA_URL}/${genero}/${circuferencia}/`, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al utilizar la calculadora ")
        }
    } catch (error) {
        console.error(error)
    }
}

export const visualizarHistoriasPaciente = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${VISUALIZAR_URL}/${idPaciente}/`, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al retornar historia del paciente")
        }
    } catch (error) {
        console.error(error)
    }
}
export const buscarHistoriaNutricion = async (idPaciente) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${SEARCH_URL}/${idPaciente}/`, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error al retornar historia nutricion")
        }
    } catch (error) {
        console.error(error)
    }
}