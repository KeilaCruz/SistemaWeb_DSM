import * as echarts from 'echarts';
import { getAllHistoriaNutricion } from '../../services/Nutriologo';
import { useState, useEffect, useContext } from 'react';
import { setToken } from '../../services/HeaderAuthorization';
import AuthContext from '../../context/AuthProvider';

export const BarChart = () => {
    const { authTokens } = useContext(AuthContext);


const [cantidadDislipidemias, setCantidadDislipidemias] = useState(0);
  const [cantidadHipertension, setCantidadHipertension] = useState(0);
  const [cantidadDiabetes, setCantidadDiabetes] = useState(0);
  const [cantidadGastrointestinal, setCantidadGastrointestinal] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await setToken(authTokens.access);
        const historialesNutricion = await getAllHistoriaNutricion();
        
        // Filtrar y contar los historiales de nutrición por enfermedad donde el valor es true
        const historialesDislipidemias = historialesNutricion.filter(historial => historial.indicadores_clinicos.AP_dislipidemias === true).length;
        const historialesHipertension = historialesNutricion.filter(historial => historial.indicadores_clinicos.AP_hipertension === true).length;
        const historialesDiabetes = historialesNutricion.filter(historial => historial.indicadores_clinicos.AP_diabetes_mellitus === true).length;
        const historialesGastrointestinal = historialesNutricion.filter(historial => historial.indicadores_clinicos.problema_gastrointestinal === true).length;
        
        // Establecer la cantidad de personas con cada enfermedad
        setCantidadDislipidemias(historialesDislipidemias);
        setCantidadHipertension(historialesHipertension);
        setCantidadDiabetes(historialesDiabetes);
        setCantidadGastrointestinal(historialesGastrointestinal);

      } catch (error) {
        console.error('Error al obtener los historiales de nutrición:', error);
      }
    };

    fetchData();
  }, []);

    
  useEffect(() => {
    // Datos para el gráfico de barras
    const data = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Diabetes', 'Dislipidemia', 'Gastrointestinal', 'Hipertension'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Cantidad',
                type: 'bar',
                barWidth: '60%',
                data: [cantidadDiabetes, cantidadDislipidemias, cantidadGastrointestinal, cantidadHipertension]
            }
        ]
    };
    

    // Obtener el contenedor del gráfico
    const chartContainer = document.getElementById('bar-chart');

    // Inicializar el gráfico de barras
    const chart = echarts.init(chartContainer);

    // Establecer los datos en el gráfico
    chart.setOption(data);

    // Limpia el gráfico al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, [cantidadDiabetes, cantidadDislipidemias, cantidadGastrointestinal, cantidadHipertension]);

  return <div id="bar-chart" style={{ height: '400px' }} className='col-md-6 col-sm-4'></div>;
};

