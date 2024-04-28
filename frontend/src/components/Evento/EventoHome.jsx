import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";
import { getAllEventos } from "../../services/Recepcionista";

export function EventoHome() {
  const { authTokens } = useContext(AuthContext);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function loadEventos() {
      try {
        await setToken(authTokens.access);
        const response = await getAllEventos();
        const eventosAyer = response.filter((evento) => {
          const fechaEvento = new Date(evento.datos_evento.fecha);
          const fechaAyer = new Date();
          fechaAyer.setDate(fechaAyer.getDate() - 1); // Resta un día para obtener la fecha de ayer

          return (
            fechaEvento.getDate() === fechaAyer.getDate() &&
            fechaEvento.getMonth() === fechaAyer.getMonth() &&
            fechaEvento.getFullYear() === fechaAyer.getFullYear()
          );
        });
        setEventos(eventosAyer);
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    }
    loadEventos();
  }, [authTokens.access]);

  return (
    <>
      <div style={{ marginBottom: "50px" }} className="mt-2 d-flex justify-content-center">
        <h2>Eventos de hoy</h2>
      </div>

      {eventos.length === 0 ? (
  <p>No hay eventos disponibles</p>
) : (
  <table>
    <thead className="cabecera">
      <tr>
        <th className="columv2">#</th>
        <th className="columv2">Evento</th>
        <th className="columv2">Hora</th>
      </tr>
    </thead>
    <tbody>
      {eventos.map((evento, index) => (
        <tr key={evento.idEvento}>
          <th className="filav2">{index + 1}</th>
          <td className="filav2" style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
            {evento.datos_evento.nom_evento}
          </td>
          <td className="filav2">{evento.datos_evento.hora}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

    </>
  );
}
