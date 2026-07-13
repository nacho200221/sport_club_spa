import { useState, useEffect } from 'react';
import { Table, Button, Card, Badge } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getMyReservations, cancelReservation } from '../../services/memberService';

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const daysMap = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

  const fetchReservations = async () => {
    try {
      const data = await getMyReservations();
      const safeData = data.data || data;
      setReservations(Array.isArray(safeData) ? safeData : []);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar tus reservas', 'error');
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: '¿Cancelar reserva?',
      text: "Perderás tu cupo en esta clase",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Volver'
    });

    if (result.isConfirmed) {
      try {
        await cancelReservation(id);
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
        Swal.fire('Cancelada', 'Tu reserva ha sido anulada', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo cancelar la reserva', 'error');
      }
    }
  };;

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 style={{ color: '#1565c0', fontWeight: 'bold' }}>Mis Reservas</h2>
        <p className="text-muted">Gestiona tus clases reservadas</p>
      </div>

      <Card className="shadow-sm border-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-muted border-0">CLASE</th>
              <th className="text-muted border-0">COACH</th>
              <th className="text-muted border-0">DÍA</th>
              <th className="text-muted border-0">HORARIO</th>
              <th className="text-muted border-0">ESTADO</th>
              <th className="text-muted border-0">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => {
              const isActive = r.status !== 'cancelled' && r.status !== 'Cancelada' && r.status !== 'cancelada';
              
              return (
                <tr key={r.id}>
                  <td className="fw-bold">{r.sport_name || 'Clase'}</td>
                  <td className="text-muted">{r.coach_name || 'Coach'}</td>
                  <td className="fw-bold">{r.classSchedule ? daysMap[r.classSchedule.day_of_week] : 'Por definir'}
                  </td>
                  <td>{r.classSchedule && r.classSchedule.start_time 
                        ? r.classSchedule.start_time.substring(0, 5) 
                        : 'Por definir'}
                  </td>
                  <td>
                    <Badge bg={isActive ? 'success' : 'secondary'} className="px-3 py-2 rounded-pill">
                      {isActive ? 'Confirmada' : 'Cancelada'}
                    </Badge>
                  </td>
                  <td>
                    {isActive ? (
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleCancel(r.id)}
                      >
                        <i className="bi bi-x-circle me-1"></i> Cancelar
                      </Button>
                    ) : (
                      <span className="text-muted small">Sin acción</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {reservations.length === 0 && (
              <tr><td colSpan="6" className="text-center py-4">Aún no tienes reservas activas</td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}