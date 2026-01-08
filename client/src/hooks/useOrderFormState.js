import { useState, useCallback } from "react";
import { useTable } from "./useTable";

export const useOrderFormState = (initialItems = []) => {
  const [items, setItems] = useState(() =>
    initialItems.map((item) => ({ ...item, quantity: 0 }))
  );
  const [others, setOthers] = useState([]);

  const itemsTable = useTable(items, {
    searchKeys: ["material"],
    rowsPerPage: 10,
  });

  const othersTable = useTable(others, {
    searchKeys: ["name"],
    rowsPerPage: 100,
  });

  const handleMaterialChange = useCallback(
    (id, newQuantity) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      itemsTable.sort.markDirty();
    },
    [itemsTable.sort]
  );

  const addOtherMaterial = useCallback(() => {
    setOthers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", quantity: 1 },
    ]);
    othersTable.sort.markDirty();
  }, [othersTable.sort]);

  const updateOtherMaterial = useCallback(
    (id, field, value) => {
      setOthers((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
      othersTable.sort.markDirty();
    },
    [othersTable.sort]
  );

  const removeOtherMaterial = useCallback(
    (id) => {
      setOthers((prev) => prev.filter((item) => item.id !== id));
      othersTable.sort.markDirty();
    },
    [othersTable.sort]
  );

  return {
    items,
    itemsTable,
    handleMaterialChange,
    others,
    othersTable,
    actions: {
      add: addOtherMaterial,
      update: updateOtherMaterial,
      remove: removeOtherMaterial,
    },
  };
};
