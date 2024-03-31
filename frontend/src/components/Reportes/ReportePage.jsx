import { PieChart } from "./PieChart";
import { BarChart } from "./BarChart";
import { PieChart2 } from "./PieChart2";
import { getAllPacientes } from "../../services/Recepcionista";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";
import { LineChart } from "./LineChart";

export function ReportePage() {
  const [totalPacientes, setTotalPacientes] = useState("");
  const [cantidadMasculinos, setCantidadMasculino] = useState("");
  const [cantidadFemenino, setCantidadFemenino] = useState("");
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await setToken(authTokens.access);
        const pacientes = await getAllPacientes();
        const masculino = pacientes.filter(
          (paciente) => paciente.datos_personales.sexo === "masculino"
        ).length;
        const femenino = pacientes.filter(
          (paciente) => paciente.datos_personales.sexo === "femenino"
        ).length;

        setCantidadFemenino(femenino);
        setCantidadMasculino(masculino);

        setTotalPacientes(pacientes.length); // "length" es una propiedad, no una función
      } catch (error) {
        console.error("Error al obtener la cantidad de pacientes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row g-3">
          <div className="offset-md-1 col-md-4">
            <p className="h1">Total de pacientes: {totalPacientes}</p>
            <p className="h3">Femeninos: {cantidadFemenino}</p>
            <p className="h3">Masculino: {cantidadMasculinos}</p>
          </div>

          <PieChart />

            <hr />

          <div className="offset-md-1 col-md-4 mt-2">
            <p className="h1">Enfermedades cronicas</p>
          </div>
          <LineChart/>

          <hr />

          <div className="offset-md-1 col-md-4 mt-2">
            
            <p className="h1">Derechohabiencia</p>
          </div>
          <PieChart2 />
        </div>
      </div>
    </div>
  );
}
