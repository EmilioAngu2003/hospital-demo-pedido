import { useState } from "react";
import MaterialTable from "./MaterialTable";
import Button from "./Button";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderForm = ({ template, shifts, service }) => {
  const [items, setItems] = useState(() =>
    (template.items || []).map((item) => ({ ...item, quantity: 0 }))
  );
  const [others, setOthers] = useState([]);

  const handleMaterialChange = (id, newQuantity) => {
    console.log("🚀 Material cambiado:", id, newQuantity);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addOtherMaterial = () => {
    setOthers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", quantity: 1 },
    ]);
  };

  const updateOtherMaterial = (id, field, value) => {
    setOthers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeOtherMaterial = (id) => {
    setOthers((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const filteredItems = items
      .filter((item) => item.quantity > 0)
      .map(({ id, quantity }) => ({ id, quantity }));

    const filteredOthers = others
      .filter((item) => item.quantity > 0)
      .map(({ name, quantity }) => ({ name, quantity }));

    const payload = {
      template_id: template.id,
      service_id: template.service_id,
      shift_id: formValues.shift,
      items: filteredItems,
      others: filteredOthers,
    };

    console.log("🚀 Payload Final:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": MY_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("¡Pedido enviado correctamente!");
      } else {
        alert("Error al enviar el pedido");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
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
          title={service}
          items={items}
          others={others}
          onQuantitiesChange={handleMaterialChange}
          onOthersChange={{
            add: addOtherMaterial,
            update: updateOtherMaterial,
            remove: removeOtherMaterial,
          }}
        />
      </div>

      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default OrderForm;
