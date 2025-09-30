import axios from 'axios';
import { ACCESS_TOKEN } from './constants'; // Adjust the path as necessary

const apiUrl = "/choreo-apis/note-taking/backend/v1"; 

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl, // Ensure this is set in your .env file
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        //passing in a jwt-token in the header for authentication
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
});

export default api;