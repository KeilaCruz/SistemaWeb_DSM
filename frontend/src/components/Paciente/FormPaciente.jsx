import { useState } from "react"

export function FormPaciente({ onSubmit, register }) {
    const [showCualEstatal, setShowEstatal] = useState(false)
    const [showCualFederal, setShowFederal] = useState(false)
    const [showCualMunicipal, setShowMunicipal] = useState(false)
    const [inputValueFederal, setInputValueFederal] = useState('');
    const [inputValueEstatal, setInputValueEstatal] = useState('');
    const [inputValueMunicipal, setInputValueMunicipal] = useState('');

    //activar campo para ingresar nombre de programa en el cuál es beneficiario
    const handleRadioFederalChange = (evt) => {
        const optionSeleccionada = evt.target.value;
        if (optionSeleccionada === 'true') {
            setShowFederal(true);
        } else if (optionSeleccionada === 'false') {
            setShowFederal(false);
            setInputValueFederal('')
        }
    };

    const handleRadioEstatalChange = (evt) => {
        const optionSeleccionada = evt.target.value;
        if (optionSeleccionada === 'true') {
            setShowEstatal(true);
        } else if (optionSeleccionada === 'false') {
            setShowEstatal(false);
            setInputValueEstatal('')
        }
    };

    const handleRadioMunicipalChange = (evt) => {
        const optionSeleccionada = evt.target.value;
        if (optionSeleccionada === 'true') {
            setShowMunicipal(true);
        } else if (optionSeleccionada === 'false') {
            setShowMunicipal(false);
            setInputValueMunicipal('')
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row g-2 mt-5">
                    <div className="col-md-10 offset-md-1 text-center mt-5">
                        <hr />
                        <h3 className="title">FICHA DE IDENTIDAD DEL PACIENTE</h3>
                        <hr />
                    </div>
                </div>
                <form onSubmit={onSubmit} className="row g-3">
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="Nombre" className="form-label label-form">Nombres(s)</label>
                        <input id="Nombre" className="form-control input-form" type="text" placeholder="Nombre" {...register("nombre", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apePaterno" className="form-label label-form">Apellido paterno</label>
                        <input className="form-control input-form" type="text" placeholder="Apellido paterno" {...register("apePaterno", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apeMaterno" className="form-label label-form" >Apellido materno</label>
                        <input className="form-control input-form" type="text" placeholder="Apellido materno" {...register("apeMaterno", { required: true })} />
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="edad" className="form-label label-form" >Edad</label>
                        <input className="form-control input-form" type="number" placeholder="Edad" {...register("edad", { required: true })} />
                    </div>
                    <div className="col-md-2 offset-md-0.6">
                        <label htmlFor="estado_civil" className="form-label label-form" >Estado civil</label>
                        <select className="form-select input-form" name="estado_civil" {...register("estado_civil", { required: true })}>
                            <option value="" disabled selected>Elija estado civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Divorciado">Divorciado</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="curp" className="form-label label-form">CURP</label>
                        <input className="form-control input-form" type="text" placeholder="CURP" {...register("CURP", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="escolaridad" className="form-label label-form">Escolaridad</label>
                        <select className="form-select input-form" name="escolaridad" {...register("escolaridad", { required: true })}>
                            <option value="" disabled selected>Elija escolaridad</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Bachillerato">Bachillerato</option>
                            <option value="Divorciado">Universidad</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="colonia" className="form-label label-form" >Colonia</label>
                        <input className="form-control input-form" type="text" placeholder="Colonia" {...register("colonia", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form" >Calle</label>
                        <input className="form-control input-form" type="text" placeholder="Calle" {...register("calle", { required: true })} />
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="numero_exterior" className="form-label label-form" >Número exterior</label>
                        <input className="form-control input-form" type="number" placeholder="Número" {...register("numero_exterior", { required: true })} />
                    </div>
                    <div className="col-md-2 offset-md-0.8">
                        <label htmlFor="cp" className="form-label label-form" >CP</label>
                        <input className="form-control input-form" type="number" placeholder="CP" {...register("CP", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="referencia" className="form-label label-form" >Entre que calles o referencia</label>
                        <textarea className="form-control input-form" placeholder="Entre calles o referencia" {...register("referencia", { required: true })}></textarea>
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="telefono" className="form-label label-form" >Teléfono</label>
                        <input className="form-control input-form" type="text" placeholder="Telefono" {...register("telefono", { required: true })} />
                    </div>
                    <div className="col-md-2 offset-md-0.8">
                        <label htmlFor="derecho_habiencia" className="form-label label-form" >Derechohabiencia</label>
                        <select className="form-select input-form" name="derecho_habiencia" {...register("derecho_habiencia", { required: true })}>
                            <option value="" disabled selected>Elija derechohabiencia</option>
                            <option value="IMSS">IMSS</option>
                            <option value="ISSSTE">ISSSTE</option>
                            <option value="PEMEX">PEMEX</option>
                            <option value="SEDENA">SEDENA</option>
                            <option value="SEDMAR">SEDMAR</option>
                            <option value="SSA/SESVER">SSA/SESVER</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="unidad_salud" className="form-label label-form" >Unidad de salud</label>
                        <input className="form-control input-form" type="text" placeholder="Unidad de salud" {...register("unidad_salud", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form" >Última visita al médico</label>
                        <input className="form-control input-form" type="date" placeholder="Ultima visita con su medico" {...register("ultima_visita_medico", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="num_persona_vive" className="form-label label-form">Número de personas con la que vive</label>
                        <input className="form-control input-form" type="number" placeholder="¿Cuantas personas vive con usted?" {...register("numero_personas_vive", { required: true })} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="federal" className="form-label label-form">Federal</label>
                        <label htmlFor="federal_si" className="form-label mx-2">Si
                            <input className="form-check-input" type="radio" id="federal_si" name="federal_option" value={true} {...register("programa_gobierno_federal", { required: true })} onChange={handleRadioFederalChange} />
                        </label>
                        <label className="form-label mx-2">No
                            <input className="form-check-input" type="radio" id="federal_no" name="federal_option" value={false} {...register("programa_gobierno_federal", { required: true })} onChange={handleRadioFederalChange} />
                        </label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        {showCualFederal && (
                            <div>
                                <label htmlFor="cual_programa_federal" className="form-label mx-2">¿Cuál</label>
                                <input className="form-control input-form" type="text" value={inputValueFederal} placeholder="Nombre del programa federal" {...register("cual_programa_federal")} onChange={(e) => setInputValueFederal(e.target.value)} />
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="estatal" className="form-label label-form">Estatal</label>
                        <label className="form-label mx-2" for="estatal_si">Si
                            <input className="form-check-input" type="radio" id="estatal_si" name="estatal_option" value={true} {...register("programa_gobierno_estatal", { required: true })} onChange={handleRadioEstatalChange} />
                        </label>
                        <label className="form-label mx-2" for="estatal_no">No
                            <input className="form-check-input" type="radio" id="estatal_no" name="estatal_option" value={false} {...register("programa_gobierno_estatal", { required: true })} onChange={handleRadioEstatalChange} />
                        </label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        {showCualEstatal && (
                            <div>
                                <label htmlFor="cual_estatal" className="form-label label-form">¿Cuál</label>
                                <input className="form-control input-form" type="text" placeholder="Nombre del programa estatal" value={inputValueEstatal} {...register("cual_programa_estatal")} onChange={(e) => setInputValueEstatal(e.target.value)} />
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="municipal" className="form-label label-form">Municipal</label>
                        <label htmlFor="municipal_si" className="form-label mx-2" for="municipal_si">Si
                            <input className="form-check-input" type="radio" id="municipal_si" name="municipal_option" value={true} {...register("programa_gobierno_municipal", { required: true })} onChange={handleRadioMunicipalChange} />
                        </label>
                        <label htmlFor="municipal_no" className="form-label mx-2" for="municipal_no">No
                            <input className="form-check-input" type="radio" id="municipal_no" name="municipal_option" value={false} {...register("programa_gobierno_municipal", { required: true })} onChange={handleRadioMunicipalChange} />
                        </label>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        {showCualMunicipal && (
                            <div>
                                <label htmlFor="cual_municipal" className="form-label label-form">¿Cuál</label>
                                <input className="form-control input-form" type="text" placeholder="Nombre del programa municipal" value={inputValueMunicipal} {...register("cual_programa_municipal")} onChange={(e) => setInputValueMunicipal(e.target.value)} />
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <button className="btn  btn-danger button-login">Registrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

