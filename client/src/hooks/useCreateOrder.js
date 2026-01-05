import { useState } from "react";
import { orderService } from "../services/orderService";

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createOrder = async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await orderService.createOrder(payload);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { createOrder, loading, error, success, clearError };
};
