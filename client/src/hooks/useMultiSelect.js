import { useState } from "react";
import { useSearch } from "./useSearch";
import { useSelectable } from "./useSelectable";

export const useMultiSelect = ({ options, onChange, initialSelected = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { selected, select, deselect } = useSelectable(initialSelected);
  const { query, setQuery, filteredItems } = useSearch(options, ["label"]);

  const availableOptions = filteredItems.filter(
    (option) => !selected.find((s) => s.value === option.value)
  );

  const handleSelect = (option) => {
    const nextSelected = [...selected, option];
    select(option);
    setQuery("");
    setIsOpen(false);
    setActiveIndex(-1);
    if (onChange) {
      onChange(nextSelected.map((s) => s.value));
    }
  };

  const handleDeselect = (value) => {
    const nextSelected = selected.filter((s) => s.value !== value);
    deselect(value);
    if (onChange) {
      onChange(nextSelected.map((s) => s.value));
    }
  };

  const handleKeyDown = (e, query) => {
    if (!isOpen) {
      if (e.key === "ArrowDown") setIsOpen(true);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < availableOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && availableOptions[activeIndex]) {
          handleSelect(availableOptions[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Backspace":
        if (query === "" && selected.length > 0) {
          handleDeselect(selected[selected.length - 1].value);
        }
        break;
      default:
        break;
    }
  };

  return {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    query,
    setQuery,
    selected,
    handleSelect,
    handleDeselect,
    availableOptions,
  };
};
