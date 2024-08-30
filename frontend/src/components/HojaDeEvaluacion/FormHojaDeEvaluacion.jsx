import { useContext, useState } from "react";
import { searchPaciente } from "../../services/Recepcionista";
import { setToken } from "../../services/HeaderAuthorization";
import { PacienteCard } from "../Paciente/PacienteCard";
import AuthContext from "../../context/AuthProvider";
import { CalculadoraCircuferencia } from "../Nutricion/CalculadoraCircuferencia";
import { CalculadoraImc } from "../Nutricion/CalculadoraImc";

export function FormHojaDeEvaluacion({
  onSubmit,
  register,
  pacienteSelect,
  setPacienteSelect,
  errors,
}) {
  const { authTokens } = useContext(AuthContext);
  const [criterio, setCriterio] = useState("");
  const [paciente, setPaciente] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([])
  const [showModalCircuferencia, setShowModalCircuferencia] = useState(false)
  const [showModalIMC, setShowModalIMC] = useState(false)

  const handleBarraBusqueda = (evt) => {
    setCriterio(evt.target.value);
  };

  const handleBuscarPaciente = async () => {
    try {
      await setToken(authTokens.access);
      const data = await searchPaciente(criterio);
      setPaciente(data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectPaciente = (CURP) => {
    setPacienteSelect(CURP)
  }
  const handleFileChange = (evt) => {
    const archivos = evt.target.files;
    const nombreArchivos = Array.from(archivos).map((archivo) => archivo.name)
    setArchivosSeleccionados(nombreArchivos)
  }
  const handleModalCircuferencia = () => {
    setShowModalCircuferencia(true)
  }
  const handleCloseModalCircuferencia = () => {
    setShowModalCircuferencia(false)
  }
  const handleModalIMC = () => {
    setShowModalIMC(true)
  }
  const handleCloseModalIMC = () => {
    setShowModalIMC(false)
  }
  return (
    <div>
      <div className="container-fluid">
        {/* Titulo */}
        <div className="container mt-3 mb-4">
          <div className="text-with-lines">
            <div className="line line-top"></div>
            <p className="display-5 fw-bold">
              REGISTRO DE HOJA DE EVALUCIÓN CLÍNICA
            </p>
            <div className="line line-bottom"></div>
          </div>
        </div>
        {/**Llamada a las calculadoras*/}
        <div className="row offset-md-1">
          <div className="col-md-3 mt-2 mb-2">
            <button type="button" onClick={handleModalCircuferencia} className="btn rounded button-calculadora">Calculadora circuferencia</button>
          </div>
          <div className="col-md-3 mt-2 mb-2">
            <button type="button" onClick={handleModalIMC} className="btn rounded button-calculadora">Calculadora IMC</button>
          </div>
        </div>
        <CalculadoraCircuferencia status={showModalCircuferencia} handleCloseModal={handleCloseModalCircuferencia} />
        <CalculadoraImc status={showModalIMC} handleCloseModal={handleCloseModalIMC} />
        {/**Llamada a las calculadoras*/}
        <div>
          <div className="row">
            <div className="col-md-6 offset-1">
              <input
                className="form-control input-form"
                type="text"
                id="busqueda_paciente"
                placeholder="Buscar por CURP o nombre"
                onChange={handleBarraBusqueda}
              />
            </div>
            <div className="col-md-3 mt-1">
              <button
                onClick={handleBuscarPaciente}
                className="button-buscar"
              >
                <i class="lni lni-search-alt"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9 offset-1">
          <label className="form-label label-section">DATOS PERSONALES</label>
        </div>
        <div className="col-md-9 offset-1">
          {paciente.map((paciente) => (
            <PacienteCard
              paciente={paciente}
              key={paciente.CURP}
              handleSelect={selectPaciente}
              setPacienteSelect={setPacienteSelect}
              isSelected={paciente.CURP === pacienteSelect}
            />
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          /* encType="multipart/form-data" */ className="row g-3 mt-5"
        >
          <div className="col-md-11 offset-md-1">
            <h3>INFORMACIÓN GENERAL</h3>
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="fecha-revision" className="form-label">
              Fecha de revisión:
            </label>
            <input
              type="date"
              placeholder="Fecha de revision"
              id="fecha-revision"
              {...register("fecha_revision", { required: true })}
              className="form-control"
            />
            {errors.fecha_revision?.type === "required" && (
              <p className="errors"> ⚠ Selecione una fecha</p>
            )}
          </div>

          <div className="col-md-11 offset-md-1">
            <h3 className="mt-5">INFORMACIÓN MÉDICA</h3>
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="tension-arterial" className="form-label">
              Tensión arterial (mmHg):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="T/A"
              id="tension-arterial"
              {...register("tension_arterial", {
                required: true,
                valueAsNumber: true,
              })}
              className="form-control"
            />
            {errors.tension_arterial?.type === "required" && (
              <p className="errors"> ⚠ Ingresa la tension arterial</p>
            )}
            {errors.tension_arterial?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3">
            <label htmlFor="frecuencia cardiaca" className="form-label">
              Frecuencia cardiaca (BPM):
            </label>
            <input
              type="number"
              step="0.01"
              id="frecuencia cardiaca"
              placeholder="FC"
              {...register("frecuencia_cardiaca", {
                required: true,
                valueAsNumber: true,
              })}
              className="form-control"
            />

            {errors.frecuencia_cardiaca?.type === "required" && (
              <p className="errors"> ⚠ Ingrese la frecuencia cardiaca</p>
            )}
            {errors.frecuencia_cardiaca?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3">
            <label htmlFor="frecuencia-respiratoria" className="form-label">
              Frecuencia respiratoria:
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="FR"
              id="frecuencia-respiratoria"
              {...register("frecuencia_respiratoria", {
                required: true,
                valueAsNumber: true,
              })}
              className="form-control"
            />

            {errors.frecuencia_respiratoria?.type === "required" && (
              <p className="errors"> ⚠ Ingrese la frecuencia respiratoria</p>
            )}
            {errors.frecuencia_respiratoria?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="temperatura" className="form-label">
              Temperatura (°C):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="°C"
              id="temperatura"
              {...register("temperatura", {
                required: true,
                valueAsNumber: true,
              })}
              className="form-control"
            />
            {errors.temperatura?.type === "required" && (
              <p className="errors"> ⚠ Ingrese la temperatura </p>
            )}
            {errors.temperatura?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3">
            <label htmlFor="imc" className="form-label">
              IMC:
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Indice de masa corporal"
              id="imc"
              {...register("imc", { required: true, valueAsNumber: true })}
              className="form-control"
            />

            {errors.imc?.type === "required" && (
              <p className="errors"> ⚠ Ingrese el IMC </p>
            )}
            {errors.imc?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3">
            <label htmlFor="spo2" className="form-label">
              Saturación de oxígeno (SpO2):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="SpO2"
              id="spo2"
              {...register("saturacion_oxigeno", {
                required: true,
                valueAsNumber: true,
              })}
              className="form-control"
            />

            {errors.saturacion_oxigeno?.type === "required" && (
              <p className="errors"> ⚠ Ingrese la saturación de oxígeno </p>
            )}
            {errors.saturacion_oxigeno?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="glucosa" className="form-label">
              Glucosa (mg/dL):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="mg/dL"
              id="glucosa"
              {...register("glucosa", { required: true, valueAsNumber: true })}
              className="form-control"
            />
            {errors.glucosa?.type === "required" && (
              <p className="errors"> ⚠ Ingrese el nivel de glucosa </p>
            )}
            {errors.glucosa?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3">
            <label htmlFor="peso" className="form-label">
              Peso (Kg):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Peso"
              id="peso"
              {...register("peso", { required: true, valueAsNumber: true })}
              className="form-control"
            />
            {errors.peso?.type === "required" && (
              <p className="errors"> ⚠ Ingrese el peso </p>
            )}
            {errors.peso?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3">
            <label htmlFor="talla" className="form-label">
              Talla (cm):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Talla"
              id="talla"
              {...register("talla", { required: true, valueAsNumber: true })}
              className="form-control"
            />
            {errors.talla?.type === "required" && (
              <p className="errors"> ⚠ Ingrese la talla </p>
            )}
            {errors.talla?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="cintura" className="form-label">
              Cintura (cm):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Cintura"
              id="cintura"
              {...register("cintura", { required: true, valueAsNumber: true })}
              className="form-control"
            />
            {errors.cintura?.type === "required" && (
              <p className="errors"> ⚠ Ingresar cintura </p>
            )}
            {errors.cintura?.type === "valueAsNumber" && (
                  <div className="alert alert-danger" role="alert">
                    ⚠ Formato incorrecto
                  </div>
            )}
          </div>

          <div className="col-md-7"></div>

          <div className="col-md-8 offset-md-1">
            <label htmlFor="nota-medica" className="form-label">
              Nota medica:
            </label>
            <textarea
              placeholder="Nota medica"
              id="nota-medica"
              {...register("nota_medica", { required: true })}
              className="form-control"
            ></textarea>
            {errors.nota_medica?.type === "required" && (
              <p className="errors"> ⚠ Ingresar nota medica </p>
            )}
          </div>

          <div className="col-md-8 offset-md-1">
            <label htmlFor="archivo" className="form-label">
              Archivo:
            </label>
            <input type="file" id="archivo" onChange={handleFileChange} multiple {...register("archivo")} className="form-control" />
            {archivosSeleccionados.map((nombreArchivo, index) => (
              <label key={index}>{nombreArchivo}</label>
            ))}
          </div>
          <div className="col-md-5 offset-1 mt-4 mb-4">
            <button className="button-guardar btn btn-success">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
