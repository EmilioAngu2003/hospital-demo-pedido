import { useState, useEffect } from "react";
import { constantService } from "../services/constantServices";

export const useInitialData = () => {
  const [data, setData] = useState({
    templates: [],
    statuses: [],
    shifts: [],
    services: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        setLoading(true);
        const [templates, statuses, shifts, services] = await Promise.all([
          constantService.getTemplates(),
          constantService.getStatuses(),
          constantService.getShifts(),
          constantService.getServices(),
        ]);

        console.log("🚀 Plantillas cargadas desde el servidor:", templates);
        console.log("🚀 Estados cargados desde el servidor:", statuses);
        console.log("🚀 Turnos cargados desde el servidor:", shifts);
        console.log("🚀 Servicios cargados desde el servidor:", services);

        setData({ templates, statuses, shifts, services });
      } catch (err) {
        console.error("❌ Error en useInitialData:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConstants();
  }, []);

  return { ...data, loading, error };
};
