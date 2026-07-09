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
      setClasses(Array.isArray(safeData) ? safeData : []);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar tus clases', 'error');
    }
  };

  useEffect(() => { fetchClasses(); }, []);

  // Matemáticas para los contadores superiores
  const totalClasses = classes.length;
  const totalEnrolled = classes.reduce((acc, c) => acc + (parseInt(c.enrolled || 0)), 0);
  const totalCapacity = classes.reduce((acc, c) => acc + (parseInt(c.capacity || 0)), 0);
  const availableSpots = totalCapacity - totalEnrolled;

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 style={{ color: '#00695c', fontWeight: 'bold' }}>Mis Clases</h2>
        <p className="text-muted">Clases asignadas a tu cargo</p>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted text-uppercase mb-2">Clases a cargo</h6>
              <h3 style={{ color: '#00897b', fontWeight: 'bold' }}>{totalClasses}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted text-uppercase mb-2">Total Inscritos</h6>
              <h3 style={{ color: '#1e88e5', fontWeight: 'bold' }}>{totalEnrolled}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted text-uppercase mb-2">Cupos Disponibles</h6>
              <h3 style={{ color: '#fb8c00', fontWeight: 'bold' }}>{availableSpots}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0">
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
              const enrolled = c.enrolled || 0;
              const capacity = c.capacity || 1; // Para evitar que se rompa al dividir por 0
              const percentage = (enrolled / capacity) * 100;
              
              // Colores condicionales de la barra según si está llena o vacía
              let variant = "success";
              if (percentage > 85) variant = "danger";
              else if (percentage > 50) variant = "warning";

              return (
                <tr key={c.id}>
                  <td className="fw-bold">{c.sport_name || 'Clase'}</td>
                  <td><Badge bg="light" text="dark" className="border">{c.objective || 'General'}</Badge></td>
                  <td>{c.day_of_week || 'Día'}</td>
                  <td>
                    {c.start_time ? c.start_time.substring(0, 5) : ''} - {c.end_time ? c.end_time.substring(0, 5) : ''}
                  </td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center gap-2">
                      <ProgressBar variant={variant} now={percentage} style={{ width: '80px', height: '6px' }} />
                      <span className="small text-muted">{enrolled}</span>
                    </div>
                  </td>
                  <td className="text-muted">{c.capacity || 0} personas</td>
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