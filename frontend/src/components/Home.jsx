import { CalculadoraCircuferencia } from "./Nutricion/CalculadoraCircuferencia"
import { CalculadoraImc } from "./Nutricion/CalculadoraImc"

export function Home() {
    console.log("Home psicologia")
    return (
        <>
            <h1>Home de la Psicologa</h1>
            <CalculadoraImc />
            <h1>Circuferencia</h1>
            <CalculadoraCircuferencia />
        </>
    )
}

