import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: "https://constru-link-back-end.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
};

export const professionals = {
  getAll: () => api.get("/professionals"),
  create: (payload) => api.post("/professionals", payload),
  search: (q) => api.get("/professionals/search", { params: { query: q } }),
};

export const requests = {
  create: (payload) => api.post("/requests", payload),
  getAll: () => api.get("/requests"),
  deleteById: (id) => api.delete("/requests", { data: { id } })
};

export default api;