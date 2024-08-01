import axios from "axios";
import { getConfig } from "./HeaderAuthorization";
import Swal from 'sweetalert2'

const URL_DOWNLOAD_LIST_PACIENTES = "http://127.0.0.1:8000/api/exportar/pacientes";
const URL_DOWNLOAD_LIST_CITAS = "http://127.0.0.1:8000/api/exportar/citas"
const URL_DOWNLOAD_LIST_HISTORIAS_NUTRICION = "http://127.0.0.1:8000/api/exportar/historias/nutricion"
const URL_DOWNLOAD_LIST_FICHA_PSICO_ADULTO = "http://127.0.0.1:8000/api/exportar/fichas/psicologicas/adulto"
const URL_DOWNLOAD_LIST_FICHA_PSICO_NINO = "http://127.0.0.1:8000/api/exportar/fichas/psicologicas/nino"

export const getReportePacientes = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(URL_DOWNLOAD_LIST_PACIENTES, {
            ...config,
            responseType: 'blob'
        })
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Lista de pacientes.xlsx')
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Se ha descargado el excel correctamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Se hizo clic en Aceptar');
                }
            });
        } else {
            throw new Error("Error al descargar el reporte");
        }
    } catch (error) {
        console.error("Error al descargar el reporte", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salió mal!",
            footer: '<a href="#">Intente de nuevo</a>'
        });
    }
}

export const getReporteCitas = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(URL_DOWNLOAD_LIST_CITAS, {
            ...config,
            responseType: 'blob'
        })
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Lista de citas.xlsx')
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Se ha descargado el excel correctamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Se hizo clic en Aceptar');
                }
            });
        } else {
            throw new Error("Error al descargar el reporte");
        }
    } catch (error) {
        console.error("Error al descargar el reporte", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salió mal!",
            footer: '<a href="#">Intente de nuevo</a>'
        });
    }
}

export const getReporteHistoriaNutricion = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(URL_DOWNLOAD_LIST_HISTORIAS_NUTRICION, {
            ...config,
            responseType: 'blob'
        })
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Lista de historias nutricion.xlsx')
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Se ha descargado el excel correctamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Se hizo clic en Aceptar');
                }
            });
        } else {
            throw new Error("Error al descargar el reporte");
        }
    } catch (error) {
        console.error("Error al descargar el reporte", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salió mal!",
            footer: '<a href="#">Intente de nuevo</a>'
        });
    }
}

export const getReporteFichaPsicoAdulto = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(URL_DOWNLOAD_LIST_FICHA_PSICO_ADULTO, {
            ...config,
            responseType: 'blob'
        })
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Lista de fichas psicologicas adulto.xlsx')
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Se ha descargado el excel correctamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Se hizo clic en Aceptar');
                }
            });
        } else {
            throw new Error("Error al descargar el reporte");
        }
    } catch (error) {
        console.error("Error al descargar el reporte", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salió mal!",
            footer: '<a href="#">Intente de nuevo</a>'
        });
    }
}

export const getReporteFichaPsicoNino = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(URL_DOWNLOAD_LIST_FICHA_PSICO_NINO, {
            ...config,
            responseType: 'blob'
        })
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Lista de fichas psicologicas niño.xlsx')
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                icon: 'success',
                title: '¡Operación exitosa!',
                text: 'Se ha descargado el excel correctamente.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Se hizo clic en Aceptar');
                }
            });
        } else {
            throw new Error("Error al descargar el reporte");
        }
    } catch (error) {
        console.error("Error al descargar el reporte", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salió mal!",
            footer: '<a href="#">Intente de nuevo</a>'
        });
    }
}