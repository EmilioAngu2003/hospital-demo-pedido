import { useCallback } from "react";

export const useFocus = (open, close) => {
  const onFocus = useCallback(
    (e) => {
      if (e.target.matches(":focus-visible")) {
        open();
      }
    },
    [open]
  );

  const onBlur = useCallback(
    (e, containerRef) => {
      if (!containerRef.current?.contains(e.relatedTarget)) {
        close();
      }
    },
    [close]
  );

  return { onFocus, onBlur };
};
