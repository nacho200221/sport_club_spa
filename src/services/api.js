// src/services/api.js

// Si estamos en AWS usará la variable de entorno, si estamos en tu PC usará localhost
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    // Inyecta el token automáticamente si existe
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}