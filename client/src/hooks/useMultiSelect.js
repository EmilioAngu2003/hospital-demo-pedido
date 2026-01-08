import { useState, useCallback } from "react";
import { useSearch } from "./useSearch";
import { useSelectable } from "./useSelectable";
import { useDisclosure } from "./useDisclosure";
import { useVirtualNavigation } from "./useKeyboardNavigation";

export const useMultiSelect = ({ options, onChange, initialSelected = [] }) => {
  const { isOpen, open, close } = useDisclosure(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { selected, select, deselect } = useSelectable(initialSelected);
  const { query, setQuery, filteredItems } = useSearch(options, ["label"]);

  const availableOptions = filteredItems.filter(
    (option) => !selected.find((s) => s.value === option.value)
  );

  const handleSelect = useCallback(
    (option) => {
      if (!option) return;
      select(option);
      setQuery("");
      setActiveIndex(-1);
      if (onChange) {
        onChange([...selected, option].map((s) => s.value));
      }
      close();
    },
    [selected, select, onChange, close, setQuery]
  );

  const handleDeselect = (value) => {
    deselect(value);
    if (onChange) {
      onChange(selected.filter((s) => s.value !== value).map((s) => s.value));
    }
  };

  const onQueryChange = (val) => {
    setQuery(val);
    if (!isOpen) open();
    setActiveIndex(availableOptions.length > 0 ? 0 : -1);
  };

  const navigate = useVirtualNavigation(
    {
      listLength: availableOptions.length,
      activeIndex,
      setActiveIndex,
      query,
    },
    {
      close: () => {
        close();
        setActiveIndex(-1);
      },
      onSelect: () => {
        if (activeIndex >= 0 && activeIndex < availableOptions.length) {
          handleSelect(availableOptions[activeIndex]);
        }
      },
      onDelete: () => {
        if (query.length === 0 && selected.length > 0) {
          handleDeselect(selected[selected.length - 1].value);
        }
      },
    }
  );

  const handleKeyDown = (e) => {
    if (!isOpen && e.key === "ArrowDown") open();

    navigate(e);
  };

  return {
    isOpen,
    open,
    close,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    query,
    onQueryChange,
    selected,
    handleSelect,
    handleDeselect,
    availableOptions,
  };
};
