import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button, Container, Form, Card } from "react-bootstrap"
import { loginUser, saveSession } from "../services/authService"

function Login() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await loginUser({ email, password })
      saveSession(data.data.token, data.data.user)

      if (data.data.user.role === "admin") {
        navigate("/admin/dashboard")
      } else if (data.data.user.role === "coach") {
        navigate("/coach/dashboard")
      } else {
        navigate("/user/dashboard")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }} 
      className="d-flex align-items-center justify-content-center py-5"
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                
                <div className="text-center mb-4">
                  <div 
                    className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" 
                    style={{ width: '80px', height: '80px', backgroundColor: '#1565c0' }}
                  >
                    <span className="fs-1 fw-bold">SC</span>
                  </div>
                  <h2 className="fw-bold" style={{ color: '#1565c0' }}>SportClub</h2>
                  <p className="text-muted">Sistema de Gestión Deportiva</p>
                </div>

                {error && <div className="alert alert-danger py-2 small">{error}</div>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small text-uppercase">Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@correo.com"
                      size="lg"
                      className="bg-light border-0"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium text-muted small text-uppercase">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      size="lg"
                      className="bg-light border-0"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg" 
                    className="w-100 fw-bold shadow-sm" 
                    style={{ backgroundColor: '#1565c0', borderColor: '#1565c0' }}
                    disabled={loading} 
                  >
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                  </Button>
                </Form>

                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-muted small mb-0">
                    ¿No tienes una cuenta? <br/>
                    <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#1565c0' }}>
                      Regístrate como alumno aquí
                    </Link>
                  </p>
                </div>

              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login