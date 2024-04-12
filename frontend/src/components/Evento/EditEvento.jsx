import { useForm } from "react-hook-form"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import { editarEvento } from "../../services/Recepcionista"
import { setToken } from "../../services/HeaderAuthorization"


export function EditEvento({evento}) {
    const { register, setValue, handleSubmit } = useForm()
    const { authTokens } = useContext(AuthContext)
    const [activateEdit, setActiEdit] = useState(false)


    const handleActivateEditar = () => {
      setActiEdit(!activateEdit)
      
  }

    useEffect(() => {
        async function loadInput (){
          try {
            setValue("fecha", evento?.datos_evento.fecha || '');
            setValue("hora", evento?.datos_evento.hora || '');
            setValue("lugar", evento?.datos_evento.lugar || '');
            setValue("descripcion", evento?.datos_evento.descripcion || '');
            setValue("nom_evento", evento?.datos_evento.nom_evento || '');


        } catch (error) {
            console.error("error al cargar input", error)
        }
      }
      loadInput();
  
    }, [evento])

    const onSubmit = handleSubmit(async (data) => {

        const eventoData = {
            "datos_evento" : {
                fecha : data.fecha,
                hora : data.hora,
                lugar : data.lugar,
                descripcion : data.descripcion,
                nom_evento : data.nom_evento

            },
            idUsuario : evento.idUsuario,
        }

        try {
            await setToken(authTokens.access)
            const response = await editarEvento(evento.idEvento, eventoData)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    })

  return (
    <>
        <div className="container-fluid pb-4">
        <div className="row g-3 ">
          <div className="col-md-10 offset-md-1 text-center ">
            <hr />
            <h3 className="title">CREAR EVENTO</h3>
            <hr />
          </div>
          

          

          <form className="row g-3" onSubmit={onSubmit}>

          
            <div className="col-md-9 offset-md-1">
              <label htmlFor="nom_evento" className="form-label">
                Nombre del evento:
              </label>
              <input
                type="text"
                id="nom_evento"
                name="nom_evento"
                className="form-control"
                placeholder="Nombre del Evento"
                {...register("nom_evento", { required: true })}
                disabled={!activateEdit}
              />
            </div>

            <div className="col-md-2 offset-md-1">
              <label htmlFor="fecha" className="form-label">
                Fecha del evento:
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                {...register("fecha", { required: true })}
                disabled={!activateEdit}
                className="form-control"
              />
            </div>

            <div className="col-md-2 offset-md-1">
              <label htmlFor="hora" className="form-label">
                Hora del evento:
              </label>
              <input
                type="time"
                id="hora"
                name="hora"
                {...register("hora", { required: true })}
                disabled={!activateEdit}
                className="form-control"
              />
            </div>

            <div className="col-md-9 offset-md-1">
              <label htmlFor="ubicacion" className="form-label">
                Lugar del evento:
              </label>
              <input
                type="text"
                placeholder="Lugar"
                id="ubicacion"
                name="Ubicación"
                {...register("lugar", { required: true })}
                disabled={!activateEdit}
                className="form-control"
              />
            </div>

            <div className="col-md-9 offset-md-1">
              <label htmlFor="descripcion" className="form-label">
                Descripcion del evento:
              </label>
              <textarea
                placeholder="Deescipción del evento"
                id="descripcion"
                name="descripcion"
                {...register("descripcion", { required: false })}
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
      </div>
    </>
  )
}

