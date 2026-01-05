import { useState } from "react";

export const useSelectable = (initialSelected = []) => {
  const [selected, setSelected] = useState(initialSelected);

  const select = (item) => {
    if (!selected.find((s) => s.value === item.value)) {
      setSelected((prev) => [...prev, item]);
    }
  };

  const deselect = (value) => {
    setSelected((prev) => prev.filter((item) => item.value !== value));
  };

  const isSelected = (value) => selected.some((item) => item.value === value);

  return { selected, select, deselect, isSelected };
};
