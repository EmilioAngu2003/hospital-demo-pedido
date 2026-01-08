import { useState, useMemo } from "react";

export const useSearch = (items, searchKeys = [], options = {}) => {
  const { minChars = 0 } = options;
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    const cleanQuery = query.trim().toLowerCase();
    if (!query || cleanQuery.length < minChars) return items;

    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(cleanQuery);
      });
    });
  }, [items, query, searchKeys, minChars]);

  return {
    query,
    setQuery,
    filteredItems,
    hasResults: filteredItems.length > 0,
    isSearching: query.trim().length >= minChars && query.trim().length > 0,
  };
};
