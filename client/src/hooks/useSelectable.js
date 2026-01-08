import { useState, useCallback } from "react";

export const useSelectable = (initialSelected = []) => {
  const [selected, setSelected] = useState(initialSelected);

  const isSelected = useCallback(
    (value) => selected.some((item) => item.value === value),
    [selected]
  );

  const select = useCallback((item) => {
    setSelected((prev) => {
      if (prev.find((s) => s.value === item.value)) return prev;
      return [...prev, item];
    });
  }, []);

  const deselect = useCallback((value) => {
    setSelected((prev) => prev.filter((item) => item.value !== value));
  }, []);

  const toggle = useCallback((item) => {
    setSelected((prev) => {
      const exists = prev.find((s) => s.value === item.value);
      if (exists) return prev.filter((i) => i.value !== item.value);
      return [...prev, item];
    });
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  return {
    selected,
    select,
    deselect,
    toggle,
    clear,
    isSelected,
    isEmpty: selected.length === 0,
  };
};
