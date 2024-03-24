import { useState, useEffect } from "react";
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import { getAllPacientes } from "../../services/Recepcionista";

export function BarraDeBusqueda({ setResultados }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const { authTokens } = useContext(AuthContext);

  
  const fechData = async (value) => {
    try {
      await setToken(authTokens.access);
      const pacientes = await getAllPacientes();
      const resultados = pacientes.filter((paciente) => {
        const nombreCompleto =
          paciente.datos_personales.nombre +
          paciente.datos_personales.apePaterno +
          paciente.datos_personales.apeMaterno +
          paciente.CURP +
          paciente.datos_contacto.telefono;
        return (
          value &&
          paciente &&
          nombreCompleto &&
          nombreCompleto.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResultados(resultados);
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
    }
  };
  
  const handleChanges = (value) => {
    setTerminoBusqueda(value);
    fechData(value);
  };
  

  return (
    <div>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar por nombre, CURP, teléfono"
        aria-label="Search"
        value={terminoBusqueda}
        onChange={(e) => handleChanges(e.target.value)}
        style={{ width: "280px" }} // Ajusta el ancho según tus necesidades
      />
    </div>
  );
}
