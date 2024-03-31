import { useEffect } from 'react';
import * as echarts from 'echarts';

export function PieChart () {
    
  useEffect(() => {
    // Datos para el gráfico de barras
    const data = {
        tooltip: {
            trigger: "item"
        },
        legend: {
            top: "5%",
            left: "center"
        },
        toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "40",
                        fontWeight: "bold"
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: "Search Engine" },
                    { value: 735, name: "Direct" },
                    { value: 580, name: "Email" },
                    { value: 484, name: "Union Ads" },
                    { value: 300, name: "Video Ads" }
                ]
            }
        ]
    };

    // Obtener el contenedor del gráfico
    const chartContainer = document.getElementById('pie-chart');

    // Inicializar el gráfico de barras
    const chart = echarts.init(chartContainer);

    // Establecer los datos en el gráfico
    chart.setOption(data);

    // Limpia el gráfico al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, []);

  return(
    <div className='col-md-5 col-sm-4'>
                
            <div id="pie-chart" style={{ height: '400px' }}  ></div>
    </div>
  ) 
};



