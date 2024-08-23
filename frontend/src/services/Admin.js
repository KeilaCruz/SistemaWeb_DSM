import axios from "axios";
import { getConfig } from "./HeaderAuthorization";
import Swal from 'sweetalert2'


const CREATE_USER = "http://127.0.0.1:8000/api/crear_usuario/"

export const registerUsuario= async (usuario) => {
    try {
        const config = await getConfig();
        const response = await axios.post(CREATE_USER, usuario, config);

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Usuario registrado exitosamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('Se hizo clic en Aceptar');
                  location.href ='/ver_usuario';
                }
              });
        } else {
            console.error("Error al registrar usuario:", response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo salio mal!",
                footer: '<a href="#">Intente de nuevo</a>'
              });
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};