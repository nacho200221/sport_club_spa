import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Container, Form } from "react-bootstrap"
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
    <Container className="mt-5">
      <h2>Registro SportClub</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control type="text" required onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </Form.Group>
        <Button variant="primary" type="submit">Registrar</Button>
      </Form>
    </Container>
  )
}

export default Register