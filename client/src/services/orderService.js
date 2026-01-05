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
};
