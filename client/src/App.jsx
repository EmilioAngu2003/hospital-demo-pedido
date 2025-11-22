import { useState } from 'react'
import './App.css'

function App() {
  const [mensaje, setMensaje] = useState('Esperando envío de pedido...');
  
  const MY_API_KEY = 'mi-clave-super-secreta-de-hospital-demo-2025';
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
  const API_URL = `${API_BASE_URL}/api/pedidos`;

  const handleSendOrder = async () => {
    setMensaje('Enviando pedido...');

    const pedidoDemo = {
      departamento: "Urgencias",
      producto: "Paracetamol 500mg",
      cantidad: 25,
      urgente: true
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': MY_API_KEY,
        },
        body: JSON.stringify(pedidoDemo),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`✅ Éxito: ${data.message}. Producto: ${data.data.producto}`);
      } else {
        setMensaje(`❌ Error al enviar. Estado: ${response.status}`);
      }
    } catch (error) {
      setMensaje(`❌ Error de conexión: ${error.message}. ¿Está el servidor Express corriendo en ${API_URL}?`);
    }
  };

  return (
    <div className="App">
      <h1>Sistema de Pedidos Hospitalarios (DEMO)</h1>
      <button onClick={handleSendOrder}>
        Enviar Pedido de Prueba
      </button>
      <p>Estado: {mensaje}</p>
    </div>
  )
}

export default App
