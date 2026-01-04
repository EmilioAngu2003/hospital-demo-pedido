import { useState, useMemo } from "react";

export const usePagination = (items = [], step = 10) => {
  const [current, setCurrent] = useState(1);

  const pages = Math.ceil(items.length / step);

  const startIndex = (current - 1) * step;
  const endIndex = startIndex + step;

  const paginatedItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  const change = (page) => {
    if (page >= 1 && page <= pages) {
      setCurrent(page);
    }
  };

  const start = items.length === 0 ? 0 : startIndex + 1;
  const end = Math.min(endIndex, items.length);

  return {
    items: paginatedItems,
    current,
    start,
    end,
    pages,
    change,
  };
};
