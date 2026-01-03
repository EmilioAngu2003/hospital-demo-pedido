import { useState } from "react";
import MaterialTable from "./MaterialTable";
import Button from "./Button";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderForm = ({ template, shifts }) => {
  const [tableData, setTableData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const materials = template.materials
      .map((m) => ({
        material_id: m.material_id,
        quantity: tableData[m.id] || "0",
      }))
      .filter((item) => item.quantity > 0);

    const payload = {
      service_id: template.service_id,
      shift_id: formValues.shift,
      order: materials,
    };

    console.log("Datos para enviar:", payload);
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="mb-6">
        <input
          type="text"
          name="service"
          value={template.service_id}
          hidden
          readOnly
        />

        <label
          htmlFor="shift"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Turno asignado
        </label>
        <select
          id="shift"
          name="shift"
          className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs"
          required
        >
          <option value="">Elige un Turno</option>
          {shifts.map((shift) => (
            <option value={shift.id} key={shift.id}>
              {shift.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <MaterialTable
          materials={template.materials}
          onQuantitiesChange={(data) => setTableData(data)}
        />
      </div>

      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default OrderForm;
