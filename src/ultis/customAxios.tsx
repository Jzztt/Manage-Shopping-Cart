import axios from 'axios';

const CustomAxios = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
});

export { CustomAxios };
