import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from '../../services/assignmentService';
import { getRooms } from '../../services/roomService';
import { getUsers } from '../../services/userService';
import { API_URL, getHeaders } from '../../services/api';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [sports, setSports] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ sport_id: '', room_id: '', coach_id: '', status: true, observation: 'Asignado' });

  // 1. Cargar las asignaciones para la tabla
  const fetchAssignments = async () => {
    try {
      const data = await getAssignments();
      const assignmentsArray = data.data || data;
      // BLINDAJE: Si no es un array, fuerza un array vacío
      setAssignments(Array.isArray(assignmentsArray) ? assignmentsArray : []);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudieron cargar las asignaciones', 'error');
    }
  };

  // 2. Cargar datos para los Selects del formulario
  const fetchFormData = async () => {
    try {
      const [roomsData, usersData, sportsRes] = await Promise.all([
        getRooms(),
        getUsers(),
        fetch(`${API_URL}/sports`, { headers: getHeaders() }).then(r => r.json())
      ]);
      
      // Blindaje Salas
      const safeRooms = roomsData.data || roomsData;
      setRooms(Array.isArray(safeRooms) ? safeRooms : []);

      // Blindaje Usuarios (Coaches)
      const safeUsers = usersData.data || usersData;
      if (Array.isArray(safeUsers)) {
         setCoaches(safeUsers.filter(u => u.role === 'coach'));
      } else {
         setCoaches([]); // Evita que .filter() rompa la página
      }

      // Blindaje Deportes
      const safeSports = sportsRes.data || sportsRes;
      setSports(Array.isArray(safeSports) ? safeSports : []);

    } catch (err) {
      console.error("Error cargando datos del formulario", err);
    }
  };

  useEffect(() => { 
    fetchAssignments(); 
    fetchFormData();
  }, []);

  const handleShow = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ sport_id: item.sport_id, room_id: item.room_id, coach_id: item.coach_id, status: item.status, observation: item.observation || '' });
    } else {
      setEditingId(null);
      setFormData({ sport_id: '', room_id: '', coach_id: '', status: true, observation: 'Nueva asignación' });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAssignment(editingId, formData);
        Swal.fire('¡Actualizado!', 'Asignación modificada.', 'success');
      } else {
        await createAssignment(formData);
        Swal.fire('¡Creado!', 'Asignación registrada.', 'success');
      }
      fetchAssignments();
      handleClose();
    } catch (error) {
      Swal.fire('Error', 'Faltan datos o hubo un error', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar asignación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await deleteAssignment(id);
        Swal.fire('Eliminado', '', 'success');
        fetchAssignments();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: '#4a148c', fontWeight: 'bold' }}>Asignaciones</h2>
          <p className="text-muted">Relación entre deportes, salas y coaches</p>
        </div>
        <Button variant="primary" style={{ backgroundColor: '#7b1fa2', borderColor: '#7b1fa2' }} onClick={() => handleShow()}>
          + Agregar Asignación
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-muted border-0">ID ASIGNACIÓN</th>
              {/* Le quitamos el (ID) a los títulos */}
              <th className="text-muted border-0">DEPORTE</th>
              <th className="text-muted border-0">SALA</th>
              <th className="text-muted border-0">COACH</th>
              <th className="text-muted border-0">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(a => {
              // Buscamos los nombres cruzando el ID con las listas que ya tienes
              const sportName = sports.find(s => s.id === a.sport_id)?.name || a.sport_id;
              const roomName = rooms.find(r => r.id === a.room_id)?.name || a.room_id;
              const coachName = coaches.find(c => c.id === a.coach_id)?.full_name || a.coach_id;

              return (
                <tr key={a.id}>
                  <td className="fw-bold">{a.id}</td>
                  <td>{sportName}</td>
                  <td>{roomName}</td>
                  <td>{coachName}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(a)}>Editar</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(a.id)}>Eliminar</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#4a148c' }}>{editingId ? 'Editar Asignación' : 'Nueva Asignación'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Deporte</Form.Label>
              <Form.Select required value={formData.sport_id} onChange={e => setFormData({...formData, sport_id: e.target.value})}>
                <option value="">Selecciona un deporte...</option>
                {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sala</Form.Label>
              <Form.Select required value={formData.room_id} onChange={e => setFormData({...formData, room_id: e.target.value})}>
                <option value="">Selecciona una sala...</option>
                {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Coach</Form.Label>
              <Form.Select required value={formData.coach_id} onChange={e => setFormData({...formData, coach_id: e.target.value})}>
                <option value="">Selecciona un entrenador...</option>
                {coaches.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
              </Form.Select>
            </Form.Group>
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