import axios from "axios"

const API = axios.create({
    baseURL: "https://forma-ai-w5gf.onrender.com/api"
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("forma_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;