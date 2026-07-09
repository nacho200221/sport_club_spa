import { useState, useEffect } from 'react';
import { Table, Button, Card, Badge } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getAvailableClasses, createReservation } from '../../services/memberService';

export default function AvailableClassesPage() {
  const [classes, setClasses] = useState([]);
  const daysMap = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

  const fetchClasses = async () => {
    try {
      const data = await getAvailableClasses();
      const safeData = data.data || data;
      setClasses(Array.isArray(safeData) ? safeData : []);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las clases', 'error');
    }
  };

  useEffect(() => { fetchClasses(); }, []);

  const handleReserve = async (classScheduleId) => {
    const confirm = await Swal.fire({
      title: '¿Confirmar reserva?',
      text: "Te inscribirás en esta clase",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1565c0',
      confirmButtonText: 'Sí, reservar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        await createReservation(classScheduleId);
        Swal.fire('¡Éxito!', 'Tu reserva ha sido confirmada', 'success');
        fetchClasses(); // Recarga para actualizar los cupos
      } catch (error) {
        Swal.fire('Error', error.message || 'No se pudo completar la reserva', 'error');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: '#1565c0', fontWeight: 'bold' }}>Clases Disponibles</h2>
          <p className="text-muted">Explora y reserva las clases de esta semana</p>
        </div>
      </div>

      <Card className="shadow-sm border-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-muted border-0">CLASE</th>
              <th className="text-muted border-0">TIPO</th>
              <th className="text-muted border-0">COACH</th>
              <th className="text-muted border-0">DÍA</th>
              <th className="text-muted border-0">HORARIO</th>
              <th className="text-muted border-0">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(c => {
              const enrolled = c.enrolled || 0;
              const capacity = c.capacity || 1;
              const isFull = enrolled >= capacity;

              return (
                <tr key={c.id}>
                  <td className="fw-bold">{c.sport_name || 'Clase'}</td>
                  <td><Badge bg="light" text="dark" className="border">{c.objective || 'General'}</Badge></td>
                  <td>{c.coach_name || 'Por asignar'}</td>
                  <td className="fw-bold">{daysMap[c.day_of_week] || c.day_of_week}</td>
                  <td>{c.start_time ? c.start_time.substring(0, 5) : ''}</td>
                  <td>
                    <Button 
                      variant={isFull ? "secondary" : "primary"} 
                      size="sm" 
                      style={!isFull ? { backgroundColor: '#1565c0', borderColor: '#1565c0' } : {}}
                      disabled={isFull}
                      onClick={() => handleReserve(c.id)}
                    >
                      {isFull ? 'Lleno' : 'Reservar'}
                    </Button>
                  </td>
                </tr>
              );
            })}
            {classes.length === 0 && (
              <tr><td colSpan="6" className="text-center py-4">No hay clases disponibles en este momento</td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}