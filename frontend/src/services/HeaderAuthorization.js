
let tokenConfig;

export const setToken = async (token) => {
    tokenConfig = token;
}

export const getConfig = async () => {
    /**
     * Crea la configuracion del encabezado con el token de acceso
     */
    if (!tokenConfig) {
        throw new Error('Token no enviado');
    }
    return {
        headers: {
            Authorization: `Bearer ${tokenConfig}`,
            'Content-Type': 'application/json',
        }
    }
}
