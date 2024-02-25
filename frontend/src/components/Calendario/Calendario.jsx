import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es"; // Importa el idioma español
import { useState, useContext, useEffect } from "react";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { Button, Modal } from "react-bootstrap";
import { getPaciente } from "../../services/Recepcionista";
import { getAllCitas } from "../../services/Recepcionista";
import { setToken } from "../../services/HeaderAuthorization";
import AuthContext from "../../context/AuthProvider";

export function Calendario() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState({});
  const { authTokens } = useContext(AuthContext);

  const handleShowModal = (info) => {
    setSelectedEvent(info.event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setEventDetails({});
    setShowModal(false);
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await setToken(authTokens.access);
        const citasData = await getAllCitas();
        const eventsData = await Promise.all(citasData.map(async (cita) => {
          const pacienteData = await getPaciente(cita.idPaciente);
          return {
            title: `${pacienteData.datos_personales.nombre} ${pacienteData.datos_personales.apePaterno} ${pacienteData.datos_personales.apeMaterno}`,
            start: new Date(`${cita.datos_cita.fecha_cita}T${cita.datos_cita.horario_cita}`),
          };
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <h1>Calendario de citas</h1>
        <FullCalendar
          events={events}
          eventContent={(info) => (
            <div
              style={{
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => handleShowModal(info)}
            >
              <b>{info.timeText}</b>
              <br />
              <i>{info.event.title}</i>
            </div>
          )}
          timeZone="local"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrap5Plugin,
          ]}
          initialView="timeGridWeek"
          themeSystem="bootstrap5"
          headerToolbar={{
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridMonth, timeGridWeek, timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          locales={[esLocale]} // Configura los idiomas disponibles
          locale="es" // Establece el idioma a español
        />
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Renderiza la información del evento seleccionado aquí */}
          {eventDetails && (
            <div>
              <p>Fecha de la cita: {selectedEvent?.start?.toLocaleString()}</p>
              <p>CURP: {selectedEvent?.extendedProps.paciente.CURP}</p>
              <p>
                Edad:{" "}
                {selectedEvent?.extendedProps.paciente.datos_personales.edad}
              </p>
              <p>
                Telefono:{" "}
                {selectedEvent?.extendedProps.paciente.datos_contacto.telefono}
              </p>
              <p>
                Derecho habiencia:{" "}
                {
                  selectedEvent?.extendedProps.paciente.datos_contacto
                    .derecho_habiencia
                }
              </p>
              {/* Agrega más detalles según sea necesario */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
