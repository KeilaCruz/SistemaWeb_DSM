import { useState, useRef,useEffect } from 'react';
import * as echarts from 'echarts';
import { PDFDownloadLink, Document, Page, Image, StyleSheet,View, Text } from '@react-pdf/renderer';



export function PieChart() {
  const chartRef = useRef(null);
  const [pdfDataURL, setPdfDataURL] = useState(null);

  const generatePDF = () => {
    const canvas = chartRef.current.getElementsByTagName('canvas')[0];
    const imageBase64 = canvas.toDataURL();

    // Generar el PDF con react-pdf-render
    const MyDocument = () => (
      <Document>
        <Page size="A4">
        <Image src={imageBase64} style={{ width: '100%', height: 'auto' }} />
        </Page>
      </Document>
    );

    // Convertir el documento PDF en un enlace de descarga
    const pdfURL = (
      <PDFDownloadLink document={<MyDocument />} fileName="pie_chart.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
      </PDFDownloadLink>
    );

    // Actualizar el estado con el enlace de descarga del PDF
    setPdfDataURL(pdfURL);
  };

  useEffect(() => {
    // Datos para el gráfico de barras
    const data = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
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
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
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

    // Inicializar el gráfico de barras
    const chart = echarts.init(chartRef.current);

    // Establecer los datos en el gráfico
    chart.setOption(data);

    // Limpia el gráfico al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div className='col-md-6 col-sm-4'>
      <div id="pie-chart" style={{ height: '500px' }} ref={chartRef}></div>
      <button onClick={generatePDF}>Generar PDF</button>
      {pdfDataURL}
    </div>
  )
}



