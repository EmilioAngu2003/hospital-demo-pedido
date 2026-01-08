import { useRef, useId, useEffect } from "react";
import { offset, size } from "@floating-ui/react";
import { useMultiSelect } from "../hooks/useMultiSelect";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import FloatingPortal from "./FloatingPortal";
import Button from "./Button";

const TagSelect = ({
  options,
  onChange,
  label,
  placeholder = "Seleccionar...",
}) => {
  const id = useId();
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const multi = useMultiSelect({ options, onChange });

  useOnClickOutside([containerRef, dropdownRef], () => {
    multi.close();
    multi.setActiveIndex(-1);
  });

  useEffect(() => {
    if (multi.isOpen && multi.activeIndex !== -1) {
      const activeEl =
        dropdownRef.current?.querySelector(`[data-active="true"]`);
      activeEl?.scrollIntoView({
        block: "nearest",
        behavior: "auto",
      });
    }
  }, [multi.activeIndex, multi.isOpen]);

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      inputRef.current?.focus();
      if (!multi.isOpen) multi.open();
    }
  };

  const middleware = [
    offset(1),
    size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      },
    }),
  ];

  return (
    <div className="relative w-full max-w-md">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}

      <FloatingPortal
        isOpen={multi.isOpen}
        middleware={middleware}
        placement="bottom-start"
        getTriggerProps={(ref) => ({ ref })}
        getContentProps={(ref) => ({
          ref: (node) => {
            ref(node);
            dropdownRef.current = node;
          },
        })}
      >
        <div
          className={`relative flex flex-wrap gap-2.5 w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium rounded-base focus-within:ring-1 focus-within:ring-brand cursor-text ${
            multi.selected.length > 0 ? "pb-10" : "pb-8"
          }`}
          role="combobox"
          aria-expanded={multi.isOpen}
          onClick={handleContainerClick}
        >
          {multi.selected.map((item) => (
            <Button
              key={item.value}
              variant="tertiary"
              size="XS"
              type="button"
              className="shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                multi.handleDeselect(item.value);
              }}
            >
              {item.label} <span className="ms-1 text-xs opacity-60">×</span>
            </Button>
          ))}
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={multi.query}
            onChange={(e) => multi.onQueryChange(e.target.value)}
            onFocus={() => multi.open()}
            onKeyDown={multi.handleKeyDown}
            placeholder={
              multi.availableOptions.length > 0
                ? placeholder
                : "No hay mas opciones"
            }
            className="absolute bottom-0 mb-2.5 flex-1 outline-none bg-transparent min-w-30 placeholder:text-body"
            autoComplete="off"
          />
        </div>
        <ul className="bg-neutral-secondary-medium border border-default-medium rounded-base shadow-lg max-h-60 overflow-auto min-w-50 w-full">
          {multi.availableOptions.length > 0 ? (
            multi.availableOptions.map((option, index) => (
              <li
                key={option.value}
                data-active={index === multi.activeIndex}
                className={`px-4 py-2 cursor-pointer text-sm ${
                  index === multi.activeIndex
                    ? "bg-brand text-white"
                    : "hover:bg-neutral-light"
                }`}
                onClick={() => multi.handleSelect(option)}
                onMouseMove={() => multi.setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500">
              No hay resultados
            </li>
          )}
        </ul>
      </FloatingPortal>
    </div>
  );
};

export default TagSelect;
