import { useState } from "react"

export function FormPaciente({ onSubmit, register, errors }) {
    const [showCualEstatal, setShowEstatal] = useState(false)
    const [showCualFederal, setShowFederal] = useState(false)
    const [showCualMunicipal, setShowMunicipal] = useState(false)

    //activar campo para ingresar nombre de programa en el cuál es beneficiario
    const handleFederal = (evt) => {
        let valor = evt.target.value === 'true'
        if (valor) {
            setShowFederal(true)
        } else {
            setShowFederal(false)
        }
    }
    const handleEstatal = (evt) => {
        let valor = evt.target.value === 'true'
        if (valor) {
            setShowEstatal(true)
        } else {
            setShowEstatal(false)
        }
    }
    const handleMunicipal = (evt) => {
        let valor = evt.target.value === 'true'
        if (valor) {
            setShowMunicipal(true)
        } else {
            setShowMunicipal(false)
        }
    }

    return (
        <>
            <div className="container-fluid pb-5">
                <div className="row g-2">
                    <div className="col-md-10 offset-md-1 text-center ">
                        <hr />
                        <h3 className="title">FICHA DE IDENTIDAD DEL PACIENTE</h3>
                        <hr />
                    </div>
                </div>

                <form onSubmit={onSubmit} className="row g-3 align-items-center">
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="Nombre" className="form-label label-form">Nombres(s)</label>
                        <input id="Nombre" className="form-control input-form" type="text" placeholder="Nombre" {...register("nombre", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]$/ })} />
                        {errors.nombre?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.nombre?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apePaterno" className="form-label label-form">Apellido paterno</label>
                        <input className="form-control input-form" type="text" placeholder="Apellido paterno" {...register("apePaterno", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]$/ })} />
                        {errors.apePaterno?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.apePaterno?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apeMaterno" className="form-label label-form" >Apellido materno</label>
                        <input className="form-control input-form" type="text" placeholder="Apellido materno" {...register("apeMaterno", { required: true, pattern: /^[A-Za-z ÁÉÍÓÚáéíóú]$/ })} />
                        {errors.apeMaterno?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.apeMaterno?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="edad" className="form-label label-form" >Edad</label>
                        <input className="form-control input-form" type="number" placeholder="Edad" {...register("edad", { required: true })} />
                        {errors.edad?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.edad?.type === "valueAsNumber" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-2 offset-md-0.6">
                        <label htmlFor="estado_civil" className="form-label label-form" >Estado civil</label>
                        <select className="form-select input-form" name="estado_civil" {...register("estado_civil", { required: true })}>
                            <option value="" disabled selected>Elija estado civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Divorciado">Divorciado</option>
                        </select>
                        {errors.estado_civil?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="curp" className="form-label label-form">CURP</label>
                        <input className="form-control input-form" type="text" placeholder="CURP" {...register("CURP", { required: true, pattern: /^[A-Z]{1,4}\d{1,6}[A-Z]{1,7}\d{1}$/ })} />
                        {errors.CURP?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.CURP?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="escolaridad" className="form-label label-form">Escolaridad</label>
                        <select className="form-select input-form" name="escolaridad" {...register("escolaridad", { required: true })}>
                            <option value="" disabled selected>Elija escolaridad</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Bachillerato">Bachillerato</option>
                            <option value="Divorciado">Universidad</option>
                        </select>
                        {errors.escolaridad?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>

                    <div className="col-md-2 offset-md-0.6">
                        <label htmlFor="escolaridad" className="form-label label-form">Sexo</label>
                        <select className="form-select input-form" name="escolaridad" {...register("sexo", { required: true })}>
                            <option value="" disabled selected>Elija su sexo</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="no-binario">No Binario</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.sexo?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>

                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="colonia" className="form-label label-form" >Colonia</label>
                        <input className="form-control input-form" type="text" placeholder="Colonia" {...register("colonia", { required: true, pattern: /^[A-Za-z .#,ÁÉÍÓÚáéíóú\d]$/ })} />
                        {errors.colonia?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.colonia?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form" >Calle</label>
                        <input className="form-control input-form" type="text" placeholder="Calle" {...register("calle", { required: true, pattern: /^[A-Za-z .#,ÁÉÍÓÚáéíóú\d]$/ })} />
                        {errors.calle?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.calle?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="numero_exterior" className="form-label label-form" >Número exterior</label>
                        <input className="form-control input-form" type="number" placeholder="Número" {...register("numero_exterior", { required: true })} />
                        {errors.numero_exterior?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.numero_exterior?.type === "valueAsNumber" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-2 offset-md-0.8">
                        <label htmlFor="cp" className="form-label label-form" >CP</label>
                        <input className="form-control input-form" type="number" placeholder="CP" {...register("CP", { required: true })} />
                        {errors.CP?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.CP?.type === "valueAsNumber" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="referencia" className="form-label label-form" >Entre que calles o referencia</label>
                        <textarea className="form-control input-form" placeholder="Entre calles o referencia" {...register("referencia", { required: true, pattern: /^[A-Za-z .#,ÁÉÍÓÚáéíóú\d]$/ })}></textarea>
                        {errors.referencia?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.referencia?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="telefono" className="form-label label-form" >Teléfono</label>
                        <input className="form-control input-form" type="text" placeholder="Telefono" {...register("telefono", { required: true, pattern: /^\d{1,10}$/ })} />
                        {errors.telefono?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.telefono?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
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
                        {errors.derecho_habiencia?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="unidad_salud" className="form-label label-form" >Unidad de salud</label>
                        <input className="form-control input-form" type="text" placeholder="Unidad de salud" {...register("unidad_salud", { required: true, pattern: /^[A-Za-z .#,ÁÉÍÓÚáéíóú\d]$/ })} />
                        {errors.unidad_salud?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.unidad_salud?.type === "pattern" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form" >Última visita al médico</label>
                        <input className="form-control input-form" type="date" placeholder="Ultima visita con su medico" {...register("ultima_visita_medico", { required: true })} />
                        {errors.ultima_visita_medico?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="num_persona_vive" className="form-label label-form">Número de personas con la que vive</label>
                        <input className="form-control input-form" type="number" placeholder="¿Cuantas personas vive con usted?" {...register("numero_personas_vive", { required: true })} />
                        {errors.numero_personas_vive?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                        {errors.numero_personas_vive?.type === "valueAsNumber" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Formato incorrecto</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="federal" className="form-label label-form">Federal</label>
                        <label htmlFor="federal_si" className="form-label mx-2">Si
                            <input className="form-check-input" type="radio" id="federal_si" name="federal_option" value={true} {...register("programa_gobierno_federal", { required: true })} onChange={handleFederal} />
                        </label>
                        <label className="form-label mx-2">No
                            <input className="form-check-input" type="radio" id="federal_no" name="federal_option" value={false} {...register("programa_gobierno_federal", { required: true })} onChange={handleFederal} />
                        </label>
                        {errors.programa_gobierno_federal?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        {showCualFederal && (
                            <div>
                                <label htmlFor="cual_federal" className="form-label label-form">¿Cuál?</label>
                                <input className="form-control input-form" type="text" placeholder="Nombre del programa federal" {...register("cual_programa_federal")}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="estatal" className="form-label label-form">Estatal</label>
                        <label className="form-label mx-2" for="estatal_si">Si
                            <input className="form-check-input" type="radio" id="estatal_si" name="estatal_option" value={true} {...register("programa_gobierno_estatal", { required: true })} onChange={handleEstatal} />
                        </label>
                        <label className="form-label mx-2" for="estatal_no">No
                            <input className="form-check-input" type="radio" id="estatal_no" name="estatal_option" value={false} {...register("programa_gobierno_estatal", { required: true })} onChange={handleEstatal} />
                        </label>
                        {errors.programa_gobierno_estatal?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        {showCualEstatal && (
                            <div>
                                <label htmlFor="cual_estatal" className="form-label label-form">¿Cuál??</label>
                                <input className="form-control input-form" type="text" placeholder="Nombre del programa estatal" {...register("cual_programa_estatal")}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="municipal" className="form-label label-form">Municipal</label>
                        <label htmlFor="municipal_si" className="form-label mx-2" for="municipal_si">Si
                            <input className="form-check-input" type="radio" id="municipal_si" name="municipal_option" value={true} {...register("programa_gobierno_municipal", { required: true })} onChange={handleMunicipal} />
                        </label>
                        <label htmlFor="municipal_no" className="form-label mx-2" for="municipal_no">No
                            <input className="form-check-input" type="radio" id="municipal_no" name="municipal_option" value={false} {...register("programa_gobierno_municipal", { required: true })} onChange={handleMunicipal} />
                        </label>
                        {errors.programa_gobierno_municipal?.type === "required" &&
                            (
                                <p className="mt-2 mb-2 text-informativo"> <i class="lni lni-warning"></i> Ingrese el campo</p>
                            )
                        }
                    </div>
                    <div className="col-md-4 offset-md-1">
                        {showCualMunicipal && (
                            <div>
                                <label htmlFor="cual_municipal" className="form-label label-form">¿Cuál?</label>
                                <input className="form-control input-form" type="text" placeholder="Nombre del programa municipal" {...register("cual_programa_municipal")} />
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <button className="button-guardar rounded">Registrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}