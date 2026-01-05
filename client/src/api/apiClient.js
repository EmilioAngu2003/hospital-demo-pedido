const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function apiClient(endpoint, config = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error en la petición");
  }

  return response.json();
}

export default apiClient;
