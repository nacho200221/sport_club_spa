import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { logout, getUser } from "../services/authService"

function AdminLayout() {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    logout() 
    navigate("/login") 
  }

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>SportClub Admin</Navbar.Brand>
          
          <Nav className="me-auto">
            <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/admin/users">Usuarios</Link>
            <Link className="nav-link" to="/profile">Mi Perfil</Link>
          </Nav>
          
          <span className="text-white me-3">
            Hola, {user?.name}
          </span>
          
          <Button variant="outline-light" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  )
}

export default AdminLayout