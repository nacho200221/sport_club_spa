import { API_URL, getHeaders } from "./api";

export async function getMyClasses() {
  const response = await fetch(`${API_URL}/coach/my-classes`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Error al obtener clases del coach");
  return response.json();
}

export async function getMySchedules() {
  const response = await fetch(`${API_URL}/coach/my-schedules`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Error al obtener el horario");
  return response.json();
}