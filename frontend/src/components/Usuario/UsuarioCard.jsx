export function UsuarioCard({ usuario, handleSelect }) {
    const selectUsuario = () => {
        handleSelect(usuario.id);
    };
    return (
        <>
            <div className="card" key={usuario.id} style={{ width: "70rem" }}>
                <div className="card-body cards">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <p className="card-text">{usuario.id}</p>
                                <p className="card-text">{usuario.first_name} {usuario.last_name} {usuario.second_last_name}</p>
                                <p className="card-text">{usuario.email}</p>
                            </div>
                            <div className="col-md-4">
                                <input type="checkbox" id="usuario seleccionado_seleccionado" onChange={selectUsuario} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
