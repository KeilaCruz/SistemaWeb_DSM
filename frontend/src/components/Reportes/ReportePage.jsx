import { getAllPacientes } from "../../services/Recepcionista";
import { getAllHistoriaNutricion } from "../../services/Nutriologo";
import { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import { setToken } from "../../services/HeaderAuthorization";
import * as echarts from "echarts";
import {
  PDFDownloadLink,
  Document,
  Page,
  Image,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";

export function ReportePage() {
  const chartRefs = useRef([null, null, null]); // Refs para las dos gráficas
  const [pdfDataURL, setPdfDataURL] = useState(null);
  const { authTokens } = useContext(AuthContext);

  function getMonthName(mes) {
    const nombresMeses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return nombresMeses[mes];
  }

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#fff',
      border: '5px solid black',
      position: 'relative', // Necesario para que funcione el posicionamiento absoluto del pie de página
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
section: {
  marginBottom: 20,  // Aumenta el espacio entre secciones
},
header: {
  fontSize: 28,
  marginBottom: 15,  // Aumenta el espacio debajo del encabezado
  fontFamily: 'Times-Roman',
  textAlign: 'center',
},
text: {
  fontSize: 13,
  fontFamily: 'Times-Roman',
  marginBottom: 10,  // Aumenta el espacio entre bloques de texto
},
table: {
  display: 'table',
  width: 'auto',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#bfbfbf',
  marginBottom: 10,
},
tableRow: {
  flexDirection: 'row',
},
tableColHeader: {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#bfbfbf',
  backgroundColor: '#f2f2f2',
  padding: 5,
  width: '100%',
  flexGrow: 1,
},
tableCol: {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#bfbfbf',
  padding: 5,
  width: '100%',
  flexGrow: 1,
},
tableCellHeader: {
  fontSize: 12,
  fontFamily: 'Times-Bold',
  color: 'black',
  textAlign: 'center',
},
tableCell: {
  fontSize: 12,
  fontFamily: 'Times-Roman',
  color: 'black',
  textAlign: 'center',
},
footer: {
  position: 'absolute',
  bottom: 30,
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: 12,
  fontFamily: 'Times-Roman',
},
chart: {
  marginBottom: 5,
  marginTop: 10
}
  });
  
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>      

        {chartRefs.current.map((chartRef, index) => (
          <View key={index} style={styles.chart} >
            <Image src={getImageBase64(chartRef)} style={{ width: "600px", height: "auto" }} />
            {index === 0 && (
              <>
                <Text style={styles.header}>Cantidad de pacientes por género</Text>
                <Text style={styles.text}>Total de pacientes: {totalPacientes}</Text>
                <Text style={styles.text}>Mujeres: {cantidadFemenino}</Text>
                <Text style={styles.text}>Hombres: {cantidadMasculinos}</Text>
                <Text style={styles.text}>No binarios: {cantidadNoBinarios}</Text>
                <Text style={styles.text}>Otros: {cantidadOtros}</Text>
              </>
            )}
            {index === 1 && (
              <>
                <Text style={styles.header}>Enfermedades crónicas</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableCellHeader}>Mes</Text>
                  </View>
                  {Object.keys(patientsByMonth).map((enfermedad, i) => (
                    <View key={i} style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>{enfermedad}</Text>
                    </View>
                  ))}
                </View>
                {Array.from({ length: 12 }, (_, mes) => (
                  <View key={mes} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{getMonthName(mes)}</Text>
                    </View>
                    {Object.values(patientsByMonth).map((pacientesPorMes, i) => (
                      <View key={i} style={styles.tableCol}>
                        <Text style={styles.tableCell}>{pacientesPorMes[mes] || 0}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
              </>
            )}
            {index === 2 && (
              <>
                <Text style={styles.header}>Derechohabiencia</Text>
                <Text style={styles.text}>IMSS: {cantidadIMSS}</Text>
                <Text style={styles.text}>ISSSTE: {cantidadISSSTE}</Text>
                <Text style={styles.text}>PEMEX: {cantidadPEMEX}</Text>
                <Text style={styles.text}>SEDENA: {cantidadSEDENA}</Text>
                <Text style={styles.text}>SEDMAR: {cantidadSEDMAR}</Text>
                <Text style={styles.text}>SSA/SESVER: {cantidadSSA_SESVER}</Text>
              </>
            )}
          </View>
        ))}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`Página ${pageNumber} de ${totalPages}`)} fixed />
      </Page>
    </Document>
  );
  
  const generatePDF = () => {
    const pdfURL = (
      <PDFDownloadLink document={<MyDocument />} fileName="Reporte.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Generando PDF..." : "Descargar PDF"
        }
      </PDFDownloadLink>
    );
  
    setPdfDataURL(pdfURL);
  };

  const getImageBase64 = (chartRef) => {
    if (!chartRef) return null;
    const canvas = chartRef.getElementsByTagName("canvas")[0];

    const scale = 2;
    const width = canvas.width;
    const height = canvas.height;
    const scaledCanvas = document.createElement("canvas");
    scaledCanvas.width = width * scale;
    scaledCanvas.height = height * scale;
    const ctx = scaledCanvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.drawImage(canvas, 0, 0);

    return scaledCanvas.toDataURL();
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

        const femenino = pacientes.filter(
          (paciente) => paciente.datos_personales.sexo === "femenino"
        ).length;
        const masculino = pacientes.filter(
          (paciente) => paciente.datos_personales.sexo === "masculino"
        ).length;
        const noBinarios = pacientes.filter(
          (paciente) => paciente.datos_personales.sexo === "no-binario"
        ).length;
        const otro = pacientes.filter(
          (paciente) => paciente.datos_personales.sexo === "otro"
        ).length;

        setCantidadFemenino(femenino);
        setCantidadMasculino(masculino);
        setCantidadNoBinarios(noBinarios);
        setCantidadOtros(otro);

        setTotalPacientes(pacientes.length);
      } catch (error) {
        console.error("Error al obtener la cantidad de pacientes:", error);
      }
    };

    fetchData1();
  }, []);

  useEffect(() => {
    const data1 = {
      title: {
        text: "Cantidad de pacientes por género",
        subtext: "Datos 2024",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Pacientes",
          type: "pie",
          radius: "50%",
          data: [
            { value: cantidadFemenino, name: "Mujeres" },
            { value: cantidadMasculinos, name: "Hombres" },
            { value: cantidadNoBinarios, name: "No Binario" },
            { value: cantidadOtros, name: "Otro" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
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
        const patientsByMonthAndDisease = historialesNutricion.reduce(
          (acc, historia) => {
            const fechaRegistro = new Date(historia.fecha_registro);
            const month = fechaRegistro.getMonth();
            const diseases = [
              "AP_diabetes_mellitus",
              "AP_hipertension",
              "AP_dislipidemias",
              "problema_gastrointestinal",
            ];
            diseases.forEach((enfermedad) => {
              // Solo contar si la enfermedad es verdadera
              if (historia.indicadores_clinicos[enfermedad] === true) {
                acc[enfermedad] =
                  acc[enfermedad] || Array.from({ length: 12 }, () => 0);
                acc[enfermedad][month] += 1;
              }
            });
            return acc;
          },
          {}
        );

        setPatientsByMonth(patientsByMonthAndDisease);
      } catch (error) {
        console.error("Error al obtener los historiales de nutrición:", error);
      }
    };

    fetchData();
  }, [authTokens.access]);

  useEffect(() => {
    // Datos para el segundo gráfico
    const seriesData = Object.entries(patientsByMonth).map(
      ([enfermedad, pacientes]) => ({
        name: enfermedad,
        type: "line",
        data: pacientes,
      })
    );

    const data2 = {
      title: {
        text: "Enfermedades crónicas",
        subtext: "2024",
        left: "center",
      },
      legend: {
        data: Object.keys(patientsByMonth),
        top: 50, // Ajustar la posición vertical de la leyenda
      },
      grid: {
        top: 100, // Ajustar el margen superior del grid para dar espacio al título
      },
      tooltip: {
        trigger: "axis",
      },
      dataZoom: {
        show: true,
        start: 0,
      },
      xAxis: {
        type: "category",
        data: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
      },
      yAxis: {
        type: "value",
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      series: seriesData,
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

        const IMSS = pacientes.filter(
          (paciente) => paciente.datos_contacto.derecho_habiencia === "IMSS"
        ).length;
        const ISSSTE = pacientes.filter(
          (paciente) => paciente.datos_contacto.derecho_habiencia === "ISSSTE"
        ).length;
        const PEMEX = pacientes.filter(
          (paciente) => paciente.datos_contacto.derecho_habiencia === "PEMEX"
        ).length;
        const SEDENA = pacientes.filter(
          (paciente) => paciente.datos_contacto.derecho_habiencia === "SEDENA"
        ).length;
        const SEDMAR = pacientes.filter(
          (paciente) => paciente.datos_contacto.derecho_habiencia === "SEDMAR"
        ).length;
        const SSA_SESVER = pacientes.filter(
          (paciente) =>
            paciente.datos_contacto.derecho_habiencia === "SSA/SESVER"
        ).length;

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
        text: "Derechohabiencia",
        subtext: "2024",
        left: "center",
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: cantidadIMSS, name: "IMSS" },
            { value: cantidadISSSTE, name: "ISSSTE" },
            { value: cantidadPEMEX, name: "PEMEX" },
            { value: cantidadSEDENA, name: "SEDENA" },
            { value: cantidadSEDMAR, name: "SEDMAR" },
            { value: cantidadSSA_SESVER, name: "SSA/SESVER" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // Inicializar el tercer gráfico
    const chart3 = echarts.init(chartRefs.current[2]);
    chart3.setOption(data3);

    // Limpia el tercer gráfico al desmontar el componente
    return () => {
      chart3.dispose();
    };
  }, [
    cantidadIMSS,
    cantidadISSSTE,
    cantidadPEMEX,
    cantidadSEDENA,
    cantidadSEDMAR,
    cantidadSSA_SESVER,
  ]);

  return (
    <div>
      <div className="container-fluid pb-4">
        <div className="row g-3">
          <div className="offset-md-1 col-md-6">
            <p className="h1">Total de pacientes: {totalPacientes}</p>
          </div>
          <div className="offset-md-1 col-md-3">
            <button onClick={generatePDF} className=" btn btn-secondary">
              Generar{" "}
              <i
                className="fa-solid fa-file-pdf"
                style={{ fontSize: "30px", color: "red" }}
              ></i>{" "}
            </button>
            {pdfDataURL}
          </div>

          <div className="offset-md-2 col-md-10">
            <div
              style={{ height: "700px" }}
              ref={(el) => (chartRefs.current[0] = el)}
            ></div>
          </div>

          <hr />

          <div className="offset-md-1 col-md-3 mt-2">
            <p className="h1">Enfermedades crónicas</p>
          </div>

          <div
            style={{ height: "500px" }}
            ref={(el) => (chartRefs.current[1] = el)}
          ></div>

          <hr />

          <div className="offset-md-1 col-md-4 mt-2">
            <p className="h1">Derechohabiencia</p>
          </div>
          <div className="offset-md-2 col-md-10">
            <div
              style={{ height: "700px" }}
              ref={(el) => (chartRefs.current[2] = el)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
