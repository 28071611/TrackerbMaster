import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/track-ip' });

export const trackIP = (ip) => API.post('/', { ip });
export const getHistory = () => API.get('/history');
