import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function CoachLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar style={{ backgroundColor: '#00897b' }} variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/coach/classes" className="fw-bold">
            <i className="bi bi-person-badge me-2"></i>SportClub | Coach
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/coach/classes">Mis Clases</Nav.Link>
              <Nav.Link href="/coach/schedules">Mi Horario</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {children}
      </Container>
    </div>
  );
}