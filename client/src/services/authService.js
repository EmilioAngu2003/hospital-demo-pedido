import apiClient from "../api/apiClient";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;

export const authService = {
  login: async (user, password) => {
    return await apiClient("/api/auth/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": MY_API_KEY,
      },
      body: JSON.stringify({ user, password }),
    });
  },
};
