import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const request = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => api.get(url, config),
  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => api.post(url, data, config),
  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => api.put(url, data, config),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => api.delete(url, config),
};
