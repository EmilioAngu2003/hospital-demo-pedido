import { useState } from "react";

const ModalManager = ({ config, onClose, estados }) => {
  const [nuevoEstado, setNuevoEstado] = useState(estados[0]);
  if (!config.isOpen) return null;

  const { type, data, onConfirm } = config;

  if (type === "edit") {
    return (
      <ModalContainer
        onClose={onClose}
        title={"Actualizar Estado"}
        onConfirm={() => onConfirm(data.id, nuevoEstado)}
      >
        <div className="flex flex-col gap-2 text-base">
          <ul className="flex flex-col gap-2">
            <li>
              <strong>ID:</strong> {data.id}
            </li>
            <li>
              <strong>Material:</strong> {data.material}
            </li>
            <li>
              <strong>Cantidad:</strong> {data.cantidad}
            </li>
            <li>
              <strong>Urgente:</strong> {data.urgente ? "Si" : "No"}
            </li>
            <li>
              <strong>Servicio:</strong> {data.servicio}
            </li>
            <li>
              <strong>Nombre:</strong> {data.usuario.nombre}
            </li>
            <li>
              <strong>DNI:</strong> {data.usuario.dni}
            </li>
            <li>
              <strong>Servicio:</strong> {data.servicio}
            </li>
            <li>
              <strong>Fecha:</strong> {data.fecha}
            </li>
          </ul>
          <form action="" className="flex flex-col gap-2">
            <label className="font-bold">Estado:</label>
            <select
              className="w-full border p-2 rounded-lg *:bg-base-100"
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
            >
              {estados.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </form>
        </div>
      </ModalContainer>
    );
  }

  if (type === "user") {
    return (
      <ModalContainer onClose={onClose} title={"Detalles"}>
        <ul className="flex flex-col gap-2 text-base">
          <li>
            <strong>ID:</strong> {data.id}
          </li>
          <li>
            <strong>Material:</strong> {data.material}
          </li>
          <li>
            <strong>Cantidad:</strong> {data.cantidad}
          </li>
          <li>
            <strong>Urgente:</strong> {data.urgente ? "Si" : "No"}
          </li>
          <li>
            <strong>Servicio:</strong> {data.servicio}
          </li>
          <li>
            <strong>Nombre:</strong> {data.usuario.nombre}
          </li>
          <li>
            <strong>DNI:</strong> {data.usuario.dni}
          </li>
          <li>
            <strong>Servicio:</strong> {data.servicio}
          </li>
          <li>
            <strong>Fecha:</strong> {data.fecha}
          </li>
          <li>
            <strong>Estado:</strong> {data.estado}
          </li>
        </ul>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      onClose={onClose}
      title={"Confirmar Eliminación"}
      onConfirm={() => onConfirm(data.id)}
    >
      <p className="mb-4">¿Estas seguro de eliminar el este pedido?</p>
      <ul className="flex flex-col gap-2 text-base">
        <li>
          <strong>ID:</strong> {data.id}
        </li>
        <li>
          <strong>Material:</strong> {data.material}
        </li>
        <li>
          <strong>Cantidad:</strong> {data.cantidad}
        </li>
      </ul>
    </ModalContainer>
  );
};

const ModalContainer = ({ children, onClose, onConfirm, title }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray mb-4">
          <h3 className="font-bold text-lg uppercase">{title}</h3>
          <button onClick={onClose} className="text-2xl cursor-pointer">
            &times;
          </button>
        </div>
        <div className="px-4">{children}</div>
        <div className="p-4 flex gap-4 justify-end text-white">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-base rounded-lg bg-primary cursor-pointer"
            >
              Confirmar
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-base rounded-lg bg-gray cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalManager;
