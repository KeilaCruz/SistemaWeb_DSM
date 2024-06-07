import { useEffect, useState } from "react"

export function HistoriaFormVisualizar({ historia }) {
    const [diabetesAHF, setDiabetesAHF] = useState(false)
    const [hipertensionAHF, setHipertensionAHF] = useState(false)
    const [dislipidemiasAHF, setDislipidemiasAHF] = useState(false)
    const [diabetesMellitusAP, setDiabetesMellitusAP] = useState(false)
    const [hipertensionAP, setHipertensionAP] = useState(false)
    const [dislipidemiasAP, setDislipidemiasAP] = useState(false)
    const [problemasGastro, setProblemasGastro] = useState(false)
    const [intervencionQuirurgica, setIntervencionQuirurgica] = useState(false)
    const [alergiaAlimento, setAlergiaAlimento] = useState(false)
    const [consumeFarmacoAlergia, setConsumeFarmacoAlergia] = useState(false)
    const [realizaActividadFisica, setRealizaActividadFisica] = useState(false)
    const [consumeAlcohol, setConsumeAlcohol] = useState(false)
    const [consumeTabaco, setConsumeTabaco] = useState(false)
    const [consumeDrogas, setConsumeDroga] = useState(false)
    const [actualmenteLactando, setActualmenteLactando] = useState(false)
    const [presentaMenoupasia, setPresentaMenopausia] = useState(false)

    const textoDiabetesAHF = diabetesAHF ? 'Si' : 'No'
    const textoHipertensionAHF = hipertensionAHF ? 'Si' : 'No'
    const textoDislipidemiasAHF = dislipidemiasAHF ? 'Si' : 'No'
    const textoDiabetesMellitusAP = diabetesMellitusAP ? 'Si' : 'No'
    const textoHipertensionAP = hipertensionAP ? 'Si' : 'No'
    const textoDislipidemiasAP = dislipidemiasAP ? 'Si' : 'No'
    const textoProblemasGastro = problemasGastro ? 'Si' : 'No'
    const textoIntervencionQuirurgica = intervencionQuirurgica ? 'Si' : 'No'
    const textoAlergiaAlimento = alergiaAlimento ? 'Si' : 'No'
    const textoConsumeFarmacoAlergia = consumeFarmacoAlergia ? 'Si' : 'No'
    const textoRealizaActividadFisica = realizaActividadFisica ? 'Si' : 'No'
    const textoConsumeAlcohol = consumeAlcohol ? 'Si' : 'No'
    const textoConsumeTabaco = consumeTabaco ? 'Si' : 'No'
    const textoConsumeDrogas = consumeDrogas ? 'Si' : 'No'
    const textoActualmenteLactando = actualmenteLactando ? 'Si' : 'No'
    const textoPresentaMenoupasia = presentaMenoupasia ? 'Si' : 'No'

    useEffect(() => {
        async function loadInput() {
            setDiabetesAHF(historia[0].indicadores_clinicos.AHF_diabetes)
            setHipertensionAHF(historia[0].indicadores_clinicos.AHF_hipertension)
            setDislipidemiasAHF(historia[0].indicadores_clinicos.AHF_dislipidemias)
            setDiabetesMellitusAP(historia[0].indicadores_clinicos.AP_diabetes_mellitus)
            setHipertensionAP(historia[0].indicadores_clinicos.AP_hipertension)
            setDislipidemiasAP(historia[0].indicadores_clinicos.AP_dislipidemias)
            setProblemasGastro(historia[0].indicadores_clinicos.problema_gastrointestinal)
            setIntervencionQuirurgica(historia[0].indicadores_clinicos.intervencion_quirurgica)
            setAlergiaAlimento(historia[0].indicadores_clinicos.alergia_alimento)
            setConsumeFarmacoAlergia(historia[0].indicadores_clinicos.consume_farmaco_alergia)
            setRealizaActividadFisica(historia[0].anp.realiza_actividad_fisica)
            setConsumeAlcohol(historia[0].anp.consume_alcohol)
            setConsumeTabaco(historia[0].anp.consume_tabaco)
            setConsumeDroga(historia[0].anp.consume_droga)
            setActualmenteLactando(historia[0].ago.actualmente_lactando)
            setPresentaMenopausia(historia[0].ago.presenta_menopausia)
        }
        loadInput()
    }, [])
    return (
        <>

            {historia.map(historia => (
                <div>
                    <div className="col-md-3 offset-1">
                        <label htmlFor="num_expediente" className="form-label label-form">Número expediente</label>
                        <input className="form-control input-form" id="num_expediente" placeholder="Número expediente" type="number" value={historia.idHistoriaNutricion} />
                    </div>

                    <div className="col-md-3 mx-4">
                        <label htmlFor="fecha_registro" className="form-label label-form">Fecha de registro</label>
                        <input className="form-control input-form" type="date" id="fecha_registro" placeholder="Fecha de registro" value={historia.fecha_registro} />
                    </div>
                    <div className="col-md-3 mx-4">
                        <label htmlFor="fecha_nacimiento" className="form-label label-form">Fecha de nacimiento</label>
                        <input className="form-control input-form" type="date" id="fecha_nacimiento" placeholder="Fecha de nacimiento" value={historia.datos_personales.fecha_registro} />
                    </div>
                    <div className="col-md-3 offset-md-1">
                        <label htmlFor="municipio_nacimiento" className="form-label label-form">Municipio de nacimiento</label>
                        <input className="form-control input-form" type="text" id="municipio_nacimiento" placeholder="Municipio de nacimiento" value={historia.datos_personales.municipio_nacimiento} />
                    </div>
                    <div className="col-md-3 mx-4">
                        <label htmlFor="estado_nacimiento" className="form-label label-form">Estado de nacimiento</label>
                        <input className="form-control input-form" type="text" id="estado_nacimiento" placeholder="Estado de nacimiento" value={historia.datos_personales.estado_nacimiento} />
                    </div>
                    <div className="col-md-10 offset-md-1">
                        <label htmlFor="motivo_consulta" className="form-label label-form">Motivo de consulta</label>
                        <textarea id="motivo_consulta" className="form-control input-form" placeholder="Motivo de consulta" value={historia.datos_personales.motivo_consulta}></textarea>
                    </div>

                    <div className="col-md-9 offset-1 mt-2">
                        <label htmlFor="Indicadores_clinicos" className="form-label label-section">INDICADORES CLÍNICOS</label>
                    </div>
                    <div className="col-md-9 offset-1">
                        <label htmlFor="AHF" className="form-label label-form">AHF</label>
                    </div>

                    <div className="col-md-3 offset-1">
                        <label htmlFor="diabetes_ahf" className="form-label label-form">Diabetes</label>
                        <input className="form-control input-form" id="diabetes_ahf" type="text" value={textoDiabetesAHF} />
                    </div>
                    <div className="col-md-6 offset-1 mt-4">
                        <input id="quien_diabetes" className="form-control input-form" type="text" placeholder="¿Quién?" />
                    </div>
                    <div className="col-md-3 offset-1">
                        <label htmlFor="hipertension_AHF" className="form-label label-form">Hipertensión</label>
                        <input className="form-control input-form" id="hipertension_AHF" type="text" value={textoHipertensionAHF} />
                    </div>
                    <div className="col-md-6 offset-1 mt-4">
                        <input className="form-control input-form" type="text" placeholder="¿Quién?" />
                    </div>

                    <div className="col-md-3 offset-1">
                        <label htmlFor="dislipidemias_AHF" className="form-label label-form">Dislipidemias</label>
                        <input className="form-control input-form" id="dislipidemias_AHF" type="text" value={textoDislipidemiasAHF} />
                    </div>
                    <div className="col-md-6 offset-1 mt-4">
                        <input id="quien_dislipidemias" className="form-control input-form" type="text" placeholder="¿Quién?" />
                    </div>
                    <div className="col-md-9 offset-1 mt-2 mb-2">
                        <label htmlFor="antecedentes_patologicos" className="form-label label-section">ANTECEDENTES PATOLÓGICOS</label>
                    </div>
                    <div className="col-md-2 offset-1">
                        <label htmlFor="diabetesmellitus" className="form-label label-form">Diabetes mellitus</label>
                        <input className="form-control input-form" id="diabetesmellitus" type="text" value={textoDiabetesMellitusAP} />
                    </div>
                    <div className="col-md-2 mx-4">
                        <label htmlFor="hipertension_AP" className="form-label label-form" >Hipertensión</label>
                        <input className="form-control input-form" id="hipertension_AP" type="text" value={textoHipertensionAP} />
                    </div>
                    <div className="col-md-2 mx-4">
                        <label htmlFor="dislipidemias_AP" className="form-label label-form">Dislipidemias</label>
                        <input className="form-control input-form" id="dislipidemias_AP" type="text" value={textoDislipidemiasAP} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="problemas_gastrointestinales" className="form-label label-form">Problemas gastrointestinales</label>
                        <input className="form-control input-form" id="problemas_gastrointestinales" value={textoProblemasGastro} />
                    </div>
                    <div className="col-md-10 offset-1 mt-2">
                        <label htmlFor="cual_problema_gastro" className="form-label label-form">¿Cuál es su padecimiento gastrointestinal?</label>
                        <input id="cual_problema_gastro" className="form-control input-form" type="text" placeholder="¿Cuál?" value={historia.indicadores_clinicos.cual_problema_gastrointestinal} />
                    </div>
                    <div className="col-md-10 offset-1 mt-2">
                        <label htmlFor="observaciones_gastro" className="form-label label-form">Observaciones gastrointestinal</label>
                        <textarea id="observaciones_gastro" className="input-form form-control" placeholder="Observaciones" value={historia.indicadores_clinicos.observaciones_patologicas} ></textarea>
                    </div>
                    <div className="col-md-4 offset-1 mt-2">
                        <label htmlFor="intervencion_quirurgica" className="form-label label-form">Intervenciones quirurgicas</label>
                        <input className="input-form form-control" id="intervencion_quirurgica" type="text" value={textoIntervencionQuirurgica} />
                    </div>
                    <div className="col-md-6 mx-1 mt-2">
                        <label htmlFor="cual_intervencion_quirurgica" className="form-label label-form">¿Cuál intervención quirurgica?</label>
                        <input id="cual_intervencion_quirurgica" className="input-form form-control" type="text" placeholder="¿Cuál?" value={historia.indicadores_clinicos.cual_intervencion_quirurgica} />
                    </div>
                    <div className="col-md-4 offset-1 mt-2">
                        <label htmlFor="alergia_alimento" className="form-label label-form">Alergia/Intolerancia a un alimento</label>
                        <input className="input-form form-control" id="alergia_alimento" type="text" value={textoAlergiaAlimento} />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="cual_alergia_alimento" className="form-label label-form">¿Cuál?</label>
                        <input id="cual_alergia_alimento" className="input-form form-control" type="text" placeholder="¿Cuál?" value={historia.indicadores_clinicos.cual_alergia_alimento} />
                    </div>

                    <div className="col-md-4 offset-1 mt-2">
                        <label htmlFor="consume_farmaco" className="form-label label-form">¿Consume algún farmáco?</label>
                        <input className="input-form form-control" id="consume_farmaco" type="text" value={textoConsumeFarmacoAlergia} />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor="consume_farmaco" className="form-label label-form">¿Cuál?</label>
                        <input id="consume_farmaco" className="form-control input-form" type="text" placeholder="¿Cuál?" value={historia.indicadores_clinicos.cual_alergia_farmaco} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="consume_farmaco" className="form-label label-form">¿Desde cuándo?</label>
                        <input className="form-control input-form" type="text" placeholder="¿Desde cuándo?" value={historia.indicadores_clinicos.desde_cuando_farmaco} />
                    </div>
                    <div className="col-md-9 offset-1 mt-2 mb-2">
                        <label htmlFor="ANP" className="form-label label-section">ANP</label>
                    </div>
                    <div className="col-md-3 offset-1">
                        <label htmlFor="actividad_fisica" className="form-label label-form">Realiza actividad fisica</label>
                        <input className="form-control input-form" id="actividad_fisica" type="text" value={textoRealizaActividadFisica} />
                    </div>
                    <div className="col-md-4 offset-1">
                        <label htmlFor="cual_actividad_fisica" className="form-label label-form">¿Cuál?</label>
                        <input id="cual_actividad_fisica" className="form-control input-form" type="text" placeholder="¿Cuál?" value={historia.anp.cual_actividad_fisica} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="duracion_actividad_fisica" className="form-label label-form">Duración</label>
                        <input id="duracion_activdad_fisica" className="form-control input-form" type="text" placeholder="Duración" value={historia.anp.duracion} />
                    </div>

                    <div className="col-md-9 offset-1">
                        <label htmlFor="sustancias_consume" className="form-label label-form">¿Consume alguna de las siguientes sustancias?</label>
                    </div>
                    <div className="col-md-3 offset-1">
                        <label htmlFor="consume_alcohol" className="form-label label-form">Alcohol</label>
                        <input className="form-control input-form" id="consume_alcohol" type="text" value={textoConsumeAlcohol} />
                    </div>
                    <div className="col-md-3 mx-5">
                        <label htmlFor="consume_tabaco" className="form-label label-form">Tabaco</label>
                        <input className="form-control input-form" id="consume_tabaco" type="text" value={textoConsumeTabaco} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="consume_drogas" className="form-label label-form">Drogas</label>
                        <input className="form-control input-form" id="consume_drogas" type="text" value={textoConsumeDrogas} />
                    </div>


                    {/**Solo se muestra si es femenino la paciente */}
                    <div className="row mt-2">
                        <div className="col-md-10 offset-1 mt-2">
                            <label htmlFor="AGO" className="form-label label-section">AGO</label>
                        </div>
                        <div className="col-md-3 offset-1">
                            <label htmlFor="num_gestas" className="form-label label-form">Número de gestas</label>
                            <input id="num_gestas" className="form-control input-form" type="number" placeholder="Número de gestas" value={historia.ago.numero_gestas} />
                        </div>
                        <div className="col-md-3 mx-5">
                            <label htmlFor="num_partos" className="form-label label-form">Números de partos y/o cesárea</label>
                            <input id="num_partos_cesarea" className="form-control input-form" type="number" placeholder="Número de partos cesarea" value={historia.ago.numero_partos_cesarea} />
                        </div>
                        <div className="col-md-3 mx-3">
                            <label htmlFor="num_abortos" className="form-label label-form">Abortos</label>
                            <input id="num_abortos" className="form-control input-form" type="number" placeholder="Número de abortos" value={historia.ago.numero_abortos} />
                        </div>
                        <div className="col-md-3 mt-2 offset-1">
                            <label htmlFor="ultima_mestruacion" className="form-label label-form">Última menstruación</label>
                            <input className="form-control input-form" id="ultima_menstruacion" type="date" placeholder="Ultima menstruación" value={historia.ago.fecha_ultima_menstruacion} />
                        </div>
                        <div className="col-md-3 mx-5 mt-2">
                            <label htmlFor="actualmente_lactando" className="form-label label-form">Actualmente lactando</label>
                            <input className="form-control input-form" id="actualmente_lactando" type="text" value={textoActualmenteLactando} />
                        </div>
                        <div className="col-md-3 mx-3 mt-2">
                            <label htmlFor="menoupasia" className="form-label label-form">Presenta menoupasia</label>
                            <input className="form-control input-form" id="menopausia" type="text" value={textoPresentaMenoupasia} />
                        </div>
                    </div>

                    <div className="col-md-9 mt-2 offset-1">
                        <label htmlFor="indicadores_diabeticos" className="form-label label-section">INDICADORES DIETÉTICOS</label>
                    </div>
                    <div className="col-md-9 offset-1">
                        <label htmlFor="frecuencia_alimentos" className="form-label label-form">Frecuencia de grupo de alimentos</label>
                    </div>
                    <div className="col-md-2 mt-2 offset-1">
                        <label htmlFor="frecuencia_cereales" className="form-label label-form">Cereales</label>
                        <input className="form-control input-form" type="text" id="frecuencia_cereales" placeholder="Frecuencia de cereales" value={historia.indicadores_diabeticos.frecuencia_cereales} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_frutas" className="form-label label-form">Frutas</label>
                        <input className="form-control input-form" type="text" id="frecuencia_frutas" placeholder="Frecuencia de frutas" value={historia.indicadores_diabeticos.frecuencia_frutas} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_verduras" className="form-label label-form">Verduras</label>
                        <input className="form-control input-form" type="text" id="frecuencia_verduras" placeholder="Frecuencia de verduras" value={historia.indicadores_diabeticos.frecuencia_verduras} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_carne" className="form-label label-form">Carne roja</label>
                        <input className="form-control input-form" type="text" id="frecuencia_carne" placeholder="Frecuencia de carne roja" value={historia.indicadores_diabeticos.frecuencia_carne_roja} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_pollo" className="form-label label-form">Pollo</label>
                        <input className="form-control input-form" type="text" id="frecuencia_pollo" placeholder="Frecuencia de pollo" value={historia.indicadores_diabeticos.frecuencia_pollo} />
                    </div>
                    <div className="col-md-2 offset-md-1 mt-2">
                        <label htmlFor="frecuencia_lacteos" className="form-label label-form">Lacteos</label>
                        <input className="form-control input-form" type="text" id="frecuencias_lacteos" placeholder="Frecuencia de lacteos" value={historia.indicadores_diabeticos.frecuencia_lacteos} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_leguminosas" className="form-label label-form">Leguminosas</label>
                        <input className="form-control input-form" type="text" id="frecuencia_leguminosas" placeholder="Frecuencia de leguminosas" value={historia.indicadores_diabeticos.frecuencia_leguminosas} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_azucar" className="form-label label-form">Azúcar</label>
                        <input className="form-control input-form" type="text" id="frecuencias_azucar" placeholder="Frecuencia de azucar" value={historia.indicadores_diabeticos.frecuencia_azucar} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_grasas" className="form-label label-form">Grasas</label>
                        <input className="form-control input-form" type="text" id="frecuencias_grasas" placeholder="Frecuencia de grasas" value={historia.indicadores_diabeticos.frecuencia_grasas} />
                    </div>
                    <div className="col-md-2 mt-2">
                        <label htmlFor="frecuencia_pescado" className="form-label label-form">Pescado</label>
                        <input className="form-control input-form" type="text" id="frecuencia_pescado" placeholder="Frecuencia de pescado" value={historia.indicadores_diabeticos.frecuencia_pescado} />
                    </div>

                    <div className="col-md-3 offset-1 mt-2">
                        <label htmlFor="veces_come" className="form-label label-form">¿Cuántas veces come al día?</label>
                        <input className="form-control input-form" type="number" id="veces_come" placeholder="¿Cuántas veces?" value={historia.indicadores_diabeticos.cuantas_veces_come} />
                    </div>
                    <div className="col-md-3 mx-4 mt-2">
                        <label htmlFor="quien_prepara_alimentos" className="form-label label-form">¿Quién preparara los alimentos?</label>
                        <input className="form-control input-form" type="text" id="quien_prepara_ali" placeholder="¿Quién?" value={historia.indicadores_diabeticos.quien_prepara_alimentos} />
                    </div>
                    <div className="col-md-3 mt-2 mx-3">
                        <label htmlFor="litros_agua" className="form-label label-form">¿Cuánto consume de agua?</label>
                        <input className="form-control input-form" type="number" id="litros_agua" placeholder="Litros de agua que consume" step="any" value={historia.indicadores_diabeticos.litro_consume_agua} />
                    </div>
                    <div className="col-md-3 offset-1 mt-2">
                        <label htmlFor="litros_refresco" className="form-label label-form">¿Cuánto consume de refresco?</label>
                        <input className="form-control input-form" type="number" id="litros_refresco" placeholder="Litros de refresco que consume" step="any" value={historia.indicadores_diabeticos.litro_consume_refresco} />
                    </div>
                    <div className="col-md-3 mx-4 mt-2">
                        <label htmlFor="litros_cafe" className="form-label label-form">¿Cuánto consume de café?</label>
                        <input className="form-control input-form" type="number" id="litros_cafe" placeholder="Litros de café que consume" step="any" value={historia.indicadores_diabeticos.litro_consume_cafe} />
                    </div>
                    <div className="col-md-6 offset-md-1 mt-2">
                        <label htmlFor="tipo_grasa_alimentos" className="form-label label-form">¿Qué tipo de grasa utiliza para preparar sus alimentos?</label>
                        <input className="form-control input-form" id="grasa_alimentos" type="text" placeholder="Aceite vegetal, manteca o mantequilla" value={historia.indicadores_diabeticos.tipo_grasa_preparar_alimentos} />
                    </div>
                    <div className="col-md-10 offset-1 mt-2">
                        <label htmlFor="alimentos_malestar" className="form-label label-form">Alimentos que causan malestar</label>
                        <textarea className="form-control input-form" id="alimentos_malestar" placeholder="Alimentos que causan malestar" value={historia.indicadores_diabeticos.alimentos_causan_malestar}></textarea>
                    </div>
                    <div className="col-md-10 offset-1 mt-2">
                        <label htmlFor="R24" className="form-label label-form">R24</label>
                    </div>
                    <div className="col-md-5 offset-1 mt-2">
                        <label htmlFor="r24_desayuno" className="form-label label-form">Desayuno</label>
                        <textarea className="form-control input-form" id="r24_desayuno" placeholder="Desayuno" value={historia.indicadores_diabeticos.r24_desayuno} />
                    </div>
                    <div className="col-md-5 offset-0.6 mt-2">
                        <label htmlFor="r24_colacion_uno" className="form-label label-form">Colación uno</label>
                        <textarea className="form-control input-form" id="r24_colacion_uno" placeholder="Colacion" value={historia.indicadores_diabeticos.r24_colacion_uno} />
                    </div>
                    <div className="col-md-5 offset-1 mt-2">
                        <label htmlFor="r24_comida" className="form-label label-form">Comida</label>
                        <textarea className="form-control input-form" id="r24_comida" placeholder="Comida" value={historia.indicadores_diabeticos.r24_comida} />
                    </div>
                    <div className="col-md-5 offset-0.6 mt-2">
                        <label htmlFor="r24_colación_dos" className="form-label label-form">Colación dos</label>
                        <textarea className="form-control input-form" id="r24_colacion_dos" placeholder="Colación dos" value={historia.indicadores_diabeticos.r24_colacion_dos} />
                    </div>
                    <div className="col-md-5 offset-1">
                        <label htmlFor="r24_cena" className="form-label label-form">Cena</label>
                        <textarea className="form-control input-form" id="r24_cena" placeholder="Cena" value={historia.indicadores_diabeticos.r24_cena} />
                    </div>
                    <div className="col-md-10 offset-1 mt-2">
                        <label htmlFor="diagnostico_nutricional" className="form-label label-form">Diagnóstico nutricio</label>
                        <textarea className="form-control input-form" id="diagnostico_nutricio" placeholder="Diagnostico nutricional" value={historia.diagnostico.diagnostico_nutricio}></textarea>
                    </div>
                    <div className="col-md-10 offset-1 mt-2">
                        <label htmlFor="diagnostico_nutricional" className="form-label label-form">Tratamiento nutricional</label>
                        <textarea className="form-control input-form" id="tratamiento_nutricional" placeholder="Tratamiento nutricional" value={historia.diagnostico.tratamiento_nutricional} ></textarea>
                    </div>
                </div>
            ))}

        </>
    )
}

