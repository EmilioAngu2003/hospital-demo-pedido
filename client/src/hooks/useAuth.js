import { useState } from "react";
import { authService } from "../services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (user, password) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await authService.login(user, password);
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { login, loading, error, clearError };
};
