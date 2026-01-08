import { useEffect } from "react";

import { useSearch } from "./useSearch";
import { useSmartSort } from "./useSortable";
import { usePagination } from "./usePagination";

export const useTable = (data, options) => {
  const {
    searchKeys = [],
    rowsPerPage = 10,
    initialSortKey = null,
    initialSortDirection = "desc",
    customSorts = {},
  } = options;

  const { query, setQuery, filteredItems } = useSearch(data, searchKeys);
  const { sortedItems, sort, config, reset, markDirty, isDirty } = useSmartSort(
    filteredItems,
    {
      initialKey: initialSortKey,
      initialDirection: initialSortDirection,
      customSorts,
    }
  );

  const pagination = usePagination(sortedItems, rowsPerPage);

  useEffect(() => {
    pagination.change(1);
  }, [query]);

  return {
    items: pagination.items,
    search: { query, setQuery },
    sort: {
      handleSort: sort,
      config,
      reset,
      markDirty,
      isDirty,
    },
    pagination: {
      current: pagination.current,
      pages: pagination.pages,
      change: pagination.change,
      start: pagination.start,
      end: pagination.end,
      records: sortedItems.length,
    },
  };
};
