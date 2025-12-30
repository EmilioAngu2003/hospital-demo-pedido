import { useState } from "react";

const MY_API_KEY =
  import.meta.env.VITE_MY_API_KEY ||
  "mi-clave-super-secreta-de-hospital-demo-2025";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const API_URL = `${API_BASE_URL}/api/pedidos`;

const DEPARTMENTS = ["Urgencias", "Farmacia", "UCI", "Laboratorio"];
const PRODUCTS = [
  "Jeringas 5ml",
  "Guantes de Látex",
  "Paracetamol 500mg",
  "Sondas",
];

function App() {
  const [pedido, setPedido] = useState({
    departamento: DEPARTMENTS[0],
    producto: PRODUCTS[0],
    cantidad: 1,
    urgente: false,
    observaciones: "",
  });

  const [mensaje, setMensaje] = useState("Esperando envío de pedido...");
  const [pedidosEnviados, setPedidosEnviados] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPedido((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Enviando pedido...");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": MY_API_KEY,
        },
        body: JSON.stringify(pedido),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`✅ Éxito: ${data.message} - ${pedido.producto}`);
        setPedidosEnviados((prev) => [
          { id: Date.now(), ...pedido, estado: "Pendiente" },
          ...prev,
        ]);
      } else {
        setMensaje(`❌ Error al enviar. Estado: ${response.status}`);
      }
    } catch (error) {
      setMensaje(
        `❌ Error de conexión: ${error.message}. ¿Está el servidor Express corriendo en ${API_URL}?`
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col justify-start gap-8">
      <h1 className="text-3xl font-bold text-center">
        Sistema de Pedidos Hospitalarios
      </h1>
      <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
        <h2 className="text-xl font-semibold border-b-2 border-gray pb-2.5">
          🏥 Interfaz de Departamento (Crear Pedido)
        </h2>
        <form className="flex flex-col gap-3 text-base" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Departamento</label>
            <select
              name="departamento"
              value={pedido.departamento}
              onChange={handleChange}
              className="p-2 border border-gray rounded cursor-pointer"
            >
              {DEPARTMENTS.map((d) => (
                <option className="bg-base-100" key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Producto</label>
            <select
              name="producto"
              value={pedido.producto}
              onChange={handleChange}
              className="block w-full p-2 border border-gray rounded cursor-pointer"
            >
              {PRODUCTS.map((p) => (
                <option className="bg-base-100" key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={pedido.cantidad}
              onChange={handleChange}
              min="1"
              className="block w-full p-2 border border-gray rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="urgente"
              type="checkbox"
              name="urgente"
              checked={pedido.urgente}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label className="font-bold cursor-pointer" for="urgente">
              Pedido Urgente
            </label>
          </div>

          <button
            type="submit"
            className="block w-full bg-primary text-white text-base rounded-lg p-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            Enviar Pedido
          </button>
        </form>
        <p className="text-base message-status">Estado: {mensaje}</p>
      </section>

      <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
        <h2 className="text-xl font-semibold border-b-2 border-gray pb-2.5">
          📦 Interfaz de Almacén (Pedidos Recibidos)
        </h2>
        <p className="text-sm italic">
          NOTA: Esta tabla simula la recepción de pedidos en el Frontend. En la
          fase 2, esta tabla obtendrá datos del Backend.
        </p>
        <TablaPedidos pedidos={pedidosEnviados} />
      </section>
    </div>
  );
}

const TablaPedidos = ({ pedidos }) => (
  <div className="w-full overflow-x-auto rounded-lg border border-gray">
    <table className="w-full text-left text-sm md:text-base border-collapse">
      <thead className="bg-primary text-white">
        <tr className="*:p-3">
          <th>ID</th>
          <th>Departamento</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Urgente</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.length === 0 ? (
          <tr>
            <td colSpan="6" className="p-8 text-center border-gray border">
              No hay pedidos enviados.
            </td>
          </tr>
        ) : (
          pedidos.map((p) => (
            <tr
              key={p.id}
              className={`border-b border-gray transition-colors hover:bg-gray/5`}
            >
              <td className="p-3 border-r border-gray/10">#{p.id % 1000}</td>
              <td className="p-3 border-r border-gray/10">{p.departamento}</td>
              <td className="p-3 border-r border-gray/10 font-medium">
                {p.producto}
              </td>
              <td className="p-3 border-r border-gray/10 text-center">
                {p.cantidad}
              </td>
              <td className="p-3 border-r border-gray/10">
                {p.urgente ? (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-sm text-xs">
                    🚨 SÍ
                  </span>
                ) : (
                  <span className="text-gray/50 italic">No</span>
                )}
              </td>
              <td className="p-3 capitalize">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {p.estado}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default App;
