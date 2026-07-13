import { useState, useEffect } from 'react';
import { Table, Card, Badge } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getMySchedules } from '../../services/coachService';

export default function MySchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const daysMap = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

  const fetchSchedules = async () => {
    try {
      const data = await getMySchedules();
      const safeData = data.data || data;
      setSchedules(Array.isArray(safeData) ? safeData : []);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar tu horario', 'error');
    }
  };

  useEffect(() => { fetchSchedules(); }, []);

  const totalSessions = schedules.length;

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 style={{ color: '#00695c', fontWeight: 'bold' }}>Mi Horario</h2>
        <p className="text-muted">Distribución semanal de tus clases</p>
      </div>

      <Card className="shadow-sm border-0 mb-4 w-25">
        <Card.Body>
          <h6 className="text-muted text-uppercase mb-2">Sesiones esta semana</h6>
          <h3 style={{ color: '#00897b', fontWeight: 'bold' }}>{totalSessions}</h3>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-muted border-0">DÍA</th>
              <th className="text-muted border-0">INICIO</th>
              <th className="text-muted border-0">FIN</th>
              <th className="text-muted border-0">CLASE</th>
              <th className="text-muted border-0">SALA</th>
              <th className="text-muted border-0">ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(s => {
              // Escudo: Extraemos los datos cruzados
              const sportName = s.sportRoom?.sport?.name || s.sport_name || 'Clase';
              const roomName = s.sportRoom?.room?.name || s.room_name || 'Sala';
              const capacity = s.sportRoom?.room?.capacity || s.capacity || 15;
              const enrolled = s.enrolled || 0;
              const percentage = (enrolled / capacity) * 100;
              
              let statusText = "Disponible";
              let statusBg = "success";
              if (percentage >= 100) { statusText = "Lleno"; statusBg = "danger"; }
              else if (percentage > 70) { statusText = "Moderado"; statusBg = "warning"; }

              return (
                <tr key={s.id}>
                  <td className="fw-bold">{daysMap ? daysMap[s.day_of_week] : s.day_of_week}</td>
                  <td>{s.start_time ? s.start_time.substring(0, 5) : ''}</td>
                  <td>{s.end_time ? s.end_time.substring(0, 5) : ''}</td>
                  <td className="fw-bold text-primary">{sportName}</td>
                  <td>{roomName}</td>
                  <td><Badge bg={statusBg}>{statusText}</Badge></td>
                </tr>
              );
            })}
            {schedules.length === 0 && (
              <tr><td colSpan="6" className="text-center py-4">No hay horarios programados</td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}