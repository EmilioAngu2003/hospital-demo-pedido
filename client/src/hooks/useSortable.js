import { useState, useMemo } from "react";

export const useSortable = (items) => {
  const [orderedIds, setOrderedIds] = useState(null);
  const [config, setConfig] = useState({
    key: null,
    direction: "asc",
  });

  const sortedItems = useMemo(() => {
    if (!orderedIds) return items;

    const itemsMap = new Map(items.map((item) => [item.id, item]));
    const preservedOrder = orderedIds
      .map((id) => itemsMap.get(id))
      .filter(Boolean);

    const existingIdsSet = new Set(orderedIds);
    const newItems = items.filter((item) => !existingIdsSet.has(item.id));

    return [...preservedOrder, ...newItems];
  }, [items, orderedIds]);

  const sort = (key) => {
    const direction =
      config.key === key && config.direction === "asc" ? "desc" : "asc";

    const sorted = [...items].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setOrderedIds(sorted.map((i) => i.id));
    setConfig({ key, direction });
  };

  const resetSort = () => {
    setOrderedIds(null);
    setConfig({ key: null, direction: "asc" });
  };

  return { sortedItems, sort, config, resetSort };
};
