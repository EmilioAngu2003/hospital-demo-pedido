import { useKeyboardHandler } from "./useKeyboardHandler";

export const useVirtualNavigation = (config, actions) => {
  const { listLength, activeIndex, setActiveIndex } = config;

  return useKeyboardHandler(
    (type) => {
      if (type === "close") actions.close?.();
      if (type === "select") actions.onSelect?.();
      if (type === "next") {
        setActiveIndex(Math.min(activeIndex + 1, listLength - 1));
      }
      if (type === "prev") {
        setActiveIndex(Math.max(activeIndex - 1, 0));
      }
      if (type === "delete") actions.onDelete?.();
    },
    {
      Tab: { action: "close", preventDefault: false },
      Backspace: { action: "delete", preventDefault: false },
    }
  );
};

export const useDomNavigation = (containerRef, actions) => {
  return useKeyboardHandler((type) => {
    if (type === "close") actions.close?.();

    if (type === "select") {
      const activeEl = document.activeElement;
      if (containerRef.current?.contains(activeEl)) {
        activeEl.click();
      }
      return;
    }

    const elements = Array.from(
      containerRef.current?.querySelectorAll("a, button:not([disabled])") || []
    );
    const index = elements.indexOf(document.activeElement);

    if (type === "next") (elements[index + 1] || elements[0])?.focus();
    if (type === "prev")
      (elements[index - 1] || elements[elements.length - 1])?.focus();
  });
};
