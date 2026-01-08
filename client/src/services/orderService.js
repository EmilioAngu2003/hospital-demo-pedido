import apiClient from "../api/apiClient";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;

export const orderService = {
  createOrder: async (orderData) => {
    return await apiClient("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": MY_API_KEY,
      },
      body: JSON.stringify(orderData),
    });
  },
  getOrder: async (id) => {
    return await apiClient(`/api/order/${id}`, {
      method: "GET",
      headers: {
        "x-api-key": MY_API_KEY,
      },
    });
  },
  getOrders: async (filters) => {
    return await apiClient("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": MY_API_KEY,
      },
      body: JSON.stringify(filters),
    });
  },
};
