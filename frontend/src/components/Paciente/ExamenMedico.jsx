import { useContext, useEffect, useState } from "react"
import { setToken } from "../../services/HeaderAuthorization"
import { useParams } from "react-router-dom"
import { examenMedicoPaciente } from "../../services/Recepcionista"
import AuthContext from "../../context/AuthProvider"

export function ExamenMedico(){
    const [examen, setExamen] = useState([])
    const [paciente, setPaciente] = useState({})
    const [examenPaciente, setExamenPaciente] = useState([])
    const { idPaciente } = useParams()
    const { authTokens } = useContext(AuthContext)

    useEffect(() => {
        async function loadExamen() {
            await setToken(authTokens.access)
            const response = await examenMedicoPaciente(idPaciente)
            const { paciente, hoja } = response;
            //agregar los datos del paciente en el mismo arreglo
            const examenPaciente = hoja.map(item => ({
                ...item,
                paciente: {
                    CURP: paciente.CURP,
                    nombre: paciente.datos_personales.nombre,
                    apePaterno: paciente.datos_personales.apePaterno,
                    apeMaterno: paciente.datos_personales.apeMaterno,
                    edad: paciente.datos_personales.edad,
                }
            }))
            setExamen(hoja);
            setPaciente(paciente)
            setExamenPaciente(examenPaciente)
        }
        loadExamen()
    }, [])

    return (
        <>
        
            {/* Titulo */}
        <div className="container mt-3 mb-4">
        <div className="text-with-lines">
          <div className="line line-top"></div>
          <p className="display-5 fw-bold">REGISTRO DE EXAMEN MÉDICO</p>
          <div className="line line-bottom"></div>
        </div>
      </div>

      {examenPaciente.length === 0 && (
        <div className="d-flex justify-content-center">
            <p>No hay datos disponibles</p>
        </div> 
        )}


      {examenPaciente.map(examen => (

      <div className="container-fluid pb-4">
      <div className="row g-3 mt-5">
        <h3 className=" offset-md-1 col-md-11">DATOS GENERALES</h3>

        <div className="col-md-3 offset-md-1">
          <label htmlFor="fecha-revision" className="form-label">
            Fecha de revisión:
          </label>
          <input 
            id="fecha-revision"
            disabled={true}
            className="form-control"
            value={examen.fecha_revision}
          />
        </div>

        <div className="col-md-3 mx-4 mt-4">
            <label className="form-label label-form" htmlFor="paciente_nombre">Nombre:</label>
            <input className="form-control " id="paciente_nombre" value={`${examen.paciente.nombre} ${examen.paciente.apePaterno} ${examen.paciente.apeMaterno}`} disabled={true} />
        </div>
        <div className="col-md-1 mx-4 mt-4" >
            <label className="form-label label-form" htmlFor="paciente_edad">Edad:</label>
            <input className="form-control " id="paciente_edad" value={examen.paciente.edad} disabled={true} />
        </div>

        

        <h3 className="offset-md-1 col-md-11">
          1. ANTECEDENTES HEREDOFAMILIARES
        </h3>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Madre viva?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="madre-viva"
              name="opcion_madre"
              checked={examen.antecedentes_heredofamiliares.madre_viva === true}/>
            <label class="form-check-label" htmlFor="madre-viva">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="madre-muerta"
              name="opcion_madre"
              checked={examen.antecedentes_heredofamiliares.madre_viva === false}
              
              />
            <label class="form-check-label" htmlFor="madre-muerta">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        
          <div className="col-md-2">
            <label className="form-label" htmlFor="madre-causa">
              ¿Cómo fallecio?
            </label>
            <input disabled={true}
              type="text"
              id="madre-causa"
              placeholder="Causas de muerte"
              value={examen.antecedentes_heredofamiliares.madre_finada}
              className="form-control"

            />
          </div>
        

        <div className="col-md-11"></div>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Padre vivo?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="padre-vivo"
              name="opcion_padre"
              checked={examen.antecedentes_heredofamiliares.padre_vivo === true} />
            <label class="form-check-label" htmlFor="padre-vivo">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="padre-muerto"
              name="opcion_padre"
              checked={examen.antecedentes_heredofamiliares.padre_vivo === false}            />
            <label class="form-check-label" htmlFor="padre-muerto">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        
          <div className="col-md-2">
            <label className="form-label" htmlFor="padre-causa">
              ¿Cómo fallecio?
            </label>
            <input disabled={true}
              type="text"
              placeholder="Causas de muerte"
              id="padre-causa"
              value={examen.antecedentes_heredofamiliares.padre_finado}
              className="form-control"
            />
          </div>
        

        <div className="col-md-11"></div>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Hermanos vivos?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="hermano-vivo"
              name="opcion_hermano"
              checked={examen.antecedentes_heredofamiliares.hermano_vivo === true}              />
            <label class="form-check-label" htmlFor="hermano-vivo">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="hermano-muerto"
              name="opcion_hermano"
              checked={examen.antecedentes_heredofamiliares.hermano_vivo === false}            />
            <label class="form-check-label" htmlFor="hermano-muerto">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        
          <div className="col-md-2">
            <label className="form-label" htmlFor="hermano-causa">
              ¿Cómo fallecio?
            </label>
            <input disabled={true}
              type="text"
              placeholder="Causas de muerte"
              id="hermano-causa"
              value={examen.antecedentes_heredofamiliares.hermano_finado}
              className="form-control"
            />
          </div>
        

        <div className="col-md-11"></div>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Hijos vivos?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="hijos-vivos"
              name="opcion_hijos"
              checked={examen.antecedentes_heredofamiliares.hijos_vivos === true}             />
            <label class="form-check-label" htmlFor="hijos-vivos">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="hijos-muertos"
              name="opcion_hijos"
              checked={examen.antecedentes_heredofamiliares.hijos_vivos === false}               />
            <label class="form-check-label" htmlFor="hijos-muertos">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        
          <div className="col-md-2">
            <label className="form-label" htmlFor="hijo-causa">
              ¿Cómo fallecio?
            </label>
            <input 
              type="text"
              placeholder="Causas de muerte"
              id="hijo-causa"
              value={examen.antecedentes_heredofamiliares.hijos_finados}
              disabled={true}
              className="form-control"
            />
          </div>

        <div className="col-md-11"></div>

        <h3 className="offset-md-1 col-md-11">1.1 OTRAS ENFERMEDADES</h3>

        <div className="col-md-2 offset-md-1">
          <label htmlFor="agudeza-visual" className="form-label">
            Agudeza visual:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Agudeza visual"
            id="agudeza-visual"
            value={examen.datos_enfermedades.agudeza_visual}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="hipertension" className="form-label">
            Hipertensión:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Hipertension"
            id="hipertension"
            value={examen.datos_enfermedades.hiper_tension}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="diabetes" className="form-label">
            Diabetes mellitus:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Diabetes"
            id="diabetes"
            value={examen.datos_enfermedades.diabetes_mellitus}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="Obesidad" className="form-label">
            Obesidad
          </label>
          <input disabled={true}
            type="text"
            placeholder="Obesidad"
            id="obesidad"
            value={examen.datos_enfermedades.obesidad}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="asma" className="form-label">
            Asma:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Asma"
            id="asma"
            value={examen.datos_enfermedades.asma}
            className="form-control"
          />
        </div>

        <div className="col-md-2 offset-md-1">
          <label htmlFor="epilepsia" className="form-label">
            Epilépsia:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Epilépsia"
            id="epilepsia"
            value={examen.datos_enfermedades.epilepsia}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="lupus" className="form-label">
            Lupus:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Lupus"
            id="lupus"
            value={examen.datos_enfermedades.lupus}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="nefropatias" className="form-label">
            Nefropatias:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Nefropatias"
            id="nefropatias"
            value={examen.datos_enfermedades.nefropatias}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="artropatia" className="form-label">
            Artropatias:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Artropatias"
            id="artropatia"
            value={examen.datos_enfermedades.artropatias}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="otras-enfermedades" className="form-label">
            Otras enfermedades:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Otras enfermedades"
            id="otras-enfermedades"
            value={examen.datos_enfermedades.otras_enfermedades}
            className="form-control"
          />
        </div>

        <div className="col-md-2 offset-md-1">
          <label htmlFor="observaciones" className="form-label">
            Observaciones:
          </label>
          <textarea disabled={true}
            placeholder="Observaciones"
            id="observaciones"
            value={examen.datos_enfermedades.observaciones_enfermedades}
            className="form-control"
          ></textarea>
        </div>

        <h3 className=" offset-md-1 col-md-11">
          2. ANTECEDENTES PERSONALES NO PATOLÓGICOS
        </h3>

        <div className="col-md-2 offset-md-1">
          <label htmlFor="nacimiento" className="form-label">
            Lugar de nacimiento:
          </label>
          <input disabled={true}
            type="text"
            id="nacimiento"
            placeholder="Lugar de nacimiento"
            value={examen.antecedentes_no_patologicos.lugar_nacimiento}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="fecha-nacimiento" className="form-label">
            Fecha de nacimiento:
          </label>
          <input disabled={true}
            type="date"
            placeholder="Fecha de nacimiento"
            id="fecha-nacimiento"
            value={examen.antecedentes_no_patologicos.fecha_nacimiento}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="escolaridad" className="form-label">
            Escolaridad:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Escolaridad"
            id="escolaridad"
            value={examen.antecedentes_no_patologicos.escolaridad}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="trabajo-actual" className="form-label">
            Trabajo actual:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Trabajo actual"
            id="trabajo-actual"
            value={examen.antecedentes_no_patologicos.trabajo_actual}
            className="form-control"
          />
        </div>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Practicas ejercicio?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="ejercicio-si"
              name="opcion_ejercicio"
              checked={examen.antecedentes_no_patologicos.practica_ejercicio === true}/>
            <label class="form-check-label" htmlFor="ejercicio-si">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="ejercicio-no"
              name="opcion_ejercicio"
              checked={examen.antecedentes_no_patologicos.practica_ejercicio === false}               />
            <label class="form-check-label" htmlFor="ejercicio-no">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        

        
          <div className="col-md-2">
            <label className="form-label" htmlFor="cual-ejercicio">
              ¿Cual ejercicio?
            </label>
            <input disabled={true}
              type="text"
              id="cual-ejercicio"
              placeholder="¿Cual ejercicio?"
              value={examen.antecedentes_no_patologicos.ejercicio_cual}
              className="form-control"
            />
          </div>
        

        <div className="col-md-11"></div>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Practica tabaquismo?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="tabaquismo-si"
              name="opcion_tabaco"
              checked={examen.antecedentes_no_patologicos.tabaquismo === true}    />
            <label class="form-check-label" htmlFor="tabaquismo-si">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="tabaquismo-no"
              name="opcion_tabaco"
              checked={examen.antecedentes_no_patologicos.tabaquismo === false}/>
            <label class="form-check-label" htmlFor="tabaquismo-no">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        
          <div className="col-md-2">
            <label className="form-label" htmlFor="tabaco-edad">
              ¿Desde cuando? (Edad aprox)
            </label>
            <input disabled={true}
              type="number"
              placeholder="¿Desde cuando? (Edad aprox)"
              id="tabaco-edad"
              value={examen.antecedentes_no_patologicos.tabaquismo_edad}
              className="form-control"
            />

            <label className="form-label" htmlFor="tabaco-cantidad">
              ¿Cuantos al dia u ocasional?
            </label>
            <input disabled={true}
              type="number"
              id="tabaco-cantidad"
              defaultValue={0}
              placeholder="¿Cuantos al día u ocasional?"
              value={examen.antecedentes_no_patologicos.tabaquismo_cantidad}
              className="form-control"
            />
          </div>
    

        <div className="col-md-11"></div>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Es alcohólico?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="toma-si"
              name="opcion_alcoholismo"
              checked={examen.antecedentes_no_patologicos.alcoholismo === true}             />
            <label class="form-check-label" htmlFor="toma-si">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="toma-no"
              name="opcion_alcoholismo"
              checked={examen.antecedentes_no_patologicos.alcoholismo === false}              />
            <label class="form-check-label" htmlFor="toma-no">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        
          <div className="col-md-2">
            <label className="form-label" htmlFor="alcoholico-edad">
              ¿Desde cuando? (Edad aprox)
            </label>
            <input disabled={true}
              type="number"
              id="alcoholico-edad"
              placeholder="¿Desde cuando? (Edad aprox)"
              value={examen.antecedentes_no_patologicos.alcoholismo_edad}
              className="form-control"
            />
          </div>
        

        <div className="col-md-11"></div>

        <div className="col-md-3 offset-md-1">
          <label class="form-label" htmlFor="inmunizaciones">
            {" "}
            Inmunizaciones:{" "}
          </label>
          <input disabled={true}
            type="text"
            placeholder="Inmunizaciones"
            id="inmunizaciones"
            value={examen.antecedentes_no_patologicos.inmunizaciones}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label class="form-label" htmlFor="habitos-higienicos">
            Hábitos higiénicos:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Habitos higienicos"
            id="habitos-higienicos"
            value={examen.antecedentes_no_patologicos.habitos_higienicos}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label class="form-label" htmlFor="alimenticios">
            Hábitos alimenticios:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Habitos alimenticios"
            id="alimenticios"
            value={examen.antecedentes_no_patologicos.habitos_alimenticios}
            className="form-control"
          />
        </div>

        <div className="col-md-4 offset-md-1">
          <label class="form-label" htmlFor="habitos">
            Especifique hábitos:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Especifique habitos"
            id="habitos"
            value={examen.antecedentes_no_patologicos.especifique_habitos}
            className="form-control"
          />
        </div>

        <h3 className="offset-md-1 col-md-11">
          3. ANTECEDENTES GINECO OBSTÉTRICOS
        </h3>

        <div className="col-md-2 offset-md-1">
          <label class="form-label" htmlFor="edad-menarca">
            Edad de la menarca:
          </label>
          <input disabled={true}
            type="number"
            id="edad-menarca"
            placeholder="Edad menarca"
            value={examen.antecedentes_gineco_obstreticos.edad_menarca}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label class="form-label" htmlFor="duracion">
            Frecuencia y duración:
          </label>
          <input disabled={true}
            type="number"
            id="duración"
            placeholder="Frecuencia y duracion"
            value={examen.antecedentes_gineco_obstreticos.frecuencia_duracion}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label class="form-label" htmlFor="ultima-menstruacion">
            Última menstruación:
          </label>
          <input disabled={true}
            type="text"
            id="ultima-menstruacion"
            placeholder="Ultima menstruacion"
            value={examen.antecedentes_gineco_obstreticos.ultima_menstruacion}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label class="form-label" htmlFor="num-embarazos">
            Número de embarazos:
          </label>
          <input disabled={true}
            type="number"
            id="num-embarazos"
            placeholder="Numero de embarazos"
            value={examen.antecedentes_gineco_obstreticos.num_embarazos}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label class="form-label" htmlFor="num-partos">
            Número de partos:
          </label>
          <input disabled={true}
            type="number"
            id="num-partos"
            placeholder="Numero de partos"
            value={examen.antecedentes_gineco_obstreticos.num_partos}
            className="form-control"
          />
        </div>

        <div className="col-md-2 offset-md-1">
          <label class="form-label" htmlFor="num-cesareas">
            Número de cesareas:
          </label>
          <input disabled={true}
            type="number"
            id="num-cesareas"
            placeholder="Numero de cesareas"
            value={examen.antecedentes_gineco_obstreticos.num_cesareas}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label class="form-label" htmlFor="num-abortos">
            Número de abortos:
          </label>
          <input disabled={true}
            type="number"
            id="num-abortos"
            placeholder="Numero de abortos"
            value={examen.antecedentes_gineco_obstreticos.num_abortos}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label class="form-label" htmlFor="ultimo-parto">
            Último parto:
          </label>
          <input disabled={true}
            type="text"
            id="ultimo-parto"
            placeholder="Ultimo parto"
            value={examen.antecedentes_gineco_obstreticos.ultimo_parto}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label class="form-label" htmlFor="ultimo-aborto">
            Último aborto:
          </label>
          <input disabled={true}
            type="text"
            id="ultimo-aborto"
            placeholder="Ultimo aborto"
            value={examen.antecedentes_gineco_obstreticos.ultimo_aborto}
            className="form-control"
          />
        </div>

        <div class="col-md-1 offset-md-1 fw-bold">
          <label class="form-label">¿Planificación familiar?</label>
        </div>

        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="plan-si"
              name="opcion_planificacion"
              checked={examen.antecedentes_gineco_obstreticos.planificacion_familiar === true}         />
            <label class="form-check-label" htmlFor="plan-si">
              {" "}
              Si{" "}
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-check">
            <input disabled={true}
              class="form-check-input"
              type="radio"
              id="plan-no"
              name="opcion_planificacion"
              checked={examen.antecedentes_gineco_obstreticos.planificacion_familiar === false}              />
            <label class="form-check-label" htmlFor="plan-no">
              {" "}
              No{" "}
            </label>
          </div>
        </div>

        
          <div className="col-md-4">
            <label htmlFor="metodo-familiar" className="form-label">
              Especifique:
            </label>
            <input disabled={true}
              type="text"
              id="metodo-familiar"
              placeholder="Método"
              value={examen.antecedentes_gineco_obstreticos.metodo_planificacion}
              className="form-control"
            />
          </div>
    

        <div className="col-md-11"></div>

        <h3 className="offset-md-1  col-md-11">
          3.1 ANTECEDENTES PERSONALES PATOLÓGICOS
        </h3>

        <div className="col-md-2 offset-md-1">
          <label class="form-label" htmlFor="traumaticos">
            Traumáticos:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Luxación y Fracturas"
            id="traumaticos"
            value={examen.antecedentes_personales_patologicos.traumatismos}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label class="form-label" htmlFor="quirurgicos">
            Quirúrgicos:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Quirurgicos"
            id="quirurgicos"
            value={examen.antecedentes_personales_patologicos.quirurgicos}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Transfusiones:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Transfusiones"
            value={examen.antecedentes_personales_patologicos.transfusiones}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Grupo sanguíneo:</label>
          <input disabled={true}
            type="text"
            placeholder="Grupo sanguineo"
            value={examen.antecedentes_personales_patologicos.grupo_sanguineo}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Factor RH:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Factor RH"
            value={examen.antecedentes_personales_patologicos.factor_rh}
            className="form-control"
          />
        </div>

        <div className="col-md-2 offset-md-1">
          <label htmlFor="" className="form-label">
            Alergias:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Alergias"
            value={examen.antecedentes_personales_patologicos.alergias}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Infecciones:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Infecciones"
            value={examen.antecedentes_personales_patologicos.infecciones}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Dengue paludismo:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Dengue Paludismo"
            value={examen.antecedentes_personales_patologicos.dengue_paludismo}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Tatuajes:
          </label>
          <input disabled={true}
            type="text"
            placeholder="Tatuajes"
            value={examen.antecedentes_personales_patologicos.tatuajes}
            className="form-control"
          />
        </div>

        <h3 className="offset-md-1 col-md-11">4. EXPLORACIÓN FÍSICA</h3>

        <div className="col-md-2 offset-md-1">
          <label htmlFor="" className="form-label">
            Tensión arterial (mmHg):
          </label>
          <input disabled={true}
            type="number"
            placeholder="Tension arterial mmHg"
            value={examen.datos_exploracion_fisica.tension_arterial}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Frecuencia cardiaca:
          </label>
          <input disabled={true}
            type="number"
            placeholder="FC"
            value={examen.datos_exploracion_fisica.frecuencia_cardiaca}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Frecuencia respiratoria:
          </label>
          <input disabled={true}
            type="number"
            placeholder="FR"
            value={examen.datos_exploracion_fisica.frecuencia_respiratoria}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Oxigenación (%):
          </label>
          <input disabled={true}
            type="number"
            placeholder="Oxigenación %"
            value={examen.datos_exploracion_fisica.oxigenacion}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Temperatura (°C):
          </label>
          <input disabled={true}
            type="number"
            placeholder="Temperatura °C"
            value={examen.datos_exploracion_fisica.temperatura}
            className="form-control"
          />
        </div>

        <h3 className="offset-md-1 col-md-11">5. ANTROPOMETRÍA</h3>

        <div className="col-md-2 offset-md-1">
          <label htmlFor="" className="form-label">
            Peso actual (Kg):
          </label>
          <input disabled={true}
            type="number"
            placeholder="peso actual en Kg"
            value={examen.datos_antropometria.peso_actual}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Talla (cm):</label>
          <input disabled={true}
            type="text"
            placeholder="Talla"
            value={examen.datos_antropometria.talla}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">IMC (Kg/m^2):</label>
          <input disabled={true}
            type="number"
            placeholder="IMC"
            value={examen.datos_antropometria.imc}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Circunferencia abdominal (cm):</label>
          <input disabled={true}
            type="number"
            placeholder="Circunferencia del abdomen"
            value={examen.datos_antropometria.circunferencia_abd}
            className="form-control"
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">
            Circunferencia de caderas (cm):
          </label>
          <input disabled={true}
            type="number"
            placeholder="Circunferencia cadera"
            value={examen.datos_antropometria.circunferencia_cadera}
            className="form-control"
          />
        </div>

        <div className="col-md-2 offset-md-1">
          <label className="form-label">Observaciones:</label>
          <textarea disabled={true}
            placeholder="Observaciones"
            value={examen.datos_antropometria.observaciones_antropometria}
            className="form-control"
          ></textarea>
        </div>

        <h3 className="offset-md-1 col-md-11">6. EXÁMEN FÍSICO</h3>

        <div className="col-md-3 offset-md-1">
          <label className="form-label">Cabeza:</label>
          <input disabled={true}
            type="text"
            placeholder="Cabeza"
            value={examen.datos_examen_medico.EF_cabeza}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Cuello:</label>
          <input disabled={true}
            type="text"
            placeholder="Cuello"
            value={examen.datos_examen_medico.EF_cuello}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Tórax:</label>
          <input disabled={true}
            type="text"
            placeholder="Torax"
            value={examen.datos_examen_medico.EF_torax}
            className="form-control"
          />
        </div>

        <div className="col-md-3 offset-md-1">
          <label className="form-label">Abdomen:</label>
          <input disabled={true}
            type="text"
            placeholder="Abdomen"
            value={examen.datos_examen_medico.EF_abdomen}
            className="form-control"
          />
        </div>

        <h4 className="offset-md-1 col-md-11">Extremidades</h4>

        <div className="col-md-3 offset-md-1">
          <label className="form-label">Superior:</label>
          <input disabled={true}
            type="text"
            placeholder="Superiores"
            value={examen.datos_examen_medico.EF_EXT_sup}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Inferior:</label>
          <input disabled={true}
            type="text"
            placeholder="Inferiores"
            value={examen.datos_examen_medico.EF_EXT_inf}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Rodillas:</label>
          <input disabled={true}
            type="text"
            placeholder="Rodillas"
            value={examen.datos_examen_medico.EF_EXT_rodillas}
            className="form-control"
          />
        </div>

        <div className="col-md-3 offset-md-1">
          <label className="form-label">Pelvis:</label>
          <input disabled={true}
            type="text"
            placeholder="Pelvis"
            value={examen.datos_examen_medico.EF_EXT_pelvis}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Pies:</label>
          <input disabled={true}
            type="text"
            placeholder="Pies"
            value={examen.datos_examen_medico.EF_EXT_pies}
            className="form-control"
          />
        </div>

        <h3 className="offset-md-1 col-md-11">7. EXÁMENES DE LABORATORIO</h3>

        <div className="col-md-3 offset-md-1">
          <label className="form-label">Biometría hemática:</label>
          <input disabled={true}
            type="text"
            placeholder="Biometria hematica"
            value={examen.datos_examenes_laboratorio.biometria_hematica}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Química sanguínea:</label>
          <input disabled={true}
            type="text"
            placeholder="Quimica sanguinea"
            value={examen.datos_examenes_laboratorio.quimica_sanguinea}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">VDRL:</label>
          <input disabled={true}
            type="text"
            placeholder="VDRL"
            value={examen.datos_examenes_laboratorio.vdrl}
            className="form-control"
          />
        </div>

        <div className="col-md-3 offset-md-1">
          <label className="form-label">Prueba rápida de VIH:</label>
          <input disabled={true}
            type="text"
            placeholder="Prueba VIH"
            value={examen.datos_examenes_laboratorio.prueba_vih}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Antidoping:</label>
          <input disabled={true}
            type="text"
            placeholder="Antidoping"
            value={examen.datos_examenes_laboratorio.antidoping}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Exámen general de orina:</label>
          <input disabled={true}
            type="text"
            placeholder="Examen de orina"
            value={examen.datos_examenes_laboratorio.examen_orina}
            className="form-control"
          />
        </div>

        <div className="col-md-10 offset-md-1">
          <label className="form-label">Diagnostico:</label>
          <textarea disabled={true}
            placeholder="Diagnostico"
            value={examen.datos_examenes_laboratorio.diagnostico}
            className="form-control"
          ></textarea>
        </div>

      </div>
      </div>
        ))}
        </>
    )

}