import axios from 'axios';

const URL_API = 'http://127.0.0.1:8000/api/crear_usuario/';

export const enviarDatosAPI = async (data, token) => {
  try {
    const response = await axios.post(URL_API, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Puedes manejar la respuesta según tus necesidades
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error);
    throw new Error('Error al realizar la solicitud a la API');
  }
};

