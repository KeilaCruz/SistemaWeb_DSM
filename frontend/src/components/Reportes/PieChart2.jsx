import * as echarts from 'echarts';
import { getAllPacientes } from "../../services/Recepcionista";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";

export function PieChart2 () {
  const [cantidadIMSS, setCantidadIMSS] = useState("");
  const [cantidadISSSTE, setCantidadISSSTE] = useState("");
  const [cantidadPEMEX, setCantidadPEMEX] = useState("");
  const [cantidadSEDENA, setCantidadSEDENA] = useState("");
  const [cantidadSEDMAR, setCantidadSEDMAR] = useState("");
  const [cantidadSSA_SESVER, setCantidadSSA_SESVER] = useState("");
  const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            await setToken(authTokens.access);
            const pacientes = await getAllPacientes();

            const IMSS = pacientes.filter((paciente) => paciente.datos_contacto.derecho_habiencia === "IMSS").length;
            const ISSSTE = pacientes.filter((paciente) => paciente.datos_contacto.derecho_habiencia === "ISSSTE").length;
            const PEMEX = pacientes.filter((paciente) => paciente.datos_contacto.derecho_habiencia === "PEMEX").length;
            const SEDENA = pacientes.filter((paciente) => paciente.datos_contacto.derecho_habiencia === "SEDENA").length;
            const SEDMAR = pacientes.filter((paciente) => paciente.datos_contacto.derecho_habiencia === "SEDMAR").length;
            const SSA_SESVER = pacientes.filter((paciente) => paciente.datos_contacto.derecho_habiencia === "SSA/SESVER").length;

    
            setCantidadIMSS(IMSS);
            setCantidadISSSTE(ISSSTE);
            setCantidadPEMEX(PEMEX);
            setCantidadSEDENA(SEDENA);
            setCantidadSEDMAR(SEDMAR);
            setCantidadSSA_SESVER(SSA_SESVER);
    
          } catch (error) {
            console.error("Error al obtener la cantidad de pacientes:", error);
          }
        };
    
        fetchData();
      }, []);

    
  useEffect(() => {
    // Datos para el gráfico de barras
    const data = {
        title: {
            text: 'Derechohabiencia',
            subtext: 'Datos',
            left: 'center'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: cantidadIMSS, name: 'IMSS' },
                { value: cantidadISSSTE, name: 'ISSSTE' },
                { value: cantidadPEMEX, name: 'PEMEX' },
                { value: cantidadSEDENA, name: 'SEDENA' },
                { value: cantidadSEDMAR, name: 'SEDMAR' },
                { value: cantidadSSA_SESVER, name: 'SSA/SESVER' }

              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
    };

    // Obtener el contenedor del gráfico
    const chartContainer = document.getElementById('pie-chart2');

    // Inicializar el gráfico de barras
    const chart = echarts.init(chartContainer);

    // Establecer los datos en el gráfico
    chart.setOption(data);

    // Limpia el gráfico al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, [cantidadIMSS,cantidadISSSTE,cantidadPEMEX,cantidadSEDENA,cantidadSEDMAR,cantidadSSA_SESVER]);

  return(
    <div className='col-md-6 col-sm-4'>
                
            <div id="pie-chart2" style={{ height: '500px' }}  ></div>
    </div>
  ) 
};



