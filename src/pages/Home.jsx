import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="mt-5 text-center">
      <h1>Bienvenido a SportClub</h1>
      <p>Sistema SPA desarrollado con React.</p>

    
      <Stack direction="horizontal" gap={3} className="justify-content-center mt-4">
        <Button as={Link} to="/login" variant="primary">
          Iniciar Sesión
        </Button>
        <Button as={Link} to="/register" variant="outline-primary">
          Registrarse
        </Button>
      </Stack>
    </Container>
  );
}

export default Home;