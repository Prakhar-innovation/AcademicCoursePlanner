import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_URL || "http://localhost:8000"
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (role) {
    config.headers["X-User-Role"] = role;
  }

  return config;
});

export default apiClient;
