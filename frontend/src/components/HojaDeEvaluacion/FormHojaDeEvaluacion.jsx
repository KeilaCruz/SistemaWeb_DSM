import { useContext, useState } from "react";
import { searchPaciente } from "../../services/Recepcionista";
import { setToken } from "../../services/HeaderAuthorization";
import { PacienteCard } from "../Paciente/PacienteCard";
import AuthContext from "../../context/AuthProvider";

export function FormHojaDeEvaluacion({onSubmit, register, pacienteSelect}) {
  const { authTokens } = useContext(AuthContext);
  const [criterio, setCriterio] = useState("");
  const [paciente, setPaciente] = useState([]);

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
    pacienteSelect(CURP);
  };

  return (
    <div>
      <div className="container-fluid">
        {/* Titulo */}
        <div className="container">
          <div className="text-with-lines">
            <div className="line line-top"></div>
            <p className="display-5 fw-bold">
              REGISTRO DE HOJA DE EVALUCIÓN CLÍNICA
            </p>
            <div className="line line-bottom"></div>
          </div>
        </div>

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
              <button onClick={handleBuscarPaciente} className="button-buscar">
                Buscar
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
            />
          ))}
        </div>

        <form onSubmit={onSubmit} className="row g-3 mt-5">
          <div className="col-md-11 offset-md-1">
            <h3>Información general</h3>
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
          </div>

          <div className="col-md-11 offset-md-1">
            <h3 className="mt-5">Información médica</h3>
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="tension-arterial" className="form-label">
              Tensión arterial (mmHg):
            </label>
            <input
              type="number"
              placeholder="T/A"
              id="tension-arterial"
              {...register("tension_arterial", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="" className="form-label">
              Frecuencia cardiaca (BPM):
            </label>
            <input
              type="number"
              placeholder="FC"
              {...register("frecuencia_cardiaca", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="frecuencia-respiratoria" className="form-label">
              Frecuencia respiratoria:
            </label>
            <input
              type="number"
              placeholder="FR"
              id="frecuencia-respiratoria"
              {...register("frecuencia_respiratoria", { required: true })}
              className="form-control"
            />
            
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="temperatura" className="form-label">
              Temperatura (°C):
            </label>
            <input
              type="number"
              placeholder="°C"
              id="temperatura"
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="imc" className="form-label">
              IMC:
            </label>
            <input
              type="number"
              placeholder="Indice de masa corporal"
              id="imc"
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="spo2" className="form-label">
              Saturación de oxígeno (SpO2):
            </label>
            <input
              type="number"
              placeholder="SpO2"
              id="spo2"
              className="form-control"
            />
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="glucosa" className="form-label">
              Glucosa (mg/dL):
            </label>
            <input
              type="number"
              placeholder="mg/dL"
              id="glucosa"
              {...register("glucosa", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="peso" className="form-label">
              Peso (Kg):
            </label>
            <input
              type="number"
              placeholder="Peso"
              id="peso"
              {...register("peso", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="talla" className="form-label">
              Talla (cm):
            </label>
            <input
              type="number"
              placeholder="Talla"
              id="talla"
              {...register("talla", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="cintura" className="form-label">
              Cintura (cm):
            </label>
            <input
              type="number"
              placeholder="Cintura"
              id="cintura"
              {...register("cintura", { required: true })}
              className="form-control"
            />
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
          </div>
          <div className="col-md-5 offset-1 mt-4 mb-4">
            <button className="button-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
