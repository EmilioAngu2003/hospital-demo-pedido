import { useState, useEffect } from "react";
import RegistroUsuario from "./components/RegistroUsuario";
import TablaPedidos from "./components/TablaPedidos";
import PedidoForm from "./components/PedidoForm";
import BotonCerrarSesion from "./components/BotonCerrarSesion";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [opciones, setOpciones] = useState({ materiales: [], servicios: [] });
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );
  const [servicio, setServicio] = useState(localStorage.getItem("servicio"));
  const [pedido, setPedido] = useState({
    material: null,
    cantidad: 1,
    urgente: false,
  });
  const [mensaje, setMensaje] = useState("Esperando envío de pedido...");
  const [pedidosEnviados, setPedidosEnviados] = useState([]);

  useEffect(() => {
    const obtenerOpciones = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/config/opciones`, {
          method: "GET",
          headers: {
            "x-api-key": MY_API_KEY,
          },
        });
        const data = await response.json();
        setOpciones(data);
        setPedido((prev) => ({ ...prev, material: data.materiales[0] }));
      } catch (error) {
        console.error("Error al obtener opciones:", error);
      }
    };

    obtenerOpciones();
  }, []);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pedidos`, {
          method: "GET",
          headers: {
            "x-api-key": MY_API_KEY,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPedidosEnviados(data);
        } else {
          console.error("Error al obtener pedidos del servidor");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    if (usuario) {
      obtenerPedidos();
    }
  }, [usuario]);

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

    const nuevoPedido = { ...pedido, usuario: usuario, servicio: servicio };

    console.log("Pedido a enviar:", nuevoPedido);

    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": MY_API_KEY,
        },
        body: JSON.stringify(nuevoPedido),
      });

      if (response.ok) {
        const data = await response.json();
        setPedidosEnviados((prev) => [{ ...data.pedido }, ...prev]);
        setMensaje("¡Pedido enviado con éxito!");
      } else {
        setMensaje(`❌ Error al enviar. Estado: ${response.status}`);
      }
    } catch (error) {
      setMensaje(`❌ Error de conexión: ${error.message}`);
    }
  };

  return !usuario || !servicio ? (
    <RegistroUsuario
      onRegistroExitoso={(usuario, servicio) => {
        setUsuario(usuario);
        setServicio(servicio);
      }}
      servicios={opciones.servicios}
    />
  ) : (
    <>
      <div className="max-w-7xl mx-auto p-8 flex flex-col justify-start gap-8">
        <h1 className="text-3xl font-bold text-center">
          Sistema de Pedidos Hospitalarios
        </h1>
        <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold pb-2.5">
            🏥 Interfaz de Departamento (Crear Pedido)
          </h2>
          <PedidoForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            pedido={pedido}
            materiales={opciones.materiales}
          />
          <p className="text-base message-status">Estado: {mensaje}</p>
        </section>

        <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold pb-2.5">
            📦 Interfaz de Almacén (Pedidos Recibidos)
          </h2>
          <TablaPedidos pedidos={pedidosEnviados} />
        </section>
      </div>
      <BotonCerrarSesion setUsuario={setUsuario} setServicio={setServicio} />
    </>
  );
}

export default App;
