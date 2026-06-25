import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser } from "../services/authService";

function Profile() {
  const user = getUser();

  
  const getDashboardPath = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "coach") return "/coach/dashboard";
    return "/user/dashboard";
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>Mi Perfil</h4>
          
          <Button as={Link} to={getDashboardPath()} variant="secondary" size="sm">
            Volver al Dashboard
          </Button>
        </Card.Header>
        <Card.Body>
          <p><strong>Nombre:</strong> {user?.full_name || user?.name}</p>
          <p><strong>Correo:</strong> {user?.email}</p>
          <p><strong>Rol:</strong> {user?.role}</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;