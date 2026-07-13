import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button, Container, Form, Card } from "react-bootstrap" 
import { registerUser } from "../services/authService"
import Swal from "sweetalert2"

function Register() {
  const [formData, setFormData] = useState({ full_name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formData)
      Swal.fire("Éxito", "Usuario registrado, ahora inicia sesión", "success")
      navigate("/login")
    } catch (error) {
      Swal.fire("Error", error.message, "error")
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
                  <h2 className="fw-bold" style={{ color: '#1565c0' }}>Registro</h2>
                  <p className="text-muted">Crea tu cuenta de alumno</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small text-uppercase">Nombre Completo</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Ej: Juan Pérez"
                      size="lg"
                      className="bg-light border-0"
                      required 
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small text-uppercase">Correo Electrónico</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="ejemplo@correo.com"
                      size="lg"
                      className="bg-light border-0"
                      required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium text-muted small text-uppercase">Contraseña</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="••••••••"
                      size="lg"
                      className="bg-light border-0"
                      required 
                      onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg" 
                    className="w-100 fw-bold shadow-sm" 
                    style={{ backgroundColor: '#1565c0', borderColor: '#1565c0' }}
                  >
                    Crear Cuenta
                  </Button>
                </Form>

                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-muted small mb-0">
                    ¿Ya tienes una cuenta? <br/>
                    <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#1565c0' }}>
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>

              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Register