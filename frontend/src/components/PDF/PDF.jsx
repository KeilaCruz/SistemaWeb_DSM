import { Document, Text, Page, StyleSheet, Image, View } from "@react-pdf/renderer";
import reactLogo from "../images/reactLogo.png";
import { LineChart } from "../Reportes/LineChart";
import { PieChart } from "../Reportes/PieChart";
import { PieChart2 } from "../Reportes/PieChart2";

export function PDF() {
  return (
    <Document>
      <Page>
        <Text>Hello world</Text>
        <Image src={reactLogo} />
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          distinctio dignissimos provident, deserunt pariatur facere iure et
          itaque sapiente, eaque sed atque cum aspernatur quo natus! Id
          accusantium laborum, placeat numquam iste amet in soluta sapiente
          facere natus cum fugit officia quo provident nihil. Aliquam hic
          pariatur nemo totam impedit doloribus fugiat eum, deleniti sequi
          explicabo numquam vel asperiores ipsum harum odio ad labore ut.
          Voluptatibus eaque consequatur pariatur nesciunt reprehenderit ipsa
          ratione sit id, nisi incidunt officiis? Inventore assumenda minus
          laudantium reprehenderit accusamus nam quo sed, alias ad consectetur,
          nisi quae libero aspernatur omnis tempore distinctio, ipsam debitis?
          Omnis.
        </Text>
      </Page>
    </Document>
  );
}



