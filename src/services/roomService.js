import { API_URL, getHeaders } from "./api";

export async function getRooms() {
  const response = await fetch(`${API_URL}/rooms`, { method: "GET", headers: getHeaders() });
  if (!response.ok) throw new Error("Error al obtener salas");
  return response.json();
}

export async function createRoom(roomData) {
  const response = await fetch(`${API_URL}/rooms`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(roomData),
  });
  if (!response.ok) throw new Error("Error al crear sala");
  return response.json();
}

export async function updateRoom(id, roomData) {
  const response = await fetch(`${API_URL}/rooms/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(roomData),
  });
  if (!response.ok) throw new Error("Error al actualizar sala");
  return response.json();
}

export async function deleteRoom(id) {
  const response = await fetch(`${API_URL}/rooms/${id}`, { method: "DELETE", headers: getHeaders() });
  if (!response.ok) throw new Error("Error al eliminar sala");
  return true;
}