// src/services/userService.js
import { API_URL, getHeaders } from "./api";

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
}

export async function createUser(userData) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al crear usuario");
  return data;
}

export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al actualizar usuario");
  return data;
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Error al eliminar usuario");
  return true;
}