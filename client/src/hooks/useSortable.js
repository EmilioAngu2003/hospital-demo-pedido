import { useState, useMemo, useCallback } from "react";

const getCompareFn =
  (key, direction, customSorts = {}) =>
  (a, b) => {
    if (customSorts[key]) {
      return direction === "asc"
        ? customSorts[key](a, b)
        : customSorts[key](b, a);
    }
    const valA = a[key] ?? "";
    const valB = b[key] ?? "";

    if (typeof valA === "string" && typeof valB === "string") {
      return direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (valA === valB) return 0;
    return direction === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  };

export const useSortable = (items, options = {}) => {
  const {
    initialKey = null,
    initialDirection = "desc",
    customSorts = {},
  } = options;

  const [config, setConfig] = useState({
    key: initialKey,
    direction: initialDirection,
  });
  const [orderedIds, setOrderedIds] = useState(() => {
    if (!initialKey) return null;
    const sorted = [...(items || [])].sort(
      getCompareFn(initialKey, initialDirection, customSorts)
    );
    return sorted.map((i) => i.id);
  });

  const sortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (!orderedIds) return items;

    const itemsMap = new Map(items.map((item) => [item.id, item]));

    const preservedOrder = [];
    const seenIds = new Set();

    for (const id of orderedIds) {
      const item = itemsMap.get(id);
      if (item) {
        preservedOrder.push(item);
        seenIds.add(id);
      }
    }

    const newItems = items.filter((item) => !seenIds.has(item.id));

    return [...preservedOrder, ...newItems];
  }, [items, orderedIds]);

  const sort = useCallback(
    (key) => {
      setConfig((prev) => {
        let nextDirection = initialDirection;
        if (prev.key === key) {
          nextDirection = prev.direction === "asc" ? "desc" : "asc";
        }
        const sorted = [...items].sort(
          getCompareFn(key, nextDirection, customSorts)
        );
        setOrderedIds(sorted.map((i) => i.id));

        return { key, direction: nextDirection };
      });
    },
    [items, initialDirection, customSorts]
  );

  const resetSort = useCallback(() => {
    if (!initialKey) {
      setOrderedIds(null);
      setConfig({ key: null, direction: initialDirection });
      return;
    }

    const sorted = [...items].sort(
      getCompareFn(initialKey, initialDirection, customSorts)
    );

    setOrderedIds(sorted.map((i) => i.id));
    setConfig({ key: initialKey, direction: initialDirection });
  }, [items, initialKey, initialDirection, customSorts]);

  return { sortedItems, sort, config, resetSort };
};

export const useIndexSortable = (items, options = {}) => {
  const {
    initialKey = null,
    initialDirection = null,
    defaultDirection = "desc",
    customSorts = {},
  } = options;

  const [order, setOrder] = useState(null);
  const [config, setConfig] = useState({
    key: initialKey,
    direction: initialDirection,
  });

  const oppositeDirection = defaultDirection === "asc" ? "desc" : "asc";
  const hasNewItems = items?.length > (order?.length ?? 0);

  if (hasNewItems && order !== null) {
    const newIndices = Array.from(
      { length: items.length - order.length },
      (_, i) => order.length + i
    );
    setOrder([...order, ...newIndices]);
    setConfig({
      key: initialKey,
      direction: initialDirection,
    });
  }

  const effectiveOrder = useMemo(() => {
    if (order !== null) return order;
    if (!items?.length || !config.key) return null;

    return [...items.keys()].sort((a, b) =>
      getCompareFn(
        config.key,
        config.direction,
        customSorts
      )(items[a], items[b])
    );
  }, [order, items, config, customSorts]);

  const sortedItems = useMemo(() => {
    if (!items?.length) return [];
    if (!effectiveOrder) return items;
    return effectiveOrder.map((i) => items[i]).filter(Boolean);
  }, [items, effectiveOrder]);

  const sort = useCallback(
    (key) => {
      if (!items?.length) return;
      setConfig((prev) => {
        console.log("🚀 key:", key);
        const direction =
          prev.key === key && prev.direction === defaultDirection
            ? oppositeDirection
            : defaultDirection;
        const nextOrder = [...items.keys()].sort((a, b) =>
          getCompareFn(key, direction, customSorts)(items[a], items[b])
        );
        setOrder(nextOrder);
        return { key, direction };
      });
    },
    [items, customSorts, oppositeDirection, defaultDirection]
  );

  const resetSort = useCallback(() => {
    setOrder(null);
    setConfig({ key: null, direction: "desc" });
  }, []);

  return { sortedItems, sort, config, resetSort };
};

export const useSmartSort = (items = [], options = {}) => {
  const {
    initialKey = null,
    initialDirection = "desc",
    customSorts = {},
  } = options;

  const [config, setConfig] = useState({
    key: initialKey,
    direction: initialDirection,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [frozenIds, setFrozenIds] = useState(null);

  const markDirty = useCallback(() => setIsDirty(true), []);

  const sortedItems = useMemo(() => {
    if (!config.key && !frozenIds) return items;
    if (frozenIds) {
      const itemsMap = new Map(items.map((item) => [item.id, item]));
      const ordered = frozenIds.map((id) => itemsMap.get(id)).filter(Boolean);
      const newItems = items.filter((item) => !frozenIds.includes(item.id));
      return [...ordered, ...newItems];
    }
    return [...items].sort(
      getCompareFn(config.key, config.direction, customSorts)
    );
  }, [items, config, frozenIds, customSorts]);

  const sort = useCallback(
    (key) => {
      setIsDirty(false);
      setConfig((prev) => {
        const direction =
          prev.key === key && prev.direction === "asc" ? "desc" : "asc";
        const newSorted = [...items].sort(
          getCompareFn(key, direction, customSorts)
        );
        setFrozenIds(newSorted.map((i) => i.id));

        return { key, direction };
      });
    },
    [items, customSorts]
  );

  const reset = useCallback(() => {
    setConfig({ key: null, direction: initialDirection });
    setFrozenIds(null);
    setIsDirty(false);
  }, [initialDirection]);

  return {
    sortedItems,
    sort,
    markDirty,
    isDirty,
    config: isDirty ? { key: null, direction: null } : config,
    reset,
  };
};
