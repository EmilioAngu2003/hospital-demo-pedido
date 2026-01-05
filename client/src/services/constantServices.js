import apiClient from "../api/apiClient";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;

const defaultOptions = {
  method: "GET",
  headers: {
    "x-api-key": MY_API_KEY,
  },
};

export const constantService = {
  getTemplates: () => apiClient("/api/templates", defaultOptions),
  getServices: () => apiClient("/api/services", defaultOptions),
  getStatuses: () => apiClient("/api/statuses", defaultOptions),
  getShifts: () => apiClient("/api/shifts", defaultOptions),
};
