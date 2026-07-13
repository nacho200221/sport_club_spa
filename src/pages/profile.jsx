import { Card, Container, Badge, Row, Col } from 'react-bootstrap';

export default function Profile() {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { email: 'Cargando...', role: 'user', full_name: 'Usuario' };

  let roleName = "Alumno";
  let badgeColor = "primary";
  let hexColor = "#1565c0";

  if (user.role === "admin") { 
    roleName = "Administrador"; 
    badgeColor = "danger"; 
    hexColor = "#4a148c";
  } else if (user.role === "coach") { 
    roleName = "Entrenador"; 
    badgeColor = "success"; 
    hexColor = "#004d40";
  }

  const initial = user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow-sm border-0 rounded-4" style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body className="p-5 text-center">
          
          <div 
            className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow"
            style={{ width: '100px', height: '100px', backgroundColor: hexColor }}
          >
            <span className="fs-1 fw-bold">{initial}</span>
          </div>
          
          <h3 className="fw-bold mb-1">{user.full_name || 'Usuario del Sistema'}</h3>
          <p className="text-muted mb-3">{user.email}</p>
          <Badge bg={badgeColor} className="px-3 py-2 rounded-pill mb-4 fs-6">{roleName}</Badge>
          
          <Row className="text-start mt-4 pt-3 border-top g-3">
            <Col xs={12}>
              <span className="text-muted small fw-bold">ID DE USUARIO</span>
              <p className="mb-0 text-dark">{user.id || 'N/A'}</p>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </Container>
  );
}