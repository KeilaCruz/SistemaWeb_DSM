import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { setToken } from "../../services/HeaderAuthorization"
import AuthContext from "../../context/AuthProvider"
import { calcularIMC } from "../../services/Nutriologo"


export function CalculadoraImc() {
    const { authTokens } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const [data, setData] = useState([])
    const handleCalcularImc = handleSubmit(async (data) => {
        await setToken(authTokens.access)
        const response = await calcularIMC(data.peso, data.altura);
        console.log(response)
        setData(response)
    })
    return (
        <>
            <div className="container-fluid">
                <form onSubmit={handleCalcularImc} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Peso </label>
                        <input className="form-control" id="peso_paciente" type="number" step="any" {...register("peso")} placeholder="kg" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Altura </label>
                        <input className="form-control" id="altura_paciente" type="number" step="any" {...register("altura")} placeholder="cm" />
                    </div>
                    <div className="col-md-4">
                        <button>Calcular</button>
                    </div>
                </form>
                <div className="offset-md-2">
                    <input className="range-imc" type="range" min={1} max={6} value={6} />
                </div>
                <div className="row">
                    <div className="col-md-1 label-imc-uno"><label>Bajo peso</label></div>
                    <div className="col-md-1 label-imc-dos"><label>Normopeso</label></div>
                    <div className="col-md-1 label-imc-tres"><label>Sobrepeso</label></div>
                    <div className="col-md-1 label-imc-cuatro"><label>Obesidad I</label></div>
                    <div className="col-md-1 label-imc-cinco"><label>Obesidad II</label></div>
                    <div className="col-md-1 label-imc-seis"><label>Obesidad III</label></div>
                </div>
            </div>

        </>
    )
}

