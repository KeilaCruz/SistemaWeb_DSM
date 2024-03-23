
import { useForm } from "react-hook-form"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import { editarHojaEvaluacion } from "../../services/DoctorGeneral"
import { setToken } from "../../services/HeaderAuthorization"

export function EditHojaDeEvaluacion({hojaClinica}) {
  const { register, setValue, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [activateEdit, setActiEdit] = useState(false)


    const handleActivateEditar = () => {
      setActiEdit(!activateEdit)
      
  }

  useEffect(() => {
    async function loadInput (){
      try {
            setValue("fecha_revision", hojaClinica?.fecha_revision || '');
            setValue("tension_arterial", hojaClinica.datos_nota_enfermeria?.tension_arterial || '');
            setValue("frecuencia_cardiaca", hojaClinica.datos_nota_enfermeria?.frecuencia_cardiaca || '');
            setValue("frecuencia_respiratoria", hojaClinica.datos_nota_enfermeria?.frecuencia_respiratoria || '');
            setValue("temperatura", hojaClinica.datos_nota_enfermeria?.temperatura || '');
            setValue("imc", hojaClinica.datos_nota_enfermeria?.imc || '');
            setValue("saturacion_oxigeno", hojaClinica.datos_nota_enfermeria?.saturacion_oxigeno || '');
            setValue("glucosa", hojaClinica.datos_nota_enfermeria?.glucosa || '');
            setValue("peso", hojaClinica.datos_nota_enfermeria?.peso || '');
            setValue("talla", hojaClinica.datos_nota_enfermeria?.talla || '');
            setValue("cintura", hojaClinica.datos_nota_enfermeria?.cintura || '');
            setValue("nota_medica", hojaClinica?.nota_medica || '');
      } catch (error) {
          console.error("error al cargar input", error)
      }
    }
    loadInput();

  }, [hojaClinica])

  const onSubmit = handleSubmit(async (data) => {
    const hojaEvaluacion = {
        fecha_revision: data.fecha_revision,
        nota_medica: data.nota_medica,
        "datos_nota_enfermeria": {
            tension_arterial: data.tension_arterial,
            frecuencia_cardiaca: data.frecuencia_cardiaca,
            frecuencia_respiratoria: data. frecuencia_respiratoria,
            temperatura: data.temperatura,
            imc: data.imc,
            saturacion_oxigeno: data.saturacion_oxigeno,
            glucosa: data.glucosa,
            peso: data.peso,
            talla: data.talla,
            cintura: data.cintura,
        },
        idPaciente: hojaClinica.idPaciente,
        
    }
    try {
        await setToken(authTokens.access);
        const response = await editarHojaEvaluacion(hojaClinica.idHojaClinica, hojaEvaluacion);
        console.log(response)
    } catch (error) {
        console.error(error)
    }

})

  return (
    <>
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

       

        

        <form onSubmit={onSubmit} className="row g-3 mt-5">
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
              disabled ={true}
              className="form-control"
            />
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
              placeholder="T/A"
              id="tension-arterial"
              {...register("tension_arterial", { required: true })}
              disabled={!activateEdit}
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
              disabled={!activateEdit}
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
              disabled={!activateEdit}
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
              {...register("temperatura", { required: true })}
              disabled={!activateEdit}
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
              {...register("imc", { required: true })}
              disabled={!activateEdit}
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
              {...register("saturacion_oxigeno", { required: true })}
              disabled={!activateEdit}
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
              disabled={!activateEdit}
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
              disabled={!activateEdit}
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
              disabled={!activateEdit}
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
              disabled={!activateEdit}
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
              disabled={!activateEdit}
              className="form-control"
            ></textarea>
          </div>
          
          {activateEdit && (
                        <div className="col-md-5 offset-1 mt-4 mb-4">
                            <button className="btn btn-success">Guardar</button>
                        </div>
                    )}
        </form>

        {!activateEdit && (
                        <div className="col-md-5 offset-1 mt-4 mb-4">
                            <button className="btn btn-primary"  onClick={handleActivateEditar}>Editar</button>
                        </div>
                    )}
      </div>
    </>
  )
}

