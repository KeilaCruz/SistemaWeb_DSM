import axios from "axios";
import { getConfig } from "./HeaderAuthorization";
import Swal from "sweetalert2";

const LIST_PACIENTES_URL = "http://127.0.0.1:8000/api/paciente/"
const SAVE_PACIENTE_URL = "http://127.0.0.1:8000/api/registrar_paciente/";
const SEARCH_PACIENTE_URL = "http://127.0.0.1:8000/api/buscar_paciente/";
const SAVE_CITA_URL = "http://127.0.0.1:8000/api/agendar_cita/";
const LIST_CITASACTIVAS_URL = "http://127.0.0.1:8000/api/cita_activas/";
const LIST_CITASINACTIVAS_URL = "http://127.0.0.1:8000/api/cita_inactivas/";
const LIST_CITAS_URL ="http://127.0.0.1:8000/api/cita/";
const SAVE_EVENTO_URL = "http://127.0.0.1:8000/api/registrar_evento/";
const LIST_EVENTO = "http://127.0.0.1:8000/api/evento/"
const EDIT_EVENTO = "http://127.0.0.1:8000/api/editar_evento/"
const SEARCH_USUARIO_URL = "http://127.0.0.1:8000/api/buscar_usuario/";
const LIST_USUARIOS_URL = "http://127.0.0.1:8000/api/visualizar_usuario/";
const EDIT_PACIENTE_URL = "http://127.0.0.1:8000/api/editar_paciente/";

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
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Paciente registrado con exito.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('Se hizo clic en Aceptar');
                  location.href ='/buscar_paciente';
                }
              });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo salio mal!",
                footer: '<a href="#">Intente de nuevo</a>'
              });
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
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Cita registrado correctamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('Se hizo clic en Aceptar');
                  location.href ='/calendario';
                }
              });
        } else {
            console.log("error al registrar")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo salio mal!",
                footer: '<a href="#">Intente de nuevo</a>'
              });
            return response
        }
    } catch (error) {
        console.error(error)
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
export const getAllCitas = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${EDIT_PACIENTE_URL}${CURP}/`, config)
        if (response.status == 200) {
            return response.data;
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
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Paciente modificado con exito',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('Se hizo clic en Aceptar');
                  location.href ='/buscar_paciente';
                }
              });
        } else {
            console.log("error al modificar")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo salio mal!",
                footer: '<a href="#">Intente de nuevo</a>'
              });
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
    }} 

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

export const registerEvento = async (evento) => {
    try {
        const config = await getConfig()
        const response = await axios.post(SAVE_EVENTO_URL, evento, config)
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Evento registrado con exito',
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

export const getAllEventos = async () => {
    try {
        const config = await getConfig()
        const response = await axios.get(LIST_EVENTO, config)
        if (response.status === 200) {
            return response.data
        } else {
            console.error("error al hacer solicitud")
        }
    } catch (error) {
        console.log(error)
    }
}

export const getEvento = async (idEvento) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${EDIT_EVENTO}${idEvento}/`, config)
        if (response.status == 200) {
            return response.data;
        } else {
            console.log("Error al hacer la llamada")
        }
    } catch (error) {
        console.log(error)
    }
}

export const editarEvento = async (idEvento, evento) => {
    try {
        const config = await getConfig();
        const response = await axios.put(`${EDIT_EVENTO}${idEvento}/`, evento, config)
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Evento modificado con exito',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('Se hizo clic en Aceptar');
                  location.href ='/ver_evento';
                }
              });
        } else {
            console.log("error al modificar")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo salio mal!",
                footer: '<a href="#">Intente de nuevo</a>'
              });
            return response;
        }
    } catch (error) {
        console.error(error)
    }
}






