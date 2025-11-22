import { useState } from 'react'
import './App.css'

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY || 'mi-clave-super-secreta-de-hospital-demo-2025';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_URL = `${API_BASE_URL}/api/pedidos`;

const DEPARTMENTS = ["Urgencias", "Farmacia", "UCI", "Laboratorio"];
const PRODUCTS = ["Jeringas 5ml", "Guantes de Látex", "Paracetamol 500mg", "Sondas"];

function App() {
  const [pedido, setPedido] = useState({
    departamento: DEPARTMENTS[0],
    producto: PRODUCTS[0],
    cantidad: 1,
    urgente: false,
    observaciones: ''
  });

  const [mensaje, setMensaje] = useState('Esperando envío de pedido...');
  const [pedidosEnviados, setPedidosEnviados] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPedido(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('Enviando pedido...');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': MY_API_KEY,
        },
        body: JSON.stringify(pedido),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`✅ Éxito: ${data.message} - ${pedido.producto}`);
        setPedidosEnviados(prev => [
          { id: Date.now(), ...pedido, estado: 'Pendiente' },
          ...prev
        ]);
      } else {
        setMensaje(`❌ Error al enviar. Estado: ${response.status}`);
      }
    } catch (error) {
      setMensaje(`❌ Error de conexión: ${error.message}. ¿Está el servidor Express corriendo en ${API_URL}?`);
    }
  };

  return (
    <>
      <h1>Sistema de Pedidos Hospitalarios</h1>
      <section>
        <h2>🏥 Interfaz de Departamento (Crear Pedido)</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Departamento</label>
            <select name="departamento" value={pedido.departamento} onChange={handleChange}>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label>Producto</label>
            <select name="producto" value={pedido.producto} onChange={handleChange}>
              {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label>Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={pedido.cantidad}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div>
            <input
              id="urgente"
              type="checkbox"
              name="urgente"
              checked={pedido.urgente}
              onChange={handleChange}
            />
            <label for="urgente">Pedido Urgente</label>
          </div>

          <button type="submit">Enviar Pedido</button>
        </form>
        <p className="message-status">Estado: {mensaje}</p>
      </section>

      <section>
        <h2>📦 Interfaz de Almacén (Pedidos Recibidos)</h2>
        <p>NOTA: Esta tabla simula la recepción de pedidos en el Frontend. En la fase 2, esta tabla obtendrá datos del Backend.</p>
        <TablaPedidos pedidos={pedidosEnviados} />
      </section>
    </>
  )
}

const TablaPedidos = ({ pedidos }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Depto.</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Urgente</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {pedidos.length === 0 ? (
        <tr><td colSpan="6">No hay pedidos enviados.</td></tr>
      ) : (
        pedidos.map(p => (
          <tr key={p.id} className={p.urgente ? 'urgente' : ''}>
            <td>{p.id % 1000}</td>
            <td>{p.departamento}</td>
            <td>{p.producto}</td>
            <td>{p.cantidad}</td>
            <td>{p.urgente ? '🚨 Sí' : 'No'}</td>
            <td>{p.estado}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default App
