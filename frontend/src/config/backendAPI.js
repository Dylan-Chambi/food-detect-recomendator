import axios from 'axios';

const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default backendAPI;
