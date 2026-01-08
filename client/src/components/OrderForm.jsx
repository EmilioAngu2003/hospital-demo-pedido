import { useCreateOrder } from "../hooks/useCreateOrder";
import { useOrderFormState } from "../hooks/useOrderFormState";
import QuantityCounter from "./QuantityCounter";
import Button from "./Button";
import SortButton from "./SortButton";
import OthersRow from "./OthersRow";
import DataTable from "./DataTable";
import Alert from "./Alert";

const OrderForm = ({ template, shifts, service }) => {
  const { createOrder, loading, error, clearError } = useCreateOrder();
  const {
    items,
    itemsTable,
    handleMaterialChange,
    others,
    othersTable,
    actions,
  } = useOrderFormState(template.items || []);

  const itemsHeaders = [
    { name: "Material", key: "material" },
    { name: "Stock", key: "stock" },
    { name: "Cantidad", key: "quantity" },
  ];
  const othersHeaders = [
    { name: "Material", key: "name" },
    { name: "Cantidad", key: "quantity" },
  ];

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

    const isOk = await createOrder(payload);

    if (isOk) {
      alert("¡Pedido enviado correctamente!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">{service}</h2>

      {error && <Alert message={error} onClose={clearError} />}
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
        <DataTable
          title="Materiales Principales"
          items={items}
          table={itemsTable}
          rounded="top"
          headers={({ sort, key, direction }) => (
            <>
              {itemsHeaders.map((header, index) => (
                <th key={index} className="px-6 py-3 w-1/3">
                  <SortButton
                    label={header.name}
                    isSelected={key === header.key}
                    onSort={() => sort(header.key)}
                    direction={direction}
                  />
                </th>
              ))}
            </>
          )}
          renderRow={(item) => (
            <tr
              key={item.id}
              className="bg-neutral-primary-soft border-b border-default"
            >
              <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {item.material}
              </td>
              <td className="px-6 py-4">{item.stock}</td>
              <td className="px-6 py-4">
                <QuantityCounter
                  value={item.quantity || ""}
                  min={0}
                  step={1}
                  placeholder="0"
                  onChange={(val) => handleMaterialChange(item.id, val)}
                />
              </td>
            </tr>
          )}
        ></DataTable>
        <DataTable
          items={others}
          table={othersTable}
          rounded="bottom"
          actions={
            <>
              <div className="w-full md:w-1/2">
                <h3 className="text-heading">Otros Materiales</h3>
              </div>
              <div className="flex flex-col items-stretch justify-end shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <Button
                  onClick={() => actions.add()}
                  variant="primary"
                  size="S"
                  type="button"
                >
                  Añadir Material
                </Button>
                <Button
                  variant="secondary"
                  size="S"
                  onClick={othersTable.sort.reset}
                  type="button"
                >
                  Quitar Orden
                </Button>
              </div>
            </>
          }
          headers={({ sort, key, direction }) => (
            <>
              {othersHeaders.map((header, index) => (
                <th key={index} className="px-6 py-3 w-1/3">
                  <SortButton
                    label={header.name}
                    isSelected={key === header.key}
                    onSort={() => sort(header.key)}
                    direction={direction}
                  />
                </th>
              ))}
              <th className="px-6 py-3 w-1/3">Acciones</th>
            </>
          )}
          renderRow={(item) => (
            <OthersRow
              key={item.id}
              item={item}
              onUpdate={actions.update}
              onRemove={actions.remove}
            />
          )}
          empty={
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-heading">
                No hay otros materiales
              </td>
            </tr>
          }
          footer={false}
        ></DataTable>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
};

export default OrderForm;
