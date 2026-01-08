import { useEffect } from "react";

export const useOnClickOutside = (refs, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      const isClickInside = refsArray.some(
        (ref) => ref.current && ref.current.contains(event.target)
      );

      if (isClickInside) return;

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler]);
};
