import { API_URL, getHeaders } from "./api";

export async function getAssignments() {
  const response = await fetch(`${API_URL}/sport-rooms`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Error al cargar asignaciones");
  return response.json();
}

export async function createAssignment(data) {
  const response = await fetch(`${API_URL}/sport-rooms`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al crear asignación");
  return response.json();
}

export async function updateAssignment(id, data) {
  const response = await fetch(`${API_URL}/sport-rooms/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al actualizar");
  return response.json();
}

export async function deleteAssignment(id) {
  const response = await fetch(`${API_URL}/sport-rooms/${id}`, { method: "DELETE", headers: getHeaders() });
  if (!response.ok) throw new Error("Error al eliminar");
  return true;
}