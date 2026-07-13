import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { Outlet, Link } from 'react-router-dom';

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
          <Navbar.Brand as={Link} to="/admin/dashboard" className="fw-bold" style={{ cursor: 'pointer' }}>
            <i className="bi bi-shield-lock me-2"></i>SportClub | Admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/profile" className="text-white border border-light rounded px-3 py-1 mx-1">Mi Perfil</Nav.Link>
              <Nav.Link as={Link} to="/admin/rooms" className="text-white border border-light rounded px-3 py-1 mx-1">Salas</Nav.Link>
              <Nav.Link as={Link} to="/admin/assignments" className="text-white border border-light rounded px-3 py-1 mx-1">Asignaciones</Nav.Link>
              <Nav.Link as={Link} to="/admin/schedules" className="text-white border border-light rounded px-3 py-1 mx-1">Horarios</Nav.Link>
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
        {children}<Outlet />
      </Container>
    </div>
  );
}