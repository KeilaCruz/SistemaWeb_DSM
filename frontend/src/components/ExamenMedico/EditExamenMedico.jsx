import { useForm } from "react-hook-form"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import { editarExamenMedico } from "../../services/DoctorGeneral"
import { setToken } from "../../services/HeaderAuthorization"

export function EditExamenMedico({examenMedico}) {
    const { register, setValue, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [activateEdit, setActiEdit] = useState(false)
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

    useEffect(() =>{
        async function loadInput() {
            try {
                setValue("fecha_revision", examenMedico.fecha_revision);
                setValue("idUsuario", examenMedico.idUsuario);
                setMadreViva("madre_viva", examenMedico.madre_viva.toString());
                setValue("madre_finada", examenMedico.madre_finada);
                setPadreVivo("padre_vivo", examenMedico.padre_vivo.toString());
                setValue("padre_finado", examenMedico.padre_finado);
                setHermanoVivo("hermano_vivo", examenMedico.hermano_vivo.toString());
                setValue("hermano_finado", examenMedico.hermano_finado);
                setHijosVivos("hijos_vivos", examenMedico.hijos_vivos.toString());
                setValue("hijos_finados", examenMedico.hijos_finados);
                setValue("agudeza_visual", examenMedico.agudeza_visual);
                setValue("hiper_tension", examenMedico.hiper_tension);
                setValue("diabetes_mellitus", examenMedico.diabetes_mellitus);
                setValue("obesidad", examenMedico.obesidad);
                setValue("asma", examenMedico.asma);
                setValue("epilepsia", examenMedico.epilepsia);
                setValue("lupus", examenMedico.lupus);
                setValue("nefropatias", examenMedico.nefropatias);
                setValue("artropatias", examenMedico.artropatias);
                setValue("otras_enfermedades", examenMedico.otras_enfermedades);
                setValue("observaciones_enfermedades", examenMedico.observaciones_enfermedades);
                setValue("lugar_nacimiento", examenMedico.lugar_nacimiento);
                setValue("fecha_nacimiento", examenMedico.fecha_nacimiento);
                setValue("escolaridad", examenMedico.escolaridad);
                setValue("trabajo_actual", examenMedico.trabajo_actual);
                setEjercicio("practica_ejercicio", examenMedico.practica_ejercicio.toString());
                setValue("ejercicio_cual", examenMedico.ejercicio_cual);
                setTabaquismo("tabaquismo", examenMedico.tabaquismo.toString());
                setValue("tabaquismo_edad", examenMedico.tabaquismo_edad);
                setValue("tabaquismo_cantidad", examenMedico.tabaquismo_cantidad);
                setAlcoholismo("alcoholismo", examenMedico.alcoholismo.toString());
                setValue("alcoholismo_edad", examenMedico.alcoholismo_edad);
                setValue("inmunizaciones", examenMedico.inmunizaciones);
                setValue("habitos_higienicos", examenMedico.habitos_higienicos);
                setValue("habitos_alimenticios", examenMedico.habitos_alimenticios);
                setValue("especifique_habitos", examenMedico.especifique_habitos);
                setValue("edad_menarca", examenMedico.edad_menarca);
                setValue("frecuencia_duracion", examenMedico.frecuencia_duracion);
                setValue("ultima_menstruacion", examenMedico.ultima_menstruacion);
                setValue("num_embarazos", examenMedico.num_embarazos);
                setValue("num_partos", examenMedico.num_partos);
                setValue("num_cesareas", examenMedico.num_cesareas);
                setValue("num_abortos", examenMedico.num_abortos);
                setValue("ultimo_parto", examenMedico.ultimo_parto);
                setValue("ultimo_aborto", examenMedico.ultimo_aborto);
                setPlanificacion("planificacion_familiar",examenMedico.planificacion_familiar.toString());
                setValue("metodo_planificacion", examenMedico.metodo_planificacion);
                setValue("traumatismos", examenMedico.traumatismos);
                setValue("quirurgicos", examenMedico.quirurgicos);
                setValue("transfusiones", examenMedico.transfusiones);
                setValue("grupo_sanguineo", examenMedico.grupo_sanguineo);
                setValue("factor_rh", examenMedico.factor_rh);
                setValue("alergias", examenMedico.alergias);
                setValue("infecciones", examenMedico.infecciones);
                setValue("dengue_paludismo", examenMedico.dengue_paludismo);
                setValue("tatuajes", examenMedico.tatuajes);
                setValue("tension_arterial", examenMedico.tension_arterial);
                setValue("frecuencia_cardiaca", examenMedico.frecuencia_cardiaca);
                setValue("frecuencia_respiratoria", examenMedico.frecuencia_respiratoria);
                setValue("oxigenacion", examenMedico.oxigenacion);
                setValue("temperatura", examenMedico.temperatura);
                setValue("peso_actual", examenMedico.peso_actual);
                setValue("talla", examenMedico.talla);
                setValue("imc", examenMedico.imc);
                setValue("circunferencia_abd", examenMedico.circunferencia_abd);
                setValue("circunferencia_cadera", examenMedico.circunferencia_cadera);
                setValue(
                "observaciones_antropometria",
                examenMedico.observaciones_antropometria
                );
                setValue("EF_cabeza", examenMedico.EF_cabeza);
                setValue("EF_cuello", examenMedico.EF_cuello);
                setValue("EF_torax", examenMedico.EF_torax);
                setValue("EF_abdomen", examenMedico.EF_abdomen);
                setValue("EF_EXT_sup", examenMedico.EF_EXT_sup);
                setValue("EF_EXT_inf", examenMedico.EF_EXT_inf);
                setValue("EF_EXT_rodillas", examenMedico.EF_EXT_rodillas);
                setValue("EF_EXT_pelvis", examenMedico.EF_EXT_pelvis);
                setValue("EF_EXT_pies", examenMedico.EF_EXT_pies);
                setValue("biometria_hematica", examenMedico.biometria_hematica);
                setValue("quimica_sanguinea", examenMedico.quimica_sanguinea);
                setValue("vdrl", examenMedico.vdrl);
                setValue("prueba_vih", examenMedico.prueba_vih);
                setValue("antidoping", examenMedico.antidoping);
                setValue("examen_orina", examenMedico.examen_orina);
                setValue("diagnostico", examenMedico.diagnostico);
            } catch (error) {
                
            }
        }
    })


  return (
    <div>

    </div>
  )
}

