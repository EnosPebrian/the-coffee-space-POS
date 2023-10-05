import axios from "axios";
export const API_URL = "https://the-coffee-space-api.crystalux.web.id";
// export const API_URL = "http://localhost:8003";
export const api = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("cs-token")}` },
});
