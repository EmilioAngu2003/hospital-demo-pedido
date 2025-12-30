import { useState } from "react";

const RegistroUsuario = ({ onRegistroExitoso, departamentos }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    servicio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("usuario_hospital", JSON.stringify(formData));
    onRegistroExitoso(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Identificación de Servicio
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              required
              className="mt-1 block w-full border border-gray rounded-md p-2 shadow-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              DNI / ID Personal
            </label>
            <input
              type="text"
              name="dni"
              required
              className="mt-1 block w-full border border-gray rounded-md p-2 shadow-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Servicio / Unidad
            </label>
            <select
              name="servicio"
              required
              className="mt-1 block w-full border border-gray rounded-md p-2 shadow-sm *:bg-base-100"
              onChange={handleChange}
            >
              <option value="">Seleccione una unidad</option>
              {departamentos.map((d) => (
                <option className="bg-base-100" key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white text-base py-2 px-4 rounded-md font-semibold"
          >
            Empezar a pedir
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroUsuario;
