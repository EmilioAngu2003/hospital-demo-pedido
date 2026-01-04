import { useState, useMemo } from "react";

export const useSearch = (items, searchKeys = []) => {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query) return items;

    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        return String(value).toLowerCase().includes(query.toLowerCase());
      });
    });
  }, [items, query, searchKeys]);

  return { query, setQuery, filteredItems };
};
