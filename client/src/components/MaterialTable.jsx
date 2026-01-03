import { useState, useMemo } from "react";
import Button from "./Button";

const MaterialTable = ({ materials, onQuantitiesChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [quantities, setQuantities] = useState({});
  const [snapshotQuantities, setSnapshotQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    const newQuantities = {
      ...quantities,
      [id]: value,
    };
    setQuantities(newQuantities);

    if (onQuantitiesChange) {
      onQuantitiesChange(newQuantities);
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSnapshotQuantities({ ...quantities });
    setSortConfig({ key, direction });
  };

  const sortedItems = useMemo(() => {
    let sortableItems = materials.map((m) => ({
      ...m,
      quantity: parseFloat(snapshotQuantities[m.id]) || 0,
    }));

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [materials, sortConfig, snapshotQuantities]);

  const getIconColor = (key) =>
    sortConfig.key === key ? "text-brand" : "text-body";

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              <div className="flex items-center">
                Material
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => requestSort("material")}
                >
                  <svg
                    className={`w-4 h-4 ms-1 ${getIconColor("material")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 15 4 4 4-4m0-6-4-4-4 4"
                    />
                  </svg>
                </Button>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              <div className="flex items-center">
                Stock
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => requestSort("stock")}
                >
                  <svg
                    className={`w-4 h-4 ms-1 ${getIconColor("stock")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 15 4 4 4-4m0-6-4-4-4 4"
                    />
                  </svg>
                </Button>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              <div className="flex items-center">
                Cantidad
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => requestSort("quantity")}
                >
                  <svg
                    className={`w-4 h-4 ms-1 ${getIconColor("quantity")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 15 4 4 4-4m0-6-4-4-4 4"
                    />
                  </svg>
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr
              key={item.id}
              className="bg-neutral-primary-soft border-b border-default"
            >
              <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {item.material}
              </td>
              <td className="px-6 py-4">{item.stock}</td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  min="0"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  value={quantities[item.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  placeholder="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialTable;
