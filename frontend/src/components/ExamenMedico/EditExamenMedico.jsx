import { useForm } from "react-hook-form"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import { editarExamenMedico } from "../../services/DoctorGeneral"
import { setToken } from "../../services/HeaderAuthorization"
import { getAllUsuarios } from "../../services/Recepcionista"

export function EditExamenMedico({examenMedico}) {
    const { register, setValue, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [activateEdit, setActiEdit] = useState(false)
    const [usuarios, setUsuarios] = useState([]);



    const [madreViva, setMadreViva] = useState(false);
    const [padreVivo, setPadreVivo] = useState(false);
    const [hermanoVivo, setHermanoVivo] = useState(false);
    const [hijosVivos, setHijosVivos] = useState(false);
    const [ejercicio, setEjercicio] = useState(false);
    const [tabaquismo, setTabaquismo] = useState(false);
    const [alcoholismo, setAlcoholismo] = useState(false);
    const [planificacion, setPlanificacion] = useState(false);

    const handleActivateEditar = () => {
        setActiEdit(!activateEdit)
    }

    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            await setToken(authTokens.access);
            const usuariosData = await getAllUsuarios();
            setUsuarios(usuariosData);
          } catch (error) {
            console.error("Error al obtener usuarios:", error);
          }
        };
    
        fetchUsuarios();
      }, []);

    const handleMadreChange = (evt) => {
        const valor = evt.target.value === "true";
        setMadreViva(valor);
        setValue("opcion_madre", valor);
    }

    const handlePadreChange = (evt) => {
        const valor = evt.target.value === "true";
        setPadreVivo(valor);
        setValue("opcion_padre", valor);
    }

    const handleHermanoChange = (evt) => {
        const valor = evt.target.value === "true";
        setHermanoVivo(valor);
        setValue("opcion_hermano", valor);
    }

    const handleHijosChange = (evt) => {
        const valor = evt.target.value === "true";
        setHijosVivos(valor);
        setValue("opcion_hijos", valor);
    }

    const handleEjercicioChange = (evt) => {
        const valor = evt.target.value === "true";
        setEjercicio(valor);
        setValue("opcion_ejercicio", valor);
    }

    const handleTabaquismoChange = (evt) => {
        const valor = evt.target.value === "true";
        setTabaquismo(valor);
        setValue("opcion_tabaco", valor);
    }
    
    const handleAlcoholismoChange = (evt) => {
        const valor = evt.target.value === "true";
        setAlcoholismo(valor);
        setValue("opcion_alcoholismo", valor);
    }

    const handlePlanificacionChange = (evt) => {
        const valor = evt.target.value === "true";
        setPlanificacion(valor);
        setValue("opcion_planificacion", valor);
    }

    

    useEffect(() =>{
        async function loadInput() {
            try {
                setValue("fecha_revision", examenMedico.fecha_revision);
                setValue("idUsuario", examenMedico.idUsuario);
                setMadreViva(examenMedico.antecedentes_heredofamiliares?.madre_viva || false);
                setValue("madre_finada", examenMedico.antecedentes_heredofamiliares?.madre_finada || '' );
                setPadreVivo( examenMedico.antecedentes_heredofamiliares?.padre_vivo || false);
                setValue("padre_finado", examenMedico.antecedentes_heredofamiliares?.padre_finado || '');
                setHermanoVivo(examenMedico.antecedentes_heredofamiliares?.hermano_vivo || false);
                setValue("hermano_finado", examenMedico.antecedentes_heredofamiliares?.hermano_finado || '');
                setHijosVivos(examenMedico.antecedentes_heredofamiliares?.hijos_vivos || false);
                setValue("hijos_finados", examenMedico.antecedentes_heredofamiliares?.hijos_finados || '');
                setValue("agudeza_visual", examenMedico.datos_enfermedades?.agudeza_visual || '');
                setValue("hiper_tension", examenMedico.datos_enfermedades?.hiper_tension || '');
                setValue("diabetes_mellitus", examenMedico.datos_enfermedades?.diabetes_mellitus || '');
                setValue("obesidad", examenMedico.datos_enfermedades?.obesidad || '');
                setValue("asma", examenMedico.datos_enfermedades?.asma || '');
                setValue("epilepsia", examenMedico.datos_enfermedades?.epilepsia || '');
                setValue("lupus", examenMedico.datos_enfermedades?.lupus || '');
                setValue("nefropatias", examenMedico.datos_enfermedades?.nefropatias || '');
                setValue("artropatia", examenMedico.datos_enfermedades?.artropatia || '');
                setValue("otras_enfermedades", examenMedico.datos_enfermedades?.otras_enfermedades || '');
                setValue("observaciones_enfermedades", examenMedico.datos_enfermedades?.observaciones_enfermedades || '');

                setValue("lugar_nacimiento", examenMedico.antecedentes_no_patologicos?.lugar_nacimiento || '');
                setValue("fecha_nacimiento", examenMedico.antecedentes_no_patologicos?.fecha_nacimiento || '');
                setValue("escolaridad", examenMedico.antecedentes_no_patologicos?.escolaridad || '');
                setValue("trabajo_actual", examenMedico.antecedentes_no_patologicos?.trabajo_actual || '');
                setEjercicio(examenMedico.antecedentes_no_patologicos?.practica_ejercicio || false);
                setValue("ejercicio_cual", examenMedico.antecedentes_no_patologicos?.ejercicio_cual || '');
                setTabaquismo(examenMedico.antecedentes_no_patologicos?.tabaquismo || '');
                setValue("tabaquismo_edad", examenMedico.antecedentes_no_patologicos?.tabaquismo_edad || '');
                setValue("tabaquismo_cantidad", examenMedico.antecedentes_no_patologicos?.tabaquismo_cantidad || '');
                setAlcoholismo(examenMedico.antecedentes_no_patologicos?.alcoholismo || false);
                setValue("alcoholismo_edad", examenMedico.antecedentes_no_patologicos?.alcoholismo_edad || '');
                setValue("inmunizaciones", examenMedico.antecedentes_no_patologicos?.inmunizaciones || '');
                setValue("habitos_higienicos", examenMedico.antecedentes_no_patologicos?.habitos_higienicos || '');
                setValue("habitos_alimenticios", examenMedico.antecedentes_no_patologicos?.habitos_alimenticios || '');
                setValue("especifique_habitos", examenMedico.antecedentes_no_patologicos?.especifique_habitos || '');

                setValue("edad_menarca", examenMedico.antecedentes_gineco_obstreticos?.edad_menarca || '');
                setValue("frecuencia_duracion", examenMedico.antecedentes_gineco_obstreticos?.frecuencia_duracion || '');
                setValue("ultima_menstruacion", examenMedico.antecedentes_gineco_obstreticos?.ultima_menstruacion || '');
                setValue("num_embarazos", examenMedico.antecedentes_gineco_obstreticos?.num_embarazos || '');
                setValue("num_partos", examenMedico.antecedentes_gineco_obstreticos?.num_partos || '');
                setValue("num_cesareas", examenMedico.antecedentes_gineco_obstreticos?.num_cesareas || '');
                setValue("num_abortos", examenMedico.antecedentes_gineco_obstreticos?.num_abortos || '');
                setValue("ultimo_parto", examenMedico.antecedentes_gineco_obstreticos?.ultimo_parto || '');
                setValue("ultimo_aborto", examenMedico.antecedentes_gineco_obstreticos?.ultimo_aborto || '');
                setPlanificacion(examenMedico.antecedentes_gineco_obstreticos?.planificacion_familiar || false);
                setValue("metodo_planificacion", examenMedico.antecedentes_gineco_obstreticos?.metodo_planificacion || '');

                setValue("traumatismos", examenMedico.antecedentes_personales_patologicos?.traumatismos || '');
                setValue("quirurgicos", examenMedico.antecedentes_personales_patologicos?.quirurgicos || '');
                setValue("transfusiones", examenMedico.antecedentes_personales_patologicos?.transfusiones || '');
                setValue("grupo_sanguineo", examenMedico.antecedentes_personales_patologicos?.grupo_sanguineo || '');
                setValue("factor_rh", examenMedico.antecedentes_personales_patologicos?.factor_rh || '');
                setValue("alergias", examenMedico.antecedentes_personales_patologicos?.alergias || '');
                setValue("infecciones", examenMedico.antecedentes_personales_patologicos?.infecciones || '');
                setValue("dengue_paludismo", examenMedico.antecedentes_personales_patologicos?.dengue_paludismo || '');
                setValue("tatuajes", examenMedico.antecedentes_personales_patologicos?.tatuajes || '');

                setValue("tension_arterial", examenMedico.datos_exploracion_fisica?.tension_arterial || '');
                setValue("frecuencia_cardiaca", examenMedico.datos_exploracion_fisica?.frecuencia_cardiaca || '');
                setValue("frecuencia_respiratoria", examenMedico.datos_exploracion_fisica?.frecuencia_respiratoria || '');
                setValue("oxigenacion", examenMedico.datos_exploracion_fisica?.oxigenacion || '');
                setValue("temperatura", examenMedico.datos_exploracion_fisica?.temperatura || '');

                setValue("peso_actual", examenMedico.datos_antropometria?.peso_actual || '');
                setValue("talla", examenMedico.datos_antropometria?.talla || '');
                setValue("imc", examenMedico.datos_antropometria?.imc || '');
                setValue("circunferencia_abd", examenMedico.datos_antropometria?.circunferencia_abd || '');
                setValue("circunferencia_cadera", examenMedico.datos_antropometria?.circunferencia_cadera || '');
                setValue("observaciones_antropometria", examenMedico.datos_antropometria?.observaciones_antropometria || '');

                setValue("EF_cabeza", examenMedico.datos_examen_medico?.EF_cabeza || '');
                setValue("EF_cuello", examenMedico.datos_examen_medico?.EF_cuello || '');
                setValue("EF_torax", examenMedico.datos_examen_medico?.EF_torax || '');
                setValue("EF_abdomen", examenMedico.datos_examen_medico?.EF_abdomen || '');
                setValue("EF_EXT_sup", examenMedico.datos_examen_medico?.EF_EXT_sup || '');
                setValue("EF_EXT_inf", examenMedico.datos_examen_medico?.EF_EXT_inf || '');
                setValue("EF_EXT_rodillas", examenMedico.datos_examen_medico?.EF_EXT_rodillas || '');
                setValue("EF_EXT_pelvis", examenMedico.datos_examen_medico?.EF_EXT_pelvis || '');
                setValue("EF_EXT_pies", examenMedico.datos_examen_medico?.EF_EXT_pies || '');

                setValue("biometria_hematica", examenMedico.datos_examenes_laboratorio?.biometria_hematica || '');
                setValue("quimica_sanguinea", examenMedico.datos_examenes_laboratorio?.quimica_sanguinea || '');
                setValue("vdrl", examenMedico.datos_examenes_laboratorio?.vdrl || '');
                setValue("prueba_vih", examenMedico.datos_examenes_laboratorio?.prueba_vih || '');
                setValue("antidoping", examenMedico.datos_examenes_laboratorio?.antidoping || '');
                setValue("examen_orina", examenMedico.datos_examenes_laboratorio?.examen_orina || '');
                setValue("diagnostico", examenMedico.datos_examenes_laboratorio?.diagnostico || '');

            } catch (error) {
                console.error("error al cargar input", error)
            }
        }
        loadInput();
    }, [examenMedico])


    const onSubmit = handleSubmit(async (data) => {
        
        const examenMedicoData = {
          idUsuario: data.idUsuario,
          idPaciente: examenMedico.idPaciente,
          fecha_revision: data.fecha_revision,
          "antecedentes_heredofamiliares": {
    
            madre_viva: madreViva,
            madre_finada: data.madre_finada,
            padre_vivo: padreVivo,
            padre_finado: data.padre_finado,
            hermano_vivo: hermanoVivo,
            hermano_finado: data.hermano_finado,
            hijos_vivos: hijosVivos,
            hijos_finados: data.hijos_finados,
          },
          "datos_enfermedades": {
            agudeza_visual: data.agudeza_visual,
            hiper_tension: data.hiper_tension,
            diabetes_mellitus: data.diabetes_mellitus,
            obesidad: data.obesidad,
            asma: data.asma,
            epilepsia: data.epilepsia,
            lupus: data.lupus,
            nefropatias: data.nefropatias,
            artropatia: data.artropatia,
            otras_enfermedades: data.otras_enfermedades,
            observaciones_enfermedades: data.observaciones_enfermedades,
          },
          "antecedentes_no_patologicos": {
            lugar_nacimiento: data.lugar_nacimiento,
            fecha_nacimiento: data.fecha_nacimiento,
            escolaridad: data.escolaridad,
            trabajo_actual: data.trabajo_actual,
            practica_ejercicio: ejercicio,
            ejercicio_cual: data.ejercicio_cual,
            tabaquismo: tabaquismo,
            tabaquismo_edad: data.tabaquismo_edad,
            tabaquismo_cantidad: data.tabaquismo_cantidad,
            alcoholismo: alcoholismo,
            alcoholismo_edad: data.alcoholismo_edad,
            inmunizaciones: data.inmunizaciones,
            habitos_higienicos: data.habitos_higienicos,
            habitos_alimenticios: data.habitos_alimenticios,
            especifique_habitos: data.especifique_habitos,
          },
          "antecedentes_gineco_obstreticos": {
            edad_menarca: data.edad_menarca,
            frecuencia_duracion: data.frecuencia_duracion,
            ultima_menstruacion: data.ultima_menstruacion,
            num_embarazos: data.num_embarazos,
            num_partos: data.num_partos,
            num_cesareas: data.num_cesareas,
            num_abortos: data.num_abortos,
            ultimo_parto: data.ultimo_parto,
            ultimo_aborto: data.ultimo_aborto,
            planificacion_familiar: planificacion,
            metodo_planificacion: data.metodo_planificacion,
          },
          "antecedentes_personales_patologicos": {
            traumatismos: data.traumatismos,
            quirurgicos: data.quirurgicos,
            transfusiones: data.transfusiones,
            grupo_sanguineo: data.grupo_sanguineo,
            factor_rh: data.factor_rh,
            alergias: data.alergias,
            infecciones: data.infecciones,
            dengue_paludismo: data.dengue_paludismo,
            tatuajes: data.tatuajes,
          },
          "datos_exploracion_fisica": {
            tension_arterial: data.tension_arterial,
            frecuencia_cardiaca: data.frecuencia_cardiaca,
            frecuencia_respiratoria: data.frecuencia_respiratoria,
            oxigenacion: data.oxigenacion,
            temperatura: data.temperatura,
          },
          "datos_antropometria": {
            peso_actual: data.peso_actual,
            talla: data.talla,
            imc: data.imc,
            circunferencia_abd: data.circunferencia_abd,
            circunferencia_cadera: data.circunferencia_cadera,
            observaciones_antropometria: data.observaciones_antropometria,
          },
          "datos_examen_medico": {
            EF_cabeza:data.EF_cabeza,
            EF_cuello:data.EF_cuello,
            EF_torax:data.EF_torax,
            EF_abdomen:data.EF_abdomen,
            EF_EXT_sup:data.EF_EXT_sup,
            EF_EXT_inf:data.EF_EXT_inf,
            EF_EXT_rodillas:data.EF_EXT_rodillas,
            EF_EXT_pelvis:data.EF_EXT_pelvis,
            EF_EXT_pies:data.EF_EXT_pies,
          },
          "datos_examenes_laboratorio": {
            biometria_hematica:data.biometria_hematica,
            quimica_sanguinea:data.quimica_sanguinea,
            vdrl:data.vdrl,
            prueba_vih:data.prueba_vih,
            antidoping:data.antidoping,
            examen_orina:data.examen_orina,
            diagnostico:data.diagnostico,
          },
        };
    
        try {
          await setToken(authTokens.access);
          const response = await editarExamenMedico(examenMedico.idExamenMedico,examenMedicoData);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      });


  return (
    <div>
         
         
        {/* Titulo */}
        <div className="container mt-3 mb-4">
          <div className="text-with-lines">
            <div className="line line-top"></div>
            <p className="display-5 fw-bold">REGISTRO DE EXAMEN MÉDICO</p>
            <div className="line line-bottom"></div>
          </div>
        </div>

        <div className="container-fluid">
        <form className="row g-3 mt-5" onSubmit={onSubmit}>
          <h3 className=" offset-md-1 col-md-11">DATOS GENERALES</h3>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="fecha-revision" className="form-label">
              Fecha de revisión:
            </label>
            <input 
              type="date"
              placeholder="Fecha de revision"
              id="fecha-revision"
              {...register("fecha_revision", { required: true })}
              disabled={true}
              className="form-control"
            />
          </div>

          <div className="col-md-3 offset-md-1">
            <label htmlFor="idUsuario" className="form-label">
              Selecciona un especialista:
            </label>
            <select
              id="idUsuario"
              {...register("idUsuario", { required: true })}
              disabled={true}
              className="form-select"
            >
              <option value="">Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {`${usuario.first_name} ${usuario.last_name}`}
                </option>
              ))}
            </select>
          </div>

          <h3 className="offset-md-1 col-md-11">
            1. ANTECEDENTES HEREDOFAMILIARES
          </h3>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Madre viva?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="madre-viva"
                name="opcion_madre"
                value={true}
                checked={madreViva} onChange={handleMadreChange}/>
              <label class="form-check-label" htmlFor="madre-viva">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="madre-muerta"
                name="opcion_madre"
                value={false}
                checked={!madreViva} onChange={handleMadreChange}
                />
              <label class="form-check-label" htmlFor="madre-muerta">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          {!madreViva && (
            <div className="col-md-2">
              <label className="form-label" htmlFor="madre-causa">
                ¿Cómo fallecio?
              </label>
              <input disabled={!activateEdit}
                type="text"
                id="madre-causa"
                placeholder="Causas de muerte"
                {...register("madre_finada", { required: false })}
                className="form-control"

              />
            </div>
          )}

          <div className="col-md-11"></div>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Padre vivo?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="padre-vivo"
                name="opcion_padre"
                value={true}
                checked={padreVivo} onChange={handlePadreChange}              />
              <label class="form-check-label" htmlFor="padre-vivo">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="padre-muerto"
                name="opcion_padre"
                value={false}
                checked={!padreVivo} onChange={handlePadreChange}              />
              <label class="form-check-label" htmlFor="padre-muerto">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          {!padreVivo && (
            <div className="col-md-2">
              <label className="form-label" htmlFor="padre-causa">
                ¿Cómo fallecio?
              </label>
              <input disabled={!activateEdit}
                type="text"
                placeholder="Causas de muerte"
                id="padre-causa"
                {...register("padre_finado", { required: false })}
                className="form-control"
              />
            </div>
          )}

          <div className="col-md-11"></div>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Hermanos vivos?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="hermano-vivo"
                name="opcion_hermano"
                value={true}
                checked={hermanoVivo} onChange={handleHermanoChange}              />
              <label class="form-check-label" htmlFor="hermano-vivo">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="hermano-muerto"
                name="opcion_hermano"
                value={false}
                checked={!hermanoVivo} onChange={handleHermanoChange}              />
              <label class="form-check-label" htmlFor="hermano-muerto">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          {!hermanoVivo && (
            <div className="col-md-2">
              <label className="form-label" htmlFor="hermano-causa">
                ¿Cómo fallecio?
              </label>
              <input disabled={!activateEdit}
                type="text"
                placeholder="Causas de muerte"
                id="hermano-causa"
                {...register("hermano_finado", { required: false })}
                className="form-control"
              />
            </div>
          )}

          <div className="col-md-11"></div>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Hijos vivos?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="hijos-vivos"
                name="opcion_hijos"
                value={true}
                checked={hijosVivos} onChange={handleHijosChange}              />
              <label class="form-check-label" htmlFor="hijos-vivos">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="hijos-muertos"
                name="opcion_hijos"
                value={false}
                checked={!hijosVivos} onChange={handleHijosChange}               />
              <label class="form-check-label" htmlFor="hijos-muertos">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          {!hijosVivos && (
            <div className="col-md-2">
              <label className="form-label" htmlFor="hijo-causa">
                ¿Cómo fallecio?
              </label>
              <input 
                type="text"
                placeholder="Causas de muerte"
                id="hijo-causa"
                {...register("hijos_finados", )}
                disabled={!activateEdit}
                className="form-control"
              />
            </div>
          )}

          <div className="col-md-11"></div>

          <h3 className="offset-md-1 col-md-11">1.1 OTRAS ENFERMEDADES</h3>

          <div className="col-md-2 offset-md-1">
            <label htmlFor="agudeza-visual" className="form-label">
              Agudeza visual:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Agudeza visual"
              id="agudeza-visual"
              {...register("agudeza_visual", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="hipertension" className="form-label">
              Hipertensión:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Hipertension"
              id="hipertension"
              {...register("hiper_tension", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="diabetes" className="form-label">
              Diabetes mellitus:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Diabetes"
              id="diabetes"
              {...register("diabetes_mellitus", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="Obesidad" className="form-label">
              Obesidad
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Obesidad"
              id="obesidad"
              {...register("obesidad", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="asma" className="form-label">
              Asma:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Asma"
              id="asma"
              {...register("asma", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2 offset-md-1">
            <label htmlFor="epilepsia" className="form-label">
              Epilépsia:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Epilépsia"
              id="epilepsia"
              {...register("epilepsia", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="lupus" className="form-label">
              Lupus:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Lupus"
              id="lupus"
              {...register("lupus", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="nefropatias" className="form-label">
              Nefropatias:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Nefropatias"
              id="nefropatias"
              {...register("nefropatias", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="artropatia" className="form-label">
              Artropatias:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Artropatias"
              id="artropatia"
              {...register("artropatia", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="otras-enfermedades" className="form-label">
              Otras enfermedades:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Otras enfermedades"
              id="otras-enfermedades"
              {...register("otras_enfermedades", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2 offset-md-1">
            <label htmlFor="observaciones" className="form-label">
              Observaciones:
            </label>
            <textarea disabled={!activateEdit}
              placeholder="Observaciones"
              id="observaciones"
              {...register("observaciones_enfermedades", { required: true })}
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
            <input disabled={!activateEdit}
              type="text"
              id="nacimiento"
              placeholder="Lugar de nacimiento"
              {...register("lugar_nacimiento", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="fecha-nacimiento" className="form-label">
              Fecha de nacimiento:
            </label>
            <input disabled={!activateEdit}
              type="date"
              placeholder="Fecha de nacimiento"
              id="fecha-nacimiento"
              {...register("fecha_nacimiento", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="escolaridad" className="form-label">
              Escolaridad:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Escolaridad"
              id="escolaridad"
              {...register("escolaridad", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="trabajo-actual" className="form-label">
              Trabajo actual:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Trabajo actual"
              id="trabajo-actual"
              {...register("trabajo_actual", { required: true })}
              className="form-control"
            />
          </div>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Practicas ejercicio?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="ejercicio-si"
                name="opcion_ejercicio"
                value={true}
                checked={ejercicio} onChange={handleEjercicioChange}               />
              <label class="form-check-label" htmlFor="ejercicio-si">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="ejercicio-no"
                name="opcion_ejercicio"
                value={false}
                checked={!ejercicio} onChange={handleEjercicioChange}               />
              <label class="form-check-label" htmlFor="ejercicio-no">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          

          {ejercicio && (
            <div className="col-md-2">
              <label className="form-label" htmlFor="cual-ejercicio">
                ¿Cual ejercicio?
              </label>
              <input disabled={!activateEdit}
                type="text"
                id="cual-ejercicio"
                placeholder="¿Cual ejercicio?"
                {...register("ejercicio_cual", { required: false })}
                className="form-control"
              />
            </div>
          )}

          <div className="col-md-11"></div>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Practica tabaquismo?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="tabaquismo-si"
                name="opcion_tabaco"
                value={true}
                checked={tabaquismo} onChange={handleTabaquismoChange}               />
              <label class="form-check-label" htmlFor="tabaquismo-si">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="tabaquismo-no"
                name="opcion_tabaco"
                value={false}
                checked={!tabaquismo} onChange={handleTabaquismoChange}              />
              <label class="form-check-label" htmlFor="tabaquismo-no">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          {tabaquismo && (
            <div className="col-md-2">
              <label className="form-label" htmlFor="tabaco-edad">
                ¿Desde cuando? (Edad aprox)
              </label>
              <input disabled={!activateEdit}
                type="number"
                placeholder="¿Desde cuando? (Edad aprox)"
                id="tabaco-edad"
                defaultValue={0}
                {...register("tabaquismo_edad", { required: false })}
                className="form-control"
              />

              <label className="form-label" htmlFor="tabaco-cantidad">
                ¿Cuantos al dia u ocasional?
              </label>
              <input disabled={!activateEdit}
                type="number"
                id="tabaco-cantidad"
                defaultValue={0}
                placeholder="¿Cuantos al día u ocasional?"
                {...register("tabaquismo_cantidad", { required: false })}
                className="form-control"
              />
            </div>
          )}

          <div className="col-md-11"></div>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Es alcohólico?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="toma-si"
                name="opcion_alcoholismo"
                value={true}
                checked={alcoholismo} onChange={handleAlcoholismoChange}              />
              <label class="form-check-label" htmlFor="toma-si">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="toma-no"
                name="opcion_alcoholismo"
                value={false}
                checked={!alcoholismo} onChange={handleAlcoholismoChange}              />
              <label class="form-check-label" htmlFor="toma-no">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          {alcoholismo && (
            <div className="col-md-2">
              <label className="form-label" htmlFor="alcoholico-edad">
                ¿Desde cuando? (Edad aprox)
              </label>
              <input disabled={!activateEdit}
                type="number"
                id="alcoholico-edad"
                defaultValue={0}
                placeholder="¿Desde cuando? (Edad aprox)"
                {...register("alcoholismo_edad", { required: false })}
                className="form-control"
              />
            </div>
          )}

          <div className="col-md-11"></div>

          <div className="col-md-3 offset-md-1">
            <label class="form-label" htmlFor="inmunizaciones">
              {" "}
              Inmunizaciones:{" "}
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Inmunizaciones"
              id="inmunizaciones"
              {...register("inmunizaciones", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label class="form-label" htmlFor="habitos-higienicos">
              Hábitos higiénicos:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Habitos higienicos"
              id="habitos-higienicos"
              {...register("habitos_higienicos", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label class="form-label" htmlFor="alimenticios">
              Hábitos alimenticios:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Habitos alimenticios"
              id="alimenticios"
              {...register("habitos_alimenticios", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-4 offset-md-1">
            <label class="form-label" htmlFor="habitos">
              Especifique hábitos:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Especifique habitos"
              id="habitos"
              {...register("especifique_habitos", { required: false })}
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
            <input disabled={!activateEdit}
              type="number"
              id="edad-menarca"
              placeholder="Edad menarca"
              {...register("edad_menarca", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label class="form-label" htmlFor="duracion">
              Frecuencia y duración:
            </label>
            <input disabled={!activateEdit}
              type="number"
              id="duración"
              placeholder="Frecuencia y duracion"
              {...register("frecuencia_duracion", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label class="form-label" htmlFor="ultima-menstruacion">
              Última menstruación:
            </label>
            <input disabled={!activateEdit}
              type="text"
              id="ultima-menstruacion"
              placeholder="Ultima menstruacion"
              {...register("ultima_menstruacion", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label class="form-label" htmlFor="num-embarazos">
              Número de embarazos:
            </label>
            <input disabled={!activateEdit}
              type="number"
              id="num-embarazos"
              placeholder="Numero de embarazos"
              {...register("num_embarazos", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label class="form-label" htmlFor="num-partos">
              Número de partos:
            </label>
            <input disabled={!activateEdit}
              type="number"
              id="num-partos"
              placeholder="Numero de partos"
              {...register("num_partos", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-2 offset-md-1">
            <label class="form-label" htmlFor="num-cesareas">
              Número de cesareas:
            </label>
            <input disabled={!activateEdit}
              type="number"
              id="num-cesareas"
              placeholder="Numero de cesareas"
              {...register("num_cesareas", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label class="form-label" htmlFor="num-abortos">
              Número de abortos:
            </label>
            <input disabled={!activateEdit}
              type="number"
              id="num-abortos"
              placeholder="Numero de abortos"
              {...register("num_abortos", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label class="form-label" htmlFor="ultimo-parto">
              Último parto:
            </label>
            <input disabled={!activateEdit}
              type="text"
              id="ultimo-parto"
              placeholder="Ultimo parto"
              {...register("ultimo_parto", { required: false })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label class="form-label" htmlFor="ultimo-aborto">
              Último aborto:
            </label>
            <input disabled={!activateEdit}
              type="text"
              id="ultimo-aborto"
              placeholder="Ultimo aborto"
              {...register("ultimo_aborto", { required: false })}
              className="form-control"
            />
          </div>

          <div class="col-md-1 offset-md-1 fw-bold">
            <label class="form-label">¿Planificación familiar?</label>
          </div>

          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="plan-si"
                name="opcion_planificacion"
                value={true}
                checked={planificacion} onChange={handlePlanificacionChange}              />
              <label class="form-check-label" htmlFor="plan-si">
                {" "}
                Si{" "}
              </label>
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-check">
              <input disabled={!activateEdit}
                class="form-check-input"
                type="radio"
                id="plan-no"
                name="opcion_planificacion"
                value={false}
                checked={!planificacion} onChange={handlePlanificacionChange}              />
              <label class="form-check-label" htmlFor="plan-no">
                {" "}
                No{" "}
              </label>
            </div>
          </div>

          {planificacion && (
            <div className="col-md-4">
              <label htmlFor="metodo-familiar" className="form-label">
                Especifique:
              </label>
              <input disabled={!activateEdit}
                type="text"
                id="metodo-familiar"
                placeholder="Método"
                {...register("metodo_planificacion", { required: false })}
                className="form-control"
              />
            </div>
          )}

          <div className="col-md-11"></div>

          <h3 className="offset-md-1  col-md-11">
            3.1 ANTECEDENTES PERSONALES PATOLÓGICOS
          </h3>

          <div className="col-md-2 offset-md-1">
            <label class="form-label" htmlFor="traumaticos">
              Traumáticos:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Luxación y Fracturas"
              id="traumaticos"
              {...register("traumatismos", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label class="form-label" htmlFor="quirurgicos">
              Quirúrgicos:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Quirurgicos"
              id="quirurgicos"
              {...register("quirurgicos", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Transfusiones:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Transfusiones"
              {...register("transfusiones", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Grupo sanguíneo:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Grupo sanguineo"
              {...register("grupo_sanguineo", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Factor RH:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Factor RH"
              {...register("factor_rh", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2 offset-md-1">
            <label htmlFor="" className="form-label">
              Alergias:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Alergias"
              {...register("alergias", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Infecciones:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Infecciones"
              {...register("infecciones", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Dengue paludismo:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Dengue Paludismo"
              {...register("dengue_paludismo", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Tatuajes:
            </label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Tatuajes"
              {...register("tatuajes", { required: true })}
              className="form-control"
            />
          </div>

          <h3 className="offset-md-1 col-md-11">4. EXPLORACIÓN FÍSICA</h3>

          <div className="col-md-2 offset-md-1">
            <label htmlFor="" className="form-label">
              Tensión arterial (mmHg):
            </label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="Tension arterial mmHg"
              {...register("tension_arterial", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Frecuencia cardiaca:
            </label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="FC"
              {...register("frecuencia_cardiaca", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Frecuencia respiratoria:
            </label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="FR"
              {...register("frecuencia_respiratoria", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Oxigenación (%):
            </label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="Oxigenación %"
              {...register("oxigenacion", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Temperatura (°C):
            </label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="Temperatura °C"
              {...register("temperatura", { required: true })}
              className="form-control"
            />
          </div>

          <h3 className="offset-md-1 col-md-11">5. ANTROPOMETRÍA</h3>

          <div className="col-md-2 offset-md-1">
            <label htmlFor="" className="form-label">
              Peso actual (Kg):
            </label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="peso actual en Kg"
              {...register("peso_actual", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Talla (cm):</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Talla"
              {...register("talla", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">IMC (Kg/m^2):</label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="IMC"
              {...register("imc", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Circunferencia abdominal (cm):</label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="Circunferencia del abdomen"
              {...register("circunferencia_abd", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">
              Circunferencia de caderas (cm):
            </label>
            <input disabled={!activateEdit}
              type="number"
              placeholder="Circunferencia cadera"
              {...register("circunferencia_cadera", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-2 offset-md-1">
            <label className="form-label">Observaciones:</label>
            <textarea disabled={!activateEdit}
              placeholder="Observaciones"
              {...register("observaciones_antropometria", { required: true })}
              className="form-control"
            ></textarea>
          </div>

          <h3 className="offset-md-1 col-md-11">6. EXÁMEN FÍSICO</h3>

          <div className="col-md-3 offset-md-1">
            <label className="form-label">Cabeza:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Cabeza"
              {...register("EF_cabeza", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Cuello:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Cuello"
              {...register("EF_cuello", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Tórax:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Torax"
              {...register("EF_torax", { required: true })}
              class
              className="form-control"
            />
          </div>

          <div className="col-md-3 offset-md-1">
            <label className="form-label">Abdomen:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Abdomen"
              {...register("EF_abdomen", { required: true })}
              className="form-control"
            />
          </div>

          <h4 className="offset-md-1 col-md-11">Extremidades</h4>

          <div className="col-md-3 offset-md-1">
            <label className="form-label">Superior:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Superiores"
              {...register("EF_EXT_sup", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Inferior:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Inferiores"
              {...register("EF_EXT_inf", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Rodillas:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Rodillas"
              {...register("EF_EXT_rodillas", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3 offset-md-1">
            <label className="form-label">Pelvis:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Pelvis"
              {...register("EF_EXT_pelvis", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Pies:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Pies"
              {...register("EF_EXT_pies", { required: true })}
              className="form-control"
            />
          </div>

          <h3 className="offset-md-1 col-md-11">7. EXÁMENES DE LABORATORIO</h3>

          <div className="col-md-3 offset-md-1">
            <label className="form-label">Biometría hemática:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Biometria hematica"
              {...register("biometria_hematica", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Química sanguínea:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Quimica sanguinea"
              {...register("quimica_sanguinea", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">VDRL:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="VDRL"
              {...register("vdrl", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3 offset-md-1">
            <label className="form-label">Prueba rápida de VIH:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Prueba VIH"
              {...register("prueba_vih", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Antidoping:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Antidoping"
              {...register("antidoping", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Exámen general de orina:</label>
            <input disabled={!activateEdit}
              type="text"
              placeholder="Examen de orina"
              {...register("examen_orina", { required: true })}
              className="form-control"
            />
          </div>

          <div className="col-md-10 offset-md-1">
            <label className="form-label">Diagnostico:</label>
            <textarea disabled={!activateEdit}
              placeholder="Diagnostico"
              {...register("diagnostico", { required: true })}
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

    </div>
  )
}

