import { useState, useEffect } from 'react';
import { Table, Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getMyClasses } from '../../services/coachService';

export default function MyClassesPage() {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const data = await getMyClasses();
      const safeData = data.data || data;
      console.log("DATOS DEL BACKEND:", safeData);
      setClasses(Array.isArray(safeData) ? safeData : []);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar tus clases', 'error');
    }
  };

  useEffect(() => { fetchClasses(); }, []);

  const daysMap = {
    '1': 'Lunes', '2': 'Martes', '3': 'Miércoles', '4': 'Jueves', 
    '5': 'Viernes', '6': 'Sábado', '7': 'Domingo',
    'Lunes': 'Lunes', 'Martes': 'Martes', 'Miercoles': 'Miércoles', 
    'Jueves': 'Jueves', 'Viernes': 'Viernes', 'Sabado': 'Sábado', 'Domingo': 'Domingo'
  };

  // 🚀 EL DETECTOR UNIVERSAL: Busca los inscritos sin importar cómo los llame el backend
  const getEnrolledCount = (obj) => {
    if (!obj) return 0;
    if (obj.enrolled !== undefined && obj.enrolled !== null) return parseInt(obj.enrolled);
    if (Array.isArray(obj.reservations)) return obj.reservations.length;
    if (obj.reservations_count !== undefined) return parseInt(obj.reservations_count);
    if (obj._count && obj._count.reservations) return parseInt(obj._count.reservations);
    return 0; // Si el backend definitivamente no manda nada, muestra 0
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 style={{ color: '#004d40', fontWeight: 'bold' }}>Mis Clases</h2>
        <p className="text-muted">Clases asignadas a tu cargo</p>
      </div>

      {(() => {
        // Usamos el detector para sumar el total general
        const totalEnrolled = classes.reduce((sum, c) => {
          const scheduleObj = (c.schedules && c.schedules.length > 0) ? c.schedules[0] : c;
          return sum + getEnrolledCount(scheduleObj);
        }, 0);

        return (
          <Row className="mb-4">
            <Col md={6}>
              <Card className="shadow-sm border-0 h-100 rounded-3">
                <Card.Body>
                  <h6 className="text-muted text-uppercase mb-2 fw-bold" style={{ fontSize: '12px' }}>Clases a cargo</h6>
                  <h3 className="text-success mb-0 fw-bold">{classes.length}</h3>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="shadow-sm border-0 h-100 rounded-3">
                <Card.Body>
                  <h6 className="text-muted text-uppercase mb-2 fw-bold" style={{ fontSize: '12px' }}>Total Inscritos</h6>
                  <h3 className="text-primary mb-0 fw-bold">{totalEnrolled}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })()}

      <Card className="shadow-sm border-0 rounded-3">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-muted border-0">CLASE</th>
              <th className="text-muted border-0">TIPO</th>
              <th className="text-muted border-0">DÍA</th>
              <th className="text-muted border-0">HORARIO</th>
              <th className="text-muted border-0">CUPOS INSCRITOS</th>
              <th className="text-muted border-0">CAPACIDAD</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(c => {
              const sportName = c.sport?.name || c.sport_name || 'Clase';
              const type = c.sport?.objective || c.objective || 'General';
              const capacity = parseInt(c.room?.capacity || c.capacity || 15);
              
              const scheduleObj = (c.schedules && c.schedules.length > 0) ? c.schedules[0] : c;
              const dayOfWeek = scheduleObj.day_of_week;
              const startTime = scheduleObj.start_time;
              const endTime = scheduleObj.end_time;

              // Usamos el detector para la barra de cada fila individual
              const enrolled = getEnrolledCount(scheduleObj);
              const percentage = capacity > 0 ? (enrolled / capacity) * 100 : 0;

              let variant = "success";
              if (percentage >= 100) variant = "danger";
              else if (percentage > 70) variant = "warning";

              return (
                <tr key={c.id}>
                  <td className="fw-bold">{sportName}</td>
                  <td><Badge bg="light" text="dark" className="border">{type}</Badge></td>
                  <td>{dayOfWeek ? (daysMap[dayOfWeek] || dayOfWeek) : 'Por definir'}</td>
                  <td>
                    {startTime ? startTime.substring(0, 5) : 'Sin horario'} 
                    {endTime ? ` - ${endTime.substring(0, 5)}` : ''}
                  </td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center gap-2">
                      <ProgressBar variant={variant} now={percentage > 100 ? 100 : percentage} style={{ width: '80px', height: '6px' }} />
                      <span className="small text-muted fw-bold">{enrolled}</span>
                    </div>
                  </td>
                  <td className="text-muted">{capacity} personas</td>
                </tr>
              );
            })}
            {classes.length === 0 && (
              <tr><td colSpan="6" className="text-center py-4">No tienes clases asignadas esta semana</td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}