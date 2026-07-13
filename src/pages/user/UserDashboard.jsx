import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-5 pb-5 border-bottom">
        <Col lg={6} className="mb-5 mb-lg-0 pe-lg-5">
          <h6 className="fw-bold text-uppercase small mb-3" style={{ color: '#1565c0', letterSpacing: '1px' }}>
            SOBRE NOSOTROS
          </h6>
          <h1 className="fw-bold mb-4" style={{ color: '#1a1a1a' }}>Un gimnasio pensado para ti</h1>
          <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            SportClub nació con la misión de hacer del entrenamiento una experiencia accesible y motivadora. 
            Prepárate para dar lo mejor de ti hoy y alcanzar tus metas con nosotros.
          </p>
          <ul className="list-unstyled text-muted mb-5">
            <li className="mb-3"><i className="bi bi-check-circle text-primary me-2 fs-5"></i> Zonas optimizadas para divisiones de entrenamiento Upper/Lower</li>
            <li className="mb-3"><i className="bi bi-check-circle text-primary me-2 fs-5"></i> Flota de bicicletas estáticas y máquinas de última generación</li>
            <li className="mb-3"><i className="bi bi-check-circle text-primary me-2 fs-5"></i> App y reservas online 24/7</li>
          </ul>
          <Button 
            variant="primary" 
            size="lg" 
            className="px-5 py-3 fw-bold rounded-3 shadow-sm" 
            style={{ backgroundColor: '#1565c0', borderColor: '#1565c0' }} 
            onClick={() => navigate('/user/classes')}
          >
            Ver Clases de Hoy
          </Button>
        </Col>
        <Col lg={6}>
          <div className="position-relative">

            <div 
              className="rounded-4 shadow-lg w-100" 
              style={{ height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(30%)' }}
            ></div>

            <div 
              className="position-absolute p-4 rounded-4 shadow-lg text-center" 
              style={{ bottom: '-20px', left: '-20px', backgroundColor: '#1565c0', color: 'white', width: '140px' }}
            >
              <h2 className="fw-bold mb-0">+8</h2>
              <small className="fw-medium">años de<br/>experiencia</small>
            </div>
          </div>
        </Col>
      </Row>

      <div className="text-center mb-5 pt-4">
        <h6 className="fw-bold text-uppercase small mb-3" style={{ color: '#1565c0', letterSpacing: '1px' }}>
          LO QUE OFRECEMOS
        </h6>
        <h2 className="fw-bold mb-3" style={{ color: '#1a1a1a' }}>Todo lo que necesitas para entrenar</h2>
        <p className="text-muted">Diseñamos cada espacio y programa pensando en tu progreso y bienestar.</p>
      </div>

      <Row className="g-4 mb-5 pb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 rounded-4" style={{ border: '1px solid #f0f0f0' }}>
            <Card.Body className="p-4 p-lg-5">
              <div className="d-inline-flex p-3 rounded-4 mb-4" style={{ backgroundColor: '#e3f2fd', color: '#1565c0' }}>
                <i className="bi bi-lightning-charge fs-4"></i>
              </div>
              <h5 className="fw-bold mb-3">Clases grupales</h5>
              <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>Spinning, Zumba, CrossFit, Yoga, Pilates y más. Sesiones energéticas guiadas por coaches certificados.</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 rounded-4" style={{ border: '1px solid #f0f0f0' }}>
            <Card.Body className="p-4 p-lg-5">
              <div className="d-inline-flex p-3 rounded-4 mb-4" style={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
                <i className="bi bi-shield-check fs-4"></i>
              </div>
              <h5 className="fw-bold mb-3">Entrenamiento seguro</h5>
              <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>Planes adaptados a tus objetivos con seguimiento y un entorno que prioriza tu integridad física en cada repetición.</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 rounded-4" style={{ border: '1px solid #f0f0f0' }}>
            <Card.Body className="p-4 p-lg-5">
              <div className="d-inline-flex p-3 rounded-4 mb-4" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                <i className="bi bi-star fs-4"></i>
              </div>
              <h5 className="fw-bold mb-3">Equipamiento premium</h5>
              <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>Máquinas de última generación, pesas libres, áreas funcionales espaciosas y vestuarios completamente equipados.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}