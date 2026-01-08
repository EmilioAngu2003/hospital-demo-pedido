import { useState, useEffect } from "react";
import { orderService } from "../services/orderService";

export const useGetOrders = (filters) => {
  const [data, setData] = useState({
    orders: [],
    records: 0,
    pages: 0,
    start: 0,
    end: 0,
    config: { key: "date", direction: "desc" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const result = await orderService.getOrders(filters);
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error al obtener pedidos:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filters]);

  return { data, loading, error };
};
