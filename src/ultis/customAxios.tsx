import axios from 'axios';

const CustomAxios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

export { CustomAxios };
