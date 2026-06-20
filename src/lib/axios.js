import axios from "axios";

const getBaseUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;
  const hostname = typeof window !== "undefined" ? window.location.hostname : "localhost";
  return `http://${hostname}:5000/api`;
};

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true, // Tự động gửi kèm cookies (JWT) khi gọi API
});
