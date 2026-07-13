import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { Outlet, Link } from 'react-router-dom';

export default function UserLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="bg-light min-vh-100">
      <Navbar style={{ backgroundColor: '#1565c0' }} variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/user/dashboard" className="fw-bold" style={{ cursor: 'pointer' }}>
            <i className="bi bi-person me-2"></i>SportClub | Usuario
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/user/profile" className="text-white border border-light rounded px-3 py-1 mx-1">Mi Perfil</Nav.Link>
              <Nav.Link as={Link} to="/user/classes" className="text-white border border-light rounded px-3 py-1 mx-1">Clases Disponibles</Nav.Link>
              <Nav.Link as={Link} to="/user/reservations" className="text-white border border-light rounded px-3 py-1 mx-1">Mis Reservas</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-light" size="sm" onClick={() => { logout(); navigate('/login'); }}>
                <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">{children}<Outlet />
      </Container>
    </div>
  );
}