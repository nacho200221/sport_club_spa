import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Card, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../../services/roomService';
// Importa tu Layout morado aquí si lo tienes separado

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', capacity: '', location: '', status: true
  });

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      // LA CORRECCIÓN ESTÁ EN ESTA LÍNEA:
      setRooms(data.data || data); 
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las salas', 'error');
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleShow = (room = null) => {
    if (room) {
      setEditingId(room.id);
      setFormData(room);
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', capacity: '', location: '', status: true });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRoom(editingId, formData);
        Swal.fire('¡Actualizado!', 'La sala ha sido modificada.', 'success');
      } else {
        await createRoom(formData);
        Swal.fire('¡Creado!', 'La sala ha sido registrada.', 'success');
      }
      fetchRooms(); // Actualización automática
      handleClose();
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un problema al guardar', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteRoom(id);
        Swal.fire('¡Eliminado!', 'La sala ha sido borrada.', 'success');
        fetchRooms();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la sala', 'error');
      }
    }
  };

  // Contadores para tus tarjetas
  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((acc, room) => acc + (parseInt(room.capacity) || 0), 0);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: '#4a148c', fontWeight: 'bold' }}>Gestión de Salas</h2>
          <p className="text-muted">Instalaciones disponibles en el gimnasio</p>
        </div>
        <Button variant="primary" style={{ backgroundColor: '#7b1fa2', borderColor: '#7b1fa2' }} onClick={() => handleShow()}>
          + Agregar Sala
        </Button>
      </div>

      {/* Tarjetas de estadísticas (mockup) */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted text-uppercase mb-2">Salas Totales</h6>
              <h3 style={{ color: '#7b1fa2', fontWeight: 'bold' }}>{totalRooms}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted text-uppercase mb-2">Capacidad Total</h6>
              <h3 style={{ color: '#1976d2', fontWeight: 'bold' }}>{totalCapacity}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabla principal */}
      <Card className="shadow-sm border-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-muted font-weight-normal border-0">SALA</th>
              <th className="text-muted font-weight-normal border-0">DESCRIPCIÓN</th>
              <th className="text-muted font-weight-normal border-0">CAPACIDAD</th>
              <th className="text-muted font-weight-normal border-0">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td className="fw-bold">{room.name}</td>
                <td className="text-muted">{room.description}</td>
                <td><i className="bi bi-people"></i> {room.capacity} personas</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(room)}>Editar</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(room.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
            {rooms.length === 0 && (
              <tr><td colSpan="4" className="text-center py-4">No hay salas registradas</td></tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal Reutilizable (Crear/Editar) */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#4a148c' }}>{editingId ? 'Editar Sala' : 'Agregar Sala'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Sala</Form.Label>
              <Form.Control required type="text" placeholder="Ej. Sala A" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control required type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Capacidad (personas)</Form.Label>
                  <Form.Control required type="number" min="1" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ubicación</Form.Label>
                  <Form.Control required type="text" placeholder="Ej. Piso 1" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit" style={{ backgroundColor: '#7b1fa2', borderColor: '#7b1fa2' }}>Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}