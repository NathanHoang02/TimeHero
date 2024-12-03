import axios from "axios";

const apiUrl = 'http://localhost:3000'; 

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
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
