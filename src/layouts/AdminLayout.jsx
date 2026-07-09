import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar style={{ backgroundColor: '#7b1fa2' }} variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/admin/rooms" className="fw-bold">
            <i className="bi bi-diagram-3-fill me-2"></i>SportClub | Admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Aquí están los enlaces a tus flujos */}
              <Nav.Link href="/admin/rooms">Salas</Nav.Link>
              <Nav.Link href="/admin/assignments">Asignaciones</Nav.Link>
              <Nav.Link href="/admin/schedules">Horarios</Nav.Link>
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