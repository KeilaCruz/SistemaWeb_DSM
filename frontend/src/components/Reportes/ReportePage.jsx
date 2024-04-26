import { getAllPacientes } from "../../services/Recepcionista";
import { getAllHistoriaNutricion } from '../../services/Nutriologo';
import { useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";
import * as echarts from 'echarts';
import { PDFDownloadLink, Document, Page, Image, StyleSheet,View, Text } from '@react-pdf/renderer';

export function ReportePage() {
  const chartRefs = useRef([null, null, null]); // Refs para las dos gráficas
  const [pdfDataURL, setPdfDataURL] = useState(null);
  const { authTokens } = useContext(AuthContext);





  const generatePDF = () => {
    
    // Generar el PDF con react-pdf-render
    const MyDocument = () => (
      <Document>
      <Page size="A4" style={{ paddingLeft: 40, paddingRight: 40, color: '#902829' }}>
        
        {/* Renderizar las dos imágenes en el PDF */}
        {chartRefs.current.map((chartRef, index) => (
          <Image
            key={index}
            src={getImageBase64(chartRef)}
            style={{ width: '600px', height: 'auto', marginBottom: '30px', marginTop:"20px" }}
          />
        ))}
        <Text  style={{ color: '#5570c7', fontSize: 30 }}>Datos de la primera grafica</Text>
        <Text>Total de pacientes: {totalPacientes}</Text>
        <Text>Mujeres: {cantidadFemenino}</Text>
        <Text>Hombres: {cantidadMasculinos}</Text>
        <Text>No binarios: {cantidadNoBinarios}</Text>
        <Text>Otros: {cantidadOtros}</Text>




        <Text style={{ color: '#5570c7', fontSize: 30 }}>Datos de la segunda grafica grafica</Text>
      {Object.entries(patientsByMonth).map(([enfermedad, pacientesPorMes], index) => (
        <View key={index}>
          <Text style={{paddingBottom:30}}></Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{enfermedad}:</Text>
          {pacientesPorMes.map((cantidad, mes) => (
            <Text key={mes}>Mes {mes + 1}: {cantidad}</Text>
          ))}
        </View>
      ))}
        <Text style={{ color: '#5570c7', fontSize: 30 }}>Datos de la tercera grafica</Text>
        <Text>IMSS: {cantidadIMSS}</Text>
        <Text>ISSSTE: {cantidadISSSTE}</Text>
        <Text>PEMEX: {cantidadPEMEX}</Text>
        <Text>SEDENA: {cantidadSEDENA}</Text>
        <Text>SEDMAR: {cantidadSEDMAR}</Text>
        <Text>SSA/SESVER: {cantidadSSA_SESVER}</Text>
      </Page>
    </Document>
    
    );

    // Convertir el documento PDF en un enlace de descarga
    const pdfURL = (
      <PDFDownloadLink document={<MyDocument />} fileName="Reporte.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
      </PDFDownloadLink>
    );

    // Actualizar el estado con el enlace de descarga del PDF
    setPdfDataURL(pdfURL);
  };

  const getImageBase64 = (chartRef) => {
    if (!chartRef) return null;
    const canvas = chartRef.getElementsByTagName('canvas')[0];
    return canvas.toDataURL();
  };


/* Primera grafica ----------------------------------------------------------------------------------------------------------- */

const [totalPacientes, setTotalPacientes] = useState("");
const [cantidadMasculinos, setCantidadMasculino] = useState("");
const [cantidadFemenino, setCantidadFemenino] = useState("");
const [cantidadNoBinarios, setCantidadNoBinarios] = useState("");
const [cantidadOtros, setCantidadOtros] = useState("");

useEffect(() => {
  const fetchData1 = async () => {
    try {
      await setToken(authTokens.access);
      const pacientes = await getAllPacientes();

      const femenino = pacientes.filter((paciente) => paciente.datos_personales.sexo === "femenino").length;
      const masculino = pacientes.filter((paciente) => paciente.datos_personales.sexo === "masculino").length;
      const noBinarios = pacientes.filter((paciente) => paciente.datos_personales.sexo === "no-binario").length;
      const otro = pacientes.filter((paciente) => paciente.datos_personales.sexo === "otro").length;

      setCantidadFemenino(femenino)
      setCantidadMasculino(masculino)
      setCantidadNoBinarios(noBinarios)
      setCantidadOtros(otro)
      
      setTotalPacientes(pacientes.length); // "length" es una propiedad, no una función
    } catch (error) {
      console.error("Error al obtener la cantidad de pacientes:", error);
    }
  };

  fetchData1();
}, []);


  useEffect(() => {
    const data1 = {
      title: {
        text: 'Cantidad de pacientes por genero',
        subtext: 'Datos 2024',
        left: 'center'
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
          name: 'Pacientes',
          type: 'pie',
          radius: '50%',
          data: [
            { value: cantidadFemenino, name: 'Mujeres' },
            { value: cantidadMasculinos, name: 'Hombres' },
            { value: cantidadNoBinarios, name: 'No Binario' },
            { value: cantidadOtros, name: 'Otro' },
            

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

    // Inicializar el primer gráfico
    const chart1 = echarts.init(chartRefs.current[0]);
    chart1.setOption(data1);

    // Limpia el primer gráfico al desmontar el componente
    return () => {
      chart1.dispose();
    };
  }, [cantidadFemenino, cantidadMasculinos, cantidadNoBinarios, cantidadOtros]);

  /* Segunda grafica --------------------------------------------------------------------------------------------------- */

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
    // Datos para el segundo gráfico
    const seriesData = Object.entries(patientsByMonth).map(([enfermedad, pacientes]) => ({
      name: enfermedad,
      type: 'line',
      data: pacientes
    }));

    const data2 = {
      title: {
        text: 'Enfermedades cronicas',
        subtext: '2024',
        left: 'center'
      },
      legend: {
        data: Object.keys(patientsByMonth),
        top: 50 // Ajustar la posición vertical de la leyenda
      },
      grid: {
        top: 100 // Ajustar el margen superior del grid para dar espacio al título
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
    

    // Inicializar el segundo gráfico
    const chart2 = echarts.init(chartRefs.current[1]);
    chart2.setOption(data2);

    // Limpia el segundo gráfico al desmontar el componente
    return () => {
      chart2.dispose();
    };
  }, [patientsByMonth]);

  /* Tercera grafica --------------------------------------------------------------------------------------------------- */
  const [cantidadIMSS, setCantidadIMSS] = useState("");
  const [cantidadISSSTE, setCantidadISSSTE] = useState("");
  const [cantidadPEMEX, setCantidadPEMEX] = useState("");
  const [cantidadSEDENA, setCantidadSEDENA] = useState("");
  const [cantidadSEDMAR, setCantidadSEDMAR] = useState("");
  const [cantidadSSA_SESVER, setCantidadSSA_SESVER] = useState("");

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
    const data3 = {
      title: {
        text: 'Derechohabiencia',
        subtext: '2024',
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

    // Inicializar el tercer gráfico
    const chart3 = echarts.init(chartRefs.current[2]);
    chart3.setOption(data3);

    // Limpia el tercer gráfico al desmontar el componente
    return () => {
      chart3.dispose();
    };
  }, [cantidadIMSS,cantidadISSSTE,cantidadPEMEX,cantidadSEDENA,cantidadSEDMAR,cantidadSSA_SESVER]);

 


  return (
    <div>
      <div className="container-fluid pb-4">
        <div className="row g-3">
          <div className="offset-md-1 col-md-6">
            <p className="h1">Total de pacientes: {totalPacientes}</p>
            <p className="h3">Mujeres: {cantidadFemenino}</p>
            <p className="h3">Hombres: {cantidadMasculinos}</p>
            <p className="h3">No binarios: {cantidadNoBinarios}</p>
            <p className="h3">Otro: {cantidadOtros}</p>

          </div>
          <div className="offset-md-1 col-md-3">
            <button onClick={generatePDF} className=" btn btn-secondary">Generar <i className="fa-solid fa-file-pdf" style={{fontSize:"30px",color:"red"}}></i> </button>
         {pdfDataURL}
          </div>
          
          <div className="offset-md-2 col-md-10">
          <div style={{ height: '700px' }} ref={el => chartRefs.current[0] = el}></div>
          </div>
         
          <hr />

          <div className="offset-md-1 col-md-3 mt-2">
            <p className="h1">Enfermedades cronicas</p>
          </div>

          <div style={{ height: '500px' }} ref={el => chartRefs.current[1] = el}></div>

          

          <hr />

          <div className="offset-md-1 col-md-4 mt-2">
            <p className="h1">Derechohabiencia</p>
          </div>
          <div className="offset-md-2 col-md-10">
          <div style={{ height: '700px' }} ref={el => chartRefs.current[2] = el}></div>

          </div>

         

        </div>

        

      </div>
    </div>
  );
}
