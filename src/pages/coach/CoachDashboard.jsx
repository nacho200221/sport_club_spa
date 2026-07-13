import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CoachDashboard() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <div className="mb-4 border-bottom pb-3">
        <h2 style={{ color: '#004d40', fontWeight: 'bold' }}>Panel de Entrenador</h2>
        <p className="text-muted mb-0">Centro de gestión rápida para tus clases y horarios asignados.</p>
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card 
            className="border-0 shadow-sm h-100 rounded-4" 
            style={{ border: '1px solid #f0f0f0', cursor: 'pointer', transition: '0.3s' }}
            onClick={() => navigate('/coach/classes')}
          >
            <Card.Body className="p-4">
              <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ backgroundColor: '#e0f2f1', color: '#004d40' }}>
                <i className="bi bi-people fs-4"></i>
              </div>
              <h5 className="fw-bold">Control de Alumnos</h5>
              <p className="text-muted small mb-0">Revisa la lista de inscritos y monitorea el aforo máximo de cada una de tus sesiones deportivas.</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card 
            className="border-0 shadow-sm h-100 rounded-4" 
            style={{ border: '1px solid #f0f0f0', cursor: 'pointer', transition: '0.3s' }}
            onClick={() => navigate('/coach/schedules')}
          >
            <Card.Body className="p-4">
              <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ backgroundColor: '#e0f2f1', color: '#004d40' }}>
                <i className="bi bi-clock-history fs-4"></i>
              </div>
              <h5 className="fw-bold">Mi Calendario</h5>
              <p className="text-muted small mb-0">Consulta los días y bloques horarios en los que la administración ha programado tus clases de la semana.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}