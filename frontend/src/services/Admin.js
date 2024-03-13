import axios from "axios";
import { getConfig } from "./HeaderAuthorization";

const CREATE_USER = "http://127.0.0.1:8000/api/crear_usuario/"

export const registerUsuario= async (usuario) => {
    try {
        const config = await getConfig();
        const response = await axios.post(CREATE_USER, usuario, config);

        if (response.status === 201) {
            alert("Usuario registrado correctamente");
        } else {
            console.error("Error al registrar usuario:", response);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};