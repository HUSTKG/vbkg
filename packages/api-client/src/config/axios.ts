import axios from "axios";
import { getConfig } from "./apiConfig";

// Create API instance with current config
export const createApiInstance = () => {
  const config = getConfig();

  const api = axios.create({
    baseURL: config.baseUrl,
    headers: config.headers,
  });

  // Add auth token to requests
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle errors globally
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized
      }
      return Promise.reject(error);
    },
  );

  return api;
};

// Get a fresh instance with current config
export const api = () => createApiInstance();
