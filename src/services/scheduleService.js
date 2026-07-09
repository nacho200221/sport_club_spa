import { API_URL, getHeaders } from "./api";

export async function getSchedules() {
  const response = await fetch(`${API_URL}/class-schedules`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Error al obtener horarios");
  return response.json();
}

export async function createSchedule(data) {
  const response = await fetch(`${API_URL}/class-schedules`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al crear horario");
  return response.json();
}

export async function updateSchedule(id, data) {
  const response = await fetch(`${API_URL}/class-schedules/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al actualizar horario");
  return response.json();
}

export async function deleteSchedule(id) {
  const response = await fetch(`${API_URL}/class-schedules/${id}`, { method: "DELETE", headers: getHeaders() });
  if (!response.ok) throw new Error("Error al eliminar horario");
  return true;
}