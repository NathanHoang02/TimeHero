import axios from "axios";

// Create an axios instance with a hardcoded base URL
const apiClient = axios.create({
  baseURL: "https://localhost:3000/", // Hardcoded base URL
});

// Wrapper for axios to support HTTP methods
export const makeApiCall = {
  get: (url, config = {}) => {
    return apiClient.get(url, config).then((response) => response.data);
  },
  post: (url, data, config = {}) => {
    return apiClient.post(url, data, config).then((response) => response.data);
  },
  put: (url, data, config = {}) => {
    return apiClient.put(url, data, config).then((response) => response.data);
  },
  delete: (url, config = {}) => {
    return apiClient.delete(url, config).then((response) => response.data);
  },
};