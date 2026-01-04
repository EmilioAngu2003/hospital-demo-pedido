import { useSearch } from "./useSearch";
import { useSortable } from "./useSortable";
import { usePagination } from "./usePagination";

export const useTable = (data, { searchKeys = [], rowsPerPage = 10 }) => {
  const { query, setQuery, filteredItems } = useSearch(data, searchKeys);
  const { sortedItems, sort, config, resetSort } = useSortable(filteredItems);
  const pagination = usePagination(sortedItems, rowsPerPage);
  return {
    displayItems: pagination.items,
    search: { query, setQuery },
    sort: { handleSort: sort, config, reset: resetSort },
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
