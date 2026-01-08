import { useState, useEffect, useCallback } from "react";
import { orderService } from "../services/orderService";

export const useGetOrder = (id) => {
  const [order, setOrder] = useState({
    items: [],
    others: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrder = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrder(id);
      const transformedData = {
        ...data,
        items: data.items.map((item, index) => ({
          ...item,
          id: `${item.name}-${index}`,
        })),
        others: data.others.map((item, index) => ({
          ...item,
          id: `${item.name}-${index}`,
        })),
      };

      setOrder(transformedData);
    } catch (err) {
      console.error("❌ Error cargando el pedido:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return { order, loading, error, getOrder };
};
