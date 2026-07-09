import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../../services/scheduleService';
import { getAssignments } from '../../services/assignmentService'; 

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    sport_room_id: '',
    day_of_week: '1',
    start_time: '',
    end_time: '',
    status: true
  });

  const daysMap = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

  const fetchAllData = async () => {
    try {
      const [schedData, assignData] = await Promise.all([
        getSchedules(),
        getAssignments()
      ]);
      // Blindaje de datos aplicado
      setSchedules(schedData.data || schedData);
      setAssignments(assignData.data || assignData);
    } catch (error) {
      Swal.fire('Error', 'Fallo al cargar datos', 'error');
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  const handleShow = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        sport_room_id: item.sport_room_id,
        day_of_week: item.day_of_week,
        start_time: item.start_time,
        end_time: item.end_time,
        status: item.status
      });
    } else {
      setEditingId(null);
      setFormData({ sport_room_id: '', day_of_week: '1', start_time: '', end_time: '', status: true });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSchedule(editingId, formData);
        Swal.fire('¡Actualizado!', 'Horario modificado.', 'success');
      } else {
        await createSchedule(formData);
        Swal.fire('¡Creado!', 'Horario registrado.', 'success');
      }
      fetchAllData();
      handleClose();
    } catch (error) {
      Swal.fire('Error', 'Verifica que las horas sean correctas', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar horario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await deleteSchedule(id);
        Swal.fire('Eliminado', '', 'success');
        fetchAllData();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: '#4a148c', fontWeight: 'bold' }}>Horarios de Clases</h2>
          <p className="text-muted">Programación semanal de asignaciones</p>
        </div>
        <Button variant="primary" style={{ backgroundColor: '#7b1fa2', borderColor: '#7b1fa2' }} onClick={() => handleShow()}>
          + Agregar Horario
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-muted border-0">DÍA</th>
              <th className="text-muted border-0">INICIO</th>
              <th className="text-muted border-0">FIN</th>
              <th className="text-muted border-0">ID ASIGNACIÓN</th>
              <th className="text-muted border-0">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(s => (
              <tr key={s.id}>
                <td className="fw-bold">{daysMap[s.day_of_week] || s.day_of_week}</td>
                <td>{s.start_time ? s.start_time.substring(0, 5) : ''}</td>
                <td>{s.end_time ? s.end_time.substring(0, 5) : ''}</td>
                <td>{s.sport_room_id}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(s)}>Editar</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(s.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#4a148c' }}>{editingId ? 'Editar Horario' : 'Nuevo Horario'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Asignación (Deporte/Sala/Coach)</Form.Label>
              <Form.Select required value={formData.sport_room_id} onChange={e => setFormData({...formData, sport_room_id: e.target.value})}>
                <option value="">Selecciona la asignación base...</option>
                {assignments.map(a => (
                  <option key={a.id} value={a.id}>
                    ID: {a.id} - Deporte: {a.sport_id} | Sala: {a.room_id}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Día de la semana</Form.Label>
              <Form.Select required value={formData.day_of_week} onChange={e => setFormData({...formData, day_of_week: e.target.value})}>
                {Object.entries(daysMap).map(([num, name]) => (
                  <option key={num} value={num}>{name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-3 mb-3">
              <Form.Group className="w-50">
                <Form.Label>Hora Inicio</Form.Label>
                <Form.Control required type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} />
              </Form.Group>
              <Form.Group className="w-50">
                <Form.Label>Hora Fin</Form.Label>
                <Form.Control required type="time" value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})} />
              </Form.Group>
            </div>
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