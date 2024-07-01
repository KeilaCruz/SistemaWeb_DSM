import { useForm } from "react-hook-form";
import { FormExamenMedico } from "./FormExamenMedico";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { registerExamenMedico } from "../../services/DoctorGeneral";
import { setToken } from "../../services/HeaderAuthorization";

export function AddExamenMedico() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { authTokens } = useContext(AuthContext)
  const [pacienteSelect, setPacienteSelect] = useState("")

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    const parseBoolean = (value) => {
      return value === "true"
    }
    formData.append('idUsuario', data.idUsuario)
    formData.append('idPaciente', pacienteSelect)
    formData.append('fecha_revision', data.fecha_revision)
    formData.append('antecedentes_heredofamiliares', JSON.stringify(
      {
        madre_viva: parseBoolean(data.madre_viva),
        madre_finada: data.madre_finada,
        padre_vivo: parseBoolean(data.padre_vivo),
        padre_finado: data.padre_finado,
        hermano_vivo: parseBoolean(data.hermano_vivo),
        hermano_finado: data.hermano_finado,
        hijos_vivos: parseBoolean(data.hijos_vivos),
        hijos_finados: data.hijos_finados,

      }
    ))
    formData.append('datos_enfermedades', JSON.stringify(
      {
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
      }
    ))
    formData.append('antecedentes_no_patologicos', JSON.stringify(
      {
        lugar_nacimiento: data.lugar_nacimiento,
        fecha_nacimiento: data.fecha_nacimiento,
        escolaridad: data.escolaridad,
        trabajo_actual: data.trabajo_actual,
        practica_ejercicio: parseBoolean(data.practica_ejercicio),
        ejercicio_cual: data.ejercicio_cual,
        tabaquismo: parseBoolean(data.tabaquismo),
        tabaquismo_edad: data.tabaquismo_edad,
        tabaquismo_cantidad: data.tabaquismo_cantidad,
        alcoholismo: parseBoolean(data.alcoholismo),
        alcoholismo_edad: data.alcoholismo_edad,
        inmunizaciones: data.inmunizaciones,
        habitos_higienicos: data.habitos_higienicos,
        habitos_alimenticios: data.habitos_alimenticios,
        especifique_habitos: data.especifique_habitos,
      }
    ))
    formData.append('antecedentes_gineco_obstreticos', JSON.stringify(
      {
        edad_menarca: data.edad_menarca,
        frecuencia_duracion: data.frecuencia_duracion,
        ultima_menstruacion: data.ultima_menstruacion,
        num_embarazos: data.num_embarazos,
        num_partos: data.num_partos,
        num_cesareas: data.num_cesareas,
        num_abortos: data.num_abortos,
        ultimo_parto: data.ultimo_parto,
        ultimo_aborto: data.ultimo_aborto,
        planificacion_familiar: parseBoolean(data.planificacion_familiar),
        metodo_planificacion: data.metodo_planificacion,
      }
    ))
    formData.append('antecedentes_personales_patologicos', JSON.stringify(
      {
        traumatismos: data.traumatismos,
        quirurgicos: data.quirurgicos,
        transfusiones: data.transfusiones,
        grupo_sanguineo: data.grupo_sanguineo,
        factor_rh: data.factor_rh,
        alergias: data.alergias,
        infecciones: data.infecciones,
        dengue_paludismo: data.dengue_paludismo,
        tatuajes: data.tatuajes,
      }
    ))
    formData.append('datos_exploracion_fisica', JSON.stringify(
      {
        tension_arterial: data.tension_arterial,
        frecuencia_cardiaca: data.frecuencia_cardiaca,
        frecuencia_respiratoria: data.frecuencia_respiratoria,
        oxigenacion: data.oxigenacion,
        temperatura: data.temperatura,
      }
    ))
    formData.append('datos_antropometria', JSON.stringify(
      {
        peso_actual: data.peso_actual,
        talla: data.talla,
        imc: data.imc,
        circunferencia_abd: data.circunferencia_abd,
        circunferencia_cadera: data.circunferencia_cadera,
        observaciones_antropometria: data.observaciones_antropometria,
      }
    ))
    formData.append('datos_examen_medico', JSON.stringify(
      {
        EF_cabeza: data.EF_cabeza,
        EF_cuello: data.EF_cuello,
        EF_torax: data.EF_torax,
        EF_abdomen: data.EF_abdomen,
        EF_EXT_sup: data.EF_EXT_sup,
        EF_EXT_inf: data.EF_EXT_inf,
        EF_EXT_rodillas: data.EF_EXT_rodillas,
        EF_EXT_pelvis: data.EF_EXT_pelvis,
        EF_EXT_pies: data.EF_EXT_pies,
      }
    ))
    formData.append('datos_examenes_laboratorio', JSON.stringify(
      {
        biometria_hematica: data.biometria_hematica,
        quimica_sanguinea: data.quimica_sanguinea,
        vdrl: data.vdrl,
        prueba_vih: data.prueba_vih,
        antidoping: data.antidoping,
        examen_orina: data.examen_orina,
        diagnostico: data.diagnostico,
      }
    ))
    if (data.archivo && data.archivo[0] instanceof File) {
      formData.append('archivo', data.archivo[0]);
    } else {
      console.error('El archivo no es válido');
      return;
    }
    try {
      await setToken(authTokens.access);
      const response = await registerExamenMedico(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <FormExamenMedico
        register={register}
        onSubmit={onSubmit}
        pacienteSelect={pacienteSelect}
        setPacienteSelect={setPacienteSelect}
        errors={errors}

      />
    </>
  );
}
