import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';


Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);






var beneficios = [0,5,23,78,12,24,17,65,-31,21,43,65];
var meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre","Diciembre"]


var myData = {
    labels: meses,
    datasets: [ //Cada una de las lineas del grafo
        {
            label: "Beneficios",
            data: beneficios,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255,99,132)',
            backgroundColor:'rgba(255,99,132,0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255,99,132)',
            pointBackgroundColor: 'rgba(255,99,132)' ,
        },
    ],
};

  var myOptions = {

  };

  

export function LinesChart() {
  return <Line data={myData} options={myOptions}/>
}




