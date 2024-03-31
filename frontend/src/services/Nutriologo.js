import axios from "axios";
import { getConfig } from "./HeaderAuthorization";
import Swal from "sweetalert2";


const SAVE_HISTORIANUTRICION_URL = "http://127.0.0.1:8000/api/registrar_historia_nutricion"
const LIST_HISTORIA_NUTRICION_URL ="http://127.0.0.1:8000/api/historia_nutricion/"



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


export const registerHistoriaNutricion = async (historiaNutricion) => {
    try {
        const config = await getConfig()
        const response = axios.post(SAVE_HISTORIANUTRICION_URL, historiaNutricion, config)
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