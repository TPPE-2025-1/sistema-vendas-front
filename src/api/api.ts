import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getClientes = async () => {
  const response = await axios.get("http://localhost:5000/clientes"); // Ajuste URL conforme seu back
  return response.data;
};

export default api;
