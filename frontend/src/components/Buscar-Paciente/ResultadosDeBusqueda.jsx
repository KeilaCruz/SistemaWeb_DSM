
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function ResultadosDeBusqueda({ resultado }) {
  
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const fullName = `${resultado.datos_personales.nombre} ${resultado.datos_personales.apePaterno} ${resultado.datos_personales.apeMaterno}`;

  return (
    <div>
      <div className="resultado-busqueda" onClick={handleShow}>
        {fullName}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Fecha de registro: {resultado.fecha_registro}</p>
          <p>Edad: {resultado.datos_personales.edad}</p>
          <p>CURP: {resultado.CURP}</p>
          <p>Telefono {resultado.datos_contacto.telefono}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
                   
        </Modal.Footer>
      </Modal>
    </div>
  );
}
