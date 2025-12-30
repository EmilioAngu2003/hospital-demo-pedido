import { useState, useEffect } from "react";
import RegistroUsuario from "./components/RegistroUsuario";
import TablaPedidos from "./components/TablaPedidos";
import PedidoForm from "./components/PedidoForm";
import BotonCerrarSesion from "./components/BotonCerrarSesion";
import ModalManager from "./components/ModalManager";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [opciones, setOpciones] = useState({
    materiales: [],
    servicios: [],
    estados: [],
  });
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: null,
    isOpen: false,
    data: null,
    onConfirm: null,
  });

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

      const intervalo = setInterval(() => {
        obtenerPedidos();
      }, 5000);

      return () => clearInterval(intervalo);
    }
  }, [usuario]);

  useEffect(() => {
    const verificarAdmin = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/admin`, {
          method: "GET",
          headers: {
            "x-api-key": MY_API_KEY,
            "x-user-dni": usuario.dni,
          },
        });

        setIsAdmin(response.ok);
      } catch (error) {
        console.error("Error de red:", error);
        setIsAdmin(false);
      }
    };

    if (usuario) {
      verificarAdmin();
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

  const handleUpdateStatus = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": MY_API_KEY,
          "x-user-dni": usuario.dni,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (response.ok) {
        setPedidosEnviados((prev) =>
          prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
        );
        setModalConfig({ ...modalConfig, isOpen: false });
        setMensaje("Estado actualizado correctamente");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleDeletePedido = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": MY_API_KEY,
          "x-user-dni": usuario.dni,
        },
      });

      if (response.ok) {
        setPedidosEnviados((prev) => prev.filter((p) => p.id !== id));
        setModalConfig({ ...modalConfig, isOpen: false });
        setMensaje("Pedido eliminado de la base de datos");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const showEditModal = (pedido) => {
    setModalConfig({
      type: "edit",
      isOpen: true,
      data: pedido,
      onConfirm: handleUpdateStatus,
    });
  };

  const showDeleteModal = (pedido) => {
    setModalConfig({
      type: "delete",
      isOpen: true,
      data: pedido,
      onConfirm: handleDeletePedido,
    });
  };

  const showUserModal = (pedido) => {
    setModalConfig({
      type: "user",
      isOpen: true,
      data: pedido,
      onConfirm: null,
    });
  };

  const closeModal = () => {
    setModalConfig({ type: null, isOpen: false, data: null, onConfirm: null });
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
          {isAdmin ? "📦 Gestión de Almacén" : "Interfaz de Usuario"}
        </h1>

        {!isAdmin && (
          <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
            <h2 className="text-xl font-semibold pb-2.5">Crear Pedido</h2>
            <PedidoForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              pedido={pedido}
              materiales={opciones.materiales}
            />
            <p className="text-base message-status">Estado: {mensaje}</p>
          </section>
        )}

        <section className="w-full p-5 font-sans border border-gray rounded-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold pb-2.5">
            {isAdmin ? "Panel de Pedidos" : "Pedidos Realizados"}
          </h2>
          <TablaPedidos
            pedidos={pedidosEnviados}
            canEdit={isAdmin}
            onEdit={showEditModal}
            onViewUser={showUserModal}
            onDelete={showDeleteModal}
          />
        </section>
      </div>
      <BotonCerrarSesion setUsuario={setUsuario} setServicio={setServicio} />
      <ModalManager
        config={modalConfig}
        onClose={closeModal}
        estados={opciones.estados}
      />
    </>
  );
}

export default App;
