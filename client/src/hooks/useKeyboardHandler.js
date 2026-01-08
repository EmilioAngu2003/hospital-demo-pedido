import { useCallback, useMemo } from "react";

const DEFAULT_KEY_MAP = {
  ArrowDown: "next",
  ArrowUp: "prev",
  Escape: "close",
  Enter: "select",
  " ": { action: "select", preventDefault: true },
};

export const useKeyboardHandler = (onAction, customKeyMap = {}) => {
  const keyMap = useMemo(
    () => ({ ...DEFAULT_KEY_MAP, ...customKeyMap }),
    [customKeyMap]
  );
  return useCallback(
    (e) => {
      const entry = keyMap[e.key];
      if (entry) {
        const actionName = typeof entry === "string" ? entry : entry.action;
        const shouldPrevent =
          typeof entry === "string" ? true : entry.preventDefault !== false;
        if (shouldPrevent) {
          e.preventDefault();
        }
        onAction(actionName);
      }
    },
    [onAction, keyMap]
  );
};
