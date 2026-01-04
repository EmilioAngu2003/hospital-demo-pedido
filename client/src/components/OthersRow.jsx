import { useId } from "react";
import QuantityCounter from "./QuantityCounter";
import Button from "./Button";

const OthersRow = ({ item, onUpdate, onRemove }) => {
  const rowId = useId();

  return (
    <tr className="bg-neutral-primary-soft border-b border-default">
      <td className="px-6 py-4">
        <label htmlFor={`${rowId}-name`} className="sr-only">
          Nombre del Material
        </label>
        <input
          id={`${rowId}-name`}
          type="text"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base block w-full px-2.5 py-2 shadow-xs"
          placeholder="Nombre del material..."
          value={item.name}
          onChange={(e) => onUpdate(item.id, "name", e.target.value)}
          required
        />
      </td>
      <td className="px-6 py-4">
        <QuantityCounter
          value={item.quantity}
          min={1}
          step={1}
          placeholder="0"
          required
          onChange={(val) => onUpdate(item.id, "quantity", val)}
        />
      </td>
      <td className="px-6 py-4">
        <Button
          variant="danger"
          type="button"
          size="S"
          onClick={() => onRemove(item.id)}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  );
};

export default OthersRow;
