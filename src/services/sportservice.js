import axios from 'axios';


const API_URL = "http://localhost:3000/api/sports"; 

export const getSports = () => axios.get(API_URL);
export const createSport = (data) => axios.post(API_URL, data);
export const updateSport = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSport = (id) => axios.delete(`${API_URL}/${id}`);