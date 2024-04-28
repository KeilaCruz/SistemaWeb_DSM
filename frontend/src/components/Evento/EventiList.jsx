import { getAllEventos } from "../../services/Recepcionista";
import { setToken } from "../../services/HeaderAuthorization";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { EventoCard } from "./EventoCard";
import { startOfWeek, endOfWeek, startOfDay, subDays, addDays } from 'date-fns';



export function EventoList() {
    const [eventos, setEventos] = useState([]);
    const [filtro, setFiltro] = useState('dia'); // Estado para almacenar el filtro seleccionado
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        async function loadEventos() {
            try {
                await setToken(authTokens.access);
                const response = await getAllEventos();
                setEventos(response);
            } catch (error) {
                console.error("Error al cargar los eventos:", error);
            }
        }
        loadEventos();
    }, []);

    // Función para filtrar eventos según el filtro seleccionado
    const filtrarEventos = () => {
        const hoy = startOfDay(new Date()); // Obtener la fecha de hoy
      switch (filtro) {
        case 'hoy':
              const ayer = subDays(hoy, 1); // Obtener la fecha de ayer
              return eventos.filter(evento => {
                const fechaEvento = new Date(evento.datos_evento.fecha);
                return fechaEvento >= ayer && fechaEvento <= hoy;
              });
              case 'semana':
                
                const fechaAyer = subDays(hoy, 1); // Obtener la fecha de ayer
                const finSemana = addDays(hoy, 7); // Obtener la fecha de 7 días en adelante

                return eventos.filter(evento => {
                    const fechaEvento = startOfDay(new Date(evento.datos_evento.fecha));
                    return (fechaEvento >= fechaAyer && fechaEvento <= finSemana);
                });

          case 'mes':
              const unMesDespues = new Date(hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate());
              return eventos.filter(evento => {
                  const fechaEvento = new Date(evento.datos_evento.fecha);
                  return fechaEvento >= hoy && fechaEvento <= unMesDespues;
              });
            case 'hacia_atras':
                const haceTreintaDias = subDays(hoy, 30); // Obtener la fecha hace 30 días
                return eventos.filter(evento => {
                    const fechaEvento = new Date(evento.datos_evento.fecha);
                    return fechaEvento >= haceTreintaDias && fechaEvento <= hoy;
                });
          
          default:
              return eventos;
      }
  };
  

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    {/* Controles de filtro */}
                    <select
                        className="form-select"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    >
                        <option value="hacia_atras">Eventos pasados</option>
                      <option value="hoy">Hoy</option>
                        <option value="semana">7 dias</option>
                        <option value="mes">30 dias</option>
                        
                    </select>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row hidden-md-up">
                        {filtrarEventos().map((evento) => (
                            <EventoCard
                                key={evento.idEvento}
                                evento={evento}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


