import axios from 'axios';

const axioz = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default axioz;