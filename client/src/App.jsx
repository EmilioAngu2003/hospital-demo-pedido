import { useState } from "react";
import RegistroUsuario from "./components/RegistroUsuario";
import TablaPedidos from "./components/TablaPedidos";
import PedidoForm from "./components/PedidoForm";
import BotonCerrarSesion from "./components/BotonCerrarSesion";

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
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_hospital"))
  );

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

  return !usuario ? (
    <RegistroUsuario
      onRegistroExitoso={(datos) => setUsuario(datos)}
      departamentos={DEPARTMENTS}
    />
  ) : (
    <>
      <div className="max-w-7xl mx-auto p-8 flex flex-col justify-start gap-8">
        <h1 className="text-3xl font-bold text-center">
          Sistema de Pedidos Hospitalarios
        </h1>
        <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold border-b-2 border-gray pb-2.5">
            🏥 Interfaz de Departamento (Crear Pedido)
          </h2>
          <PedidoForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            pedido={pedido}
            departamentos={DEPARTMENTS}
            materiales={PRODUCTS}
          />
          <p className="text-base message-status">Estado: {mensaje}</p>
        </section>

        <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold border-b-2 border-gray pb-2.5">
            📦 Interfaz de Almacén (Pedidos Recibidos)
          </h2>
          <p className="text-sm italic">
            NOTA: Esta tabla simula la recepción de pedidos en el Frontend. En
            la fase 2, esta tabla obtendrá datos del Backend.
          </p>
          <TablaPedidos pedidos={pedidosEnviados} />
        </section>
      </div>
      <BotonCerrarSesion setUsuario={setUsuario} />
    </>
  );
}

export default App;
