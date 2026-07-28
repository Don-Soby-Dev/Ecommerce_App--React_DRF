import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (confg) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      confg.headers.Authorization = `Bearer ${token}`;
    }

    return confg;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
