import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <div className="mb-4 border-bottom pb-3">
        <h2 style={{ color: '#4a148c', fontWeight: 'bold' }}>Panel de Administración</h2>
        <p className="text-muted mb-0">Selecciona el módulo que deseas configurar en el sistema.</p>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card 
            className="border-0 shadow-sm h-100 rounded-4" 
            style={{ border: '1px solid #f0f0f0', cursor: 'pointer', transition: '0.3s' }}
            onClick={() => navigate('/admin/rooms')}
          >
            <Card.Body className="p-4">
              <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ backgroundColor: '#f3e5f5', color: '#4a148c' }}>
                <i className="bi bi-geo-alt fs-4"></i>
              </div>
              <h5 className="fw-bold">Espacios y Salas</h5>
              <p className="text-muted small mb-0">Agrega nuevos recintos físicos y define su capacidad máxima.</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card 
            className="border-0 shadow-sm h-100 rounded-4" 
            style={{ border: '1px solid #f0f0f0', cursor: 'pointer', transition: '0.3s' }}
            onClick={() => navigate('/admin/assignments')}
          >
            <Card.Body className="p-4">
              <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ backgroundColor: '#f3e5f5', color: '#4a148c' }}>
                <i className="bi bi-link-45deg fs-4"></i>
              </div>
              <h5 className="fw-bold">Vincular Entrenadores</h5>
              <p className="text-muted small mb-0">Asigna un coach y una sala a una disciplina deportiva específica.</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card 
            className="border-0 shadow-sm h-100 rounded-4" 
            style={{ border: '1px solid #f0f0f0', cursor: 'pointer', transition: '0.3s' }}
            onClick={() => navigate('/admin/schedules')}
          >
            <Card.Body className="p-4">
              <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ backgroundColor: '#f3e5f5', color: '#4a148c' }}>
                <i className="bi bi-calendar-check fs-4"></i>
              </div>
              <h5 className="fw-bold">Programar Horarios</h5>
              <p className="text-muted small mb-0">Define los días y horas para habilitar las reservas online.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}