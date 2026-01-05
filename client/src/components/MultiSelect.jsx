import { useRef, useId } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useMultiSelect } from "../hooks/useMultiSelect";
import Button from "./Button";

const MultiSelect = ({
  options,
  onChange,
  label,
  placeholder = "Seleccionar...",
}) => {
  const containerRef = useRef(null);
  const id = useId();

  const {
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
  } = useMultiSelect({ options, onChange });

  useOnClickOutside(containerRef, () => {
    setIsOpen(false);
    setActiveIndex(-1);
  });

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          {label}
        </label>
      )}

      <div
        className=" flex flex-wrap gap-2.5 w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus-within:ring-brand focus-within:border-brand shadow-xs placeholder:text-body font-normal"
        onClick={() => setIsOpen(true)}
      >
        {selected.map((item) => (
          <Button
            key={item.value}
            variant="tertiary"
            size="XS"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDeselect(item.value);
            }}
          >
            {item.label} ×
          </Button>
        ))}
        <input
          id={id}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          className="flex-1 outline-none min-w-30"
          placeholder={selected.length === 0 ? placeholder : ""}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute z-10 w-full bg-neutral-secondary-medium text-body border border-default-medium rounded-b-lg shadow-lg max-h-60 overflow-auto font-normal">
          {availableOptions.length > 0 ? (
            availableOptions.map((option, index) => (
              <li
                key={option.value}
                ref={(el) => {
                  if (index === activeIndex && el) {
                    el.scrollIntoView({ block: "nearest" });
                  }
                }}
                className={`px-4 py-2 cursor-pointer text-sm transition-colors ${
                  index === activeIndex
                    ? "bg-brand text-white"
                    : "hover:bg-neutral-light text-body"
                }`}
                onClick={() => handleSelect(option)}
                onMouseMove={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2">No hay resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
