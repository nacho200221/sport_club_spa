import { API_URL, getHeaders } from "./api";

export async function getAvailableClasses() {
  const response = await fetch(`${API_URL}/member/classes`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Error al obtener clases disponibles");
  return response.json();
}

export async function createReservation(scheduleId) {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ class_schedule_id: scheduleId })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear reserva");
  }
  return response.json();
}

export async function getMyReservations() {
  const response = await fetch(`${API_URL}/reservations/my-reservations`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Error al obtener reservas");
  return response.json();
}

export async function cancelReservation(id) {
  const response = await fetch(`${API_URL}/reservations/${id}/cancel`, {
    method: "PATCH",
    headers: getHeaders()
  });
  if (!response.ok) throw new Error("Error al cancelar reserva");
  return response.json();
}