import * as echarts from 'echarts';
import { useState, useEffect, useContext } from 'react';
import { setToken } from '../../services/HeaderAuthorization';
import AuthContext from '../../context/AuthProvider';
import { getAllHistoriaNutricion } from '../../services/Nutriologo';

export function LineChart() {
  const { authTokens } = useContext(AuthContext);

  const [patientsByMonth, setPatientsByMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await setToken(authTokens.access);
        const historialesNutricion = await getAllHistoriaNutricion();
  
        // Contar el número de pacientes por enfermedad y por mes
        const patientsByMonthAndDisease = historialesNutricion.reduce((acc, historia) => {
          const fechaRegistro = new Date(historia.fecha_registro);
          const month = fechaRegistro.getMonth();
          const diseases = ['AP_diabetes_mellitus', 'AP_hipertension', 'AP_dislipidemias', 'problema_gastrointestinal'];
          diseases.forEach(enfermedad => {
            // Solo contar si la enfermedad es verdadera
            if (historia.indicadores_clinicos[enfermedad] === true) {
              acc[enfermedad] = acc[enfermedad] || Array.from({ length: 12 }, () => 0);
              acc[enfermedad][month] += 1;
            }
          });
          return acc;
        }, {});
  
        setPatientsByMonth(patientsByMonthAndDisease);
      } catch (error) {
        console.error('Error al obtener los historiales de nutrición:', error);
      }
    };
  
    fetchData();
  }, [authTokens.access]);
  

  useEffect(() => {
    const seriesData = Object.entries(patientsByMonth).map(([enfermedad, pacientes]) => ({
      name: enfermedad,
      type: 'line',
      data: pacientes
    }));

    const data = {
        legend: {
            data: Object.keys(patientsByMonth)
          },
        title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          dataZoom: {
            show: true,
            start: 0
        },
      xAxis: {
        type: 'category',
        data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      },
      yAxis: {
        type: 'value'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: seriesData
    };

    const chartContainer = document.getElementById('line-chart');
    const chart = echarts.init(chartContainer);
    chart.setOption(data);

    return () => {
      chart.dispose();
    };
  }, [patientsByMonth]);

  return(
    <div lassName='col-md-5 col-sm-4'>
        <div id="line-chart" style={{ height: '400px' }}></div>
    </div>
  ) 
};

/* title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  dataZoom: {
    show: true,
    start: 0
},
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ] */
  

