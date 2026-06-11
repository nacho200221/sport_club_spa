import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css"; // Usa "../App.css" si guardaste los estilos ahí

const users = [
  { user: "usuario1@sportclub.cl", password: "123", role: "usuario", nombre: "Juan Pérez" },
  { user: "usuario2@sportclub.cl", password: "123", role: "usuario", nombre: "María Gómez" },
  { user: "coach1@sportclub.cl", password: "123", role: "coach", nombre: "Prof. Carlos Silva" },
  { user: "coach2@sportclub.cl", password: "123", role: "coach", nombre: "Prof. Ana Rojas" },
  { user: "admin1@sportclub.cl", password: "123", role: "admin", nombre: "Admin Principal" },
  { user: "admin2@sportclub.cl", password: "123", role: "admin", nombre: "Admin Soporte" }
];

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const usuarioEncontrado = users.find(u => u.user === correo && u.password === password);

    if (usuarioEncontrado) {
      setMensajeError("");
      
      localStorage.setItem("user", JSON.stringify(usuarioEncontrado));

      if (usuarioEncontrado.role === "usuario") {
        navigate("/user/dashboard");
      } else if (usuarioEncontrado.role === "coach") {
        navigate("/coach/dashboard");
      } else if (usuarioEncontrado.role === "admin") {
        navigate("/admin/dashboard");
      }
    } else {
      setMensajeError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <main className="pantalla-centrada">
      <div className="caja-formulario">
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit} className="formulario">
          <div className="grupo-input">
            <label htmlFor="correo">Correo Electrónico</label>
            <input 
              type="email" 
              id="correo" 
              placeholder="ejemplo@correo.com" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required 
            />
          </div>
          
          <div className="grupo-input">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="********" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {mensajeError && (
            <p style={{ color: '#dc3545', fontSize: '0.9em', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>
              {mensajeError}
            </p>
          )}

          <button type="submit" className="boton-bloque" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
            Ingresar
          </button>
        </form>

        <div className="enlaces-extra">
          <p><Link to="/recuperar">¿Olvidaste tu contraseña?</Link></p>
          <br />
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
        </div>
      </div>
    </main>
  );
}

export default Login;