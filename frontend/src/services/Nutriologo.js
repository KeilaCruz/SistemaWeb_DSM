import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const SAVE_HISTORIANUTRICION_URL = "http://127.0.0.1:8000/api/registrar_historia_nutricion"
const CALCULADORA_IMC_URL = "http://127.0.0.1:8000/api/calcular_imc"
const CALCULADORA_CIRCUFERENCIA_URL = "http://127.0.0.1:8000/api/calculadora_circuferencia"
export const registerHistoriaNutricion = async (historiaNutricion) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_HISTORIANUTRICION_URL, historiaNutricion, config)
        if (response.status === 201) {
            alert("Registrado con exito")
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