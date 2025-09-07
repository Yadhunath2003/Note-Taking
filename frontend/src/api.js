import axios from 'axios';
import { ACCESS_TOKEN } from './constants'; // Adjust the path as necessary

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Ensure this is set in your .env file
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

// // Example: GET notes
// export const getNotes = () => api.get('/notes');

// // Example: POST a new note
// export const createNote = (note) => api.post('/notes', note);

// // Example: DELETE a note
// export const deleteNote = (id) => api.delete(`/notes/${id}`);

// // Example: UPDATE a note
// export const updateNote = (id, note) => api.put(`/notes/${id}`, note);

export default api;