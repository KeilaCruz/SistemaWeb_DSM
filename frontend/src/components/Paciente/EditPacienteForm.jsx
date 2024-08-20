
import { useForm } from "react-hook-form"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import { editarPaciente } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization"
import {
    PDFDownloadLink,
    Document,
    Page,
    Image,
    StyleSheet,
    View,
    Text,
  } from "@react-pdf/renderer";

export function EditPacienteForm({ paciente }) {
    const { register, setValue, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [activateEdit, setActiEdit] = useState(false)

    const [programaFederal, setProgramaFederal] = useState(false);
    const [programaEstatal, setProgramaEstatal] = useState(false);
    const [programaMunicipal, setProgramaMunicipal] = useState(false);

    const [pdfDataURL, setPdfDataURL] = useState(null);

    // Define styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#fff',
        border: '5px solid black',
        position: 'relative', // Necesario para que funcione el posicionamiento absoluto del pie de página
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
  section: {
    marginBottom: 20,  // Aumenta el espacio entre secciones
  },
  header: {
    fontSize: 18,
    marginBottom: 15,  // Aumenta el espacio debajo del encabezado
    fontFamily: 'Times-Roman',
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    marginBottom: 10,  // Aumenta el espacio entre bloques de texto
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
});

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  



  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
      <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Fecha </Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{getCurrentDate()}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Paciente </Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{paciente.datos_personales?.nombre || ''} {paciente.datos_personales?.apePaterno || ''} {paciente.datos_personales?.apeMaterno || ''}</Text></View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>DATOS PERSONALES</Text>            
          <Text style={styles.text}>NOMBRE: {paciente.datos_personales?.nombre || ''}</Text>
          <Text style={styles.text}>APELLIDO PATERNO: {paciente.datos_personales?.apePaterno || ''}</Text>
          <Text style={styles.text}>APELLIDO MATERNO: {paciente.datos_personales?.apeMaterno || ''}</Text>
          <Text style={styles.text}>EDAD: {paciente.datos_personales?.edad || ''}</Text>
          <Text style={styles.text}>ESTADO CIVIL: {paciente.datos_personales?.estado_civil || ''}</Text>
          <Text style={styles.text}>CURP: {paciente.CURP}</Text>
          <Text style={styles.text}>ESCOLARIDAD: {paciente.datos_personales?.escolaridad || ''}</Text>
          <Text style={styles.text}>SEXO: {paciente.datos_personales?.sexo || ''}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>DIRECCIÓN</Text>
          <Text style={styles.text}>COLONIA: {paciente.datos_direccion?.colonia || ''}</Text>
          <Text style={styles.text}>CALLE: {paciente.datos_direccion?.calle || ''}</Text>
          <Text style={styles.text}>NUMERO EXTERIOR: {paciente.datos_direccion?.numero_exterior || ''}</Text>
          <Text style={styles.text}>REFERENCIA: {paciente.datos_direccion?.referencia || ''}</Text>
          <Text style={styles.text}>CÓDIGO POSTAL: {paciente.datos_direccion?.CP || ''}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>CONTACTO</Text>
          <Text style={styles.text}>TELÉFONO: {paciente.datos_contacto?.telefono || ''}</Text>
          <Text style={styles.text}>DERECHOHABIENCIA: {paciente.datos_contacto?.derecho_habiencia || ''}</Text>
          <Text style={styles.text}>UNIDAD DE SALUD:: {paciente.datos_contacto?.unidad_salud || ''}</Text>
          <Text style={styles.text}>ÚLTIMA VISITA AL MÉDICO: {paciente.datos_contacto?.ultima_visita_medico || ''}</Text>
          <Text style={styles.text}>NÚMERO DE PERSONAS CON LAS QUE VIVE: {paciente.datos_contacto?.numero_personas_vive || ''}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>PROGRAMAS DE GOBIERNO</Text>
          <Text style={styles.text}>PARTICIPA EN PROGRAMA FEDERAL: {paciente.otros_datos?.participa_programa_federal ? 'Sí' : 'No'}</Text>
          <Text style={styles.text}>NOMBRE DEL PROGRAMA FEDERAL: {paciente.otros_datos?.nombre_programa_federal || 'Sin nombre'}</Text>
          <Text style={styles.text}>PARTICIPA EN PROGRAMA ESTATAL: {paciente.otros_datos?.participa_programa_estatal ? 'Sí' : 'No'}</Text>
          <Text style={styles.text}>NOMBRE DEL PROGRAMA ESTATAL: {paciente.otros_datos?.nombre_programa_estatal || 'Sin nombre'}</Text>
          <Text style={styles.text}>PARTICIPA EN PROGRAMA MUNICIPAL: {paciente.otros_datos?.participa_programa_municipal ? 'Sí' : 'No'}</Text>
          <Text style={styles.text}>NOMBRE DEL PROGRAMA MUNICIPAL: {paciente.otros_datos?.nombre_programa_municipal || 'Sin nombre'}</Text>
        </View>
        <Text style={styles.footer} render={({ pageNumber, totalPages}) => (`Página ${pageNumber} de ${totalPages}`)} fixed />
      </Page>
    </Document>
  );

  const generatePDF = () => {
    const pdfURL = (
        <PDFDownloadLink document={<MyDocument />} fileName="Datos_Paciente.pdf">
        {({ blob, url, loading, error }) =>
            loading ? "Generando PDF..." : "Descargar PDF"
        }
        </PDFDownloadLink>
    );

    setPdfDataURL(pdfURL);
};
      


    const handleActivateEditar = () => {
        setActiEdit(!activateEdit)
    }

    const handleFederalChange = (evt) => {
        const valor = evt.target.value === "true";
        setProgramaFederal(valor);
        setValue("programa_gobierno_federal", valor);
    }

    const handleEstatalChange = (evt) => {
        const valor = evt.target.value === "true";
        setProgramaEstatal(valor);
        setValue("programa_gobierno_estatal", valor);
    }

    const handleMunicipalChange = (evt) => {
        const valor = evt.target.value === "true";
        setProgramaMunicipal(valor);
        setValue("programa_gobierno_municipal", valor);
    }

    /**Cargar los datos del paciente en las input */
    useEffect(() => {
        async function loadInput() {
            try {
                setValue("nombre", paciente.datos_personales?.nombre || '')
                setValue("apePaterno", paciente.datos_personales?.apePaterno || '')
                setValue("apeMaterno", paciente.datos_personales?.apeMaterno || '')
                setValue("edad", paciente.datos_personales?.edad || '')
                setValue("estado_civil", paciente.datos_personales?.estado_civil || '')
                setValue("CURP", paciente.CURP)
                setValue("escolaridad", paciente.datos_personales?.escolaridad || '')
                setValue("sexo", paciente.datos_personales?.sexo || '')
                setValue("colonia", paciente.datos_direccion?.colonia || '')
                setValue("calle", paciente.datos_direccion?.calle || '')
                setValue("numero_exterior", paciente.datos_direccion?.numero_exterior || '')
                setValue("referencia", paciente.datos_direccion?.referencia || '')
                setValue("CP", paciente.datos_direccion?.CP || '')
                setValue("telefono", paciente.datos_contacto?.telefono || '')
                setValue("derecho_habiencia", paciente.datos_contacto?.derecho_habiencia || '')
                setValue("unidad_salud", paciente.datos_contacto?.unidad_salud || '')
                setValue("ultima_visita_medico", paciente.datos_contacto?.ultima_visita_medico || '')
                setValue("cual_programa_federal", paciente.otros_datos?.nombre_programa_federal || '');
                setValue("cual_programa_estatal", paciente.otros_datos?.nombre_programa_estatal || '');
                setValue("cual_programa_municipal", paciente.otros_datos?.nombre_programa_municipal || '');
                setProgramaFederal(paciente.otros_datos?.participa_programa_federal || false);
                setProgramaEstatal(paciente.otros_datos?.participa_programa_estatal || false);
                setProgramaMunicipal(paciente.otros_datos?.participa_programa_municipal || false);
                setValue("numero_personas_vive", paciente.datos_contacto?.numero_personas_vive || '')
            } catch (error) {
                console.error("error al cargar input", error)
            }
        }
        loadInput();
    }, [paciente])

    /**Funcion para enviar los datos actualizados (editar) */
    const onSubmit = handleSubmit(async (data) => {
        //Para convertir de cadena true or false a boleano

        const pacienteData = {
            CURP: data.CURP,
            "datos_personales": {
                nombre: data.nombre,
                apePaterno: data.apePaterno,
                apeMaterno: data.apeMaterno,
                edad: data.edad,
                estado_civil: data.estado_civil,
                escolaridad: data.escolaridad,
                sexo: data.sexo,
            },
            "datos_direccion": {
                colonia: data.colonia,
                calle: data.calle,
                numero_exterior: data.numero_exterior,
                CP: data.CP,
                referencia: data.referencia,
            },
            "datos_contacto": {
                telefono: data.telefono,
                derecho_habiencia: data.derecho_habiencia,
                unidad_salud: data.unidad_salud,
                ultima_visita_medico: data.ultima_visita_medico,
                numero_personas_vive: data.numero_personas_vive,
            },
            "otros_datos": {
                participa_programa_federal: programaFederal,
                nombre_programa_federal: data.cual_programa_federal,
                participa_programa_estatal: programaEstatal,
                nombre_programa_estatal: data.cual_programa_estatal,
                participa_programa_municipal: programaMunicipal,
                nombre_programa_municipal: data.cual_programa_municipal,
            }
        };
        try {
            await setToken(authTokens.access);
            const response = await editarPaciente(data.CURP, pacienteData);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <>
            <div className="container-fluid">
                <div className="row g-2 mt-1">
                    <div className="col-md-10 offset-md-1 text-center ">
                        <hr />
                        <h3 className="title">FICHA DE IDENTIDAD DEL PACIENTE</h3>
                        <hr />
                    </div>

                    <div className="offset-md-1 col-md-3">
            <button onClick={generatePDF} className=" btn btn-secondary">
              Generar{" "}
              <i
                className="fa-solid fa-file-pdf"
                style={{ fontSize: "30px", color: "red" }}
              ></i>{" "}
            </button>
            {pdfDataURL}
          </div>
                </div>
                <form onSubmit={onSubmit} className="row g-3 align-items-center">
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="CURP" className="form-label label-form">CURP</label>
                        <input id="CURP" className="form-control " type="text" {...register("CURP")} disabled={true} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="nombre" className="form-label label-form">Nombre(s)</label>
                        <input type="text" id="nombre" name="nombre" className="form-control " {...register("nombre")} disabled={true} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apePaterno" className="form-label label-form">Apellido paterno</label>
                        <input type="text" id="apePaterno" name="apePaterno" className="form-control " {...register("apePaterno")} disabled={true} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="apeMaterno" className="form-label label-form">Apellido materno</label>
                        <input type="text" id="apeMaterno" className="form-control " {...register("apeMaterno")} disabled={true} />
                    </div>
                    <div className="col-md-2 offset-md-1">
                        <label htmlFor="estado_civil" className="form-label label-form">Estado civil</label>
                        <select id="estado_civil" className="form-select " {...register("estado_civil")} disabled={!activateEdit}>
                            <option value="" disabled selected>Elija estado civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Divorciado">Divorciado</option>
                        </select>
                    </div>

                    <div className="col-md-2 offset-md-0.6">
                        <label htmlFor="estado_civil" className="form-label label-form">Sexo</label>
                        <select id="estado_civil" className="form-select " {...register("sexo")} disabled={!activateEdit}>
                            <option value="" disabled selected>Elija su sexo</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="no-binario">No Binario</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="escolaridad" className="form-label label-form" >Escolaridad</label>
                        <select name="escolaridad" className="form-select " {...register("escolaridad")} disabled={!activateEdit}>
                            <option value="" disabled selected>Elija estado civil</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Bachillerato">Bachillerato</option>
                            <option value="Divorciado">Universidad</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="colonia" className="form-label label-form">Colonia</label>
                        <input type="text" id="colonia" className="form-control " {...register("colonia")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="calle" className="form-label label-form">Calle</label>
                        <input type="text" id="calle" className="form-control " {...register("calle")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="referencia" className="form-label label-form">Entre calles o referencia</label>
                        <textarea type="text" id="referencia" className="form-control " {...register("referencia")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="telefono" className="form-label label-form">Telefono</label>
                        <input type="text" id="telefono" className="form-control " {...register("telefono")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="derecho_habiencia" className="form-label label-form">Derechohabiencia</label>
                        <input id="derecho_habiencia" className="form-control " {...register("derecho_habiencia")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="georeferencia" className="form-label label-form">Georeferencia</label>
                        <input type="text" id="georeferencia" className="form-control " {...register("unidad_salud")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="ultima_visita_medico" className="form-label label-form">Última visita al médico</label>
                        <input type="date" id="ultima_visita_medico" className="form-control " {...register("ultima_visita_medico")} disabled={!activateEdit} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <label htmlFor="num_persona_vive" className="form-label label-form">Número de personas con la que vive</label>
                        <input type="number" id="num_persona_vive" className="form-control "  {...register("numero_personas_vive")} disabled={!activateEdit}></input>
                    </div>
                    <div className="col-md-10 offset-md-1">
                        <label className="form-label label-form">Es beneficiario de algún programa de gobierno</label>
                    </div>

                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">Federal</label>
                        <label htmlFor="federal_si" className="form-label mx-2">Si
                            <input
                                type="radio" id="federal_si" name="programa_gobierno_federal" value={true} checked={programaFederal} onChange={handleFederalChange}
                                disabled={!activateEdit}
                            />
                        </label>
                        <label htmlFor="federal_no" className="form-label mx-2">No
                            <input
                                type="radio" id="federal_no" name="programa_gobierno_federal" value={false} checked={!programaFederal} onChange={handleFederalChange}
                                disabled={!activateEdit}
                            />
                        </label>
                    </div>

                    {programaFederal && (
                        <div className="col-md-4 offset-md-1">
                            <input type="text" className="form-control " id="programa_federal" {...register("cual_programa_federal")} disabled={!activateEdit} />
                        </div>
                    )}

                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">Estatal</label>
                        <label htmlFor="estatal_si" className="form-label mx-2">Si
                            <input
                                type="radio" id="estatal_si" name="programa_gobierno_estatal" value={true} checked={programaEstatal} onChange={handleEstatalChange}
                                disabled={!activateEdit}
                            />
                        </label>
                        <label htmlFor="estatal_no" className="form-label mx-2">No
                            <input
                                type="radio" id="estatal_no" name="programa_gobierno_estatal" value={false} checked={!programaEstatal} onChange={handleEstatalChange}
                                disabled={!activateEdit}
                            />
                        </label>
                    </div>

                    {programaEstatal && (
                        <div className="col-md-4 offset-md-1">
                            <input className="form-control " type="text" id="programa_estatal" {...register("cual_programa_estatal")} disabled={!activateEdit} />
                        </div>
                    )}

                    <div className="col-md-4 offset-md-1">
                        <label className="form-label label-form">Municipal</label>
                        <label htmlFor="municipal_si" className="form-label mx-2">Si
                            <input
                                type="radio" id="municipal_si" name="programa_gobierno_municipal" value={true} checked={programaMunicipal} onChange={handleMunicipalChange}
                                disabled={!activateEdit}
                            />
                        </label>
                        <label htmlFor="municipal_no" className="form-label mx-2">No
                            <input
                                type="radio" id="municipal_no" name="programa_gobierno_municipal" value={false} checked={!programaMunicipal} onChange={handleMunicipalChange}
                                disabled={!activateEdit}
                            />
                        </label>
                    </div>

                    {programaMunicipal && (
                        <div className="col-md-4 offset-md-1">
                            <input className="form-control " type="text" id="programa_municipal" {...register("cual_programa_municipal")} disabled={!activateEdit} />
                        </div>
                    )}

                    {activateEdit && (
                        <div className="col-md-9 offset-md-1">
                            <button className="button-guardar btn rounded">Guardar</button>
                        </div>
                    )}
                </form>
                <div className="col-md-4 offset-md-1 mt-2">
                    <button type="button" className="rounded mb-2 btn button-editar" onClick={handleActivateEditar}>Editar</button>
                </div>
            </div>
        </>
    )
}

