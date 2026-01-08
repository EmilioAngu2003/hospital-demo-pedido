import { useEffect, useMemo, useRef } from "react";
import { useFloatingElement } from "./useFloatingElement";
import { useDomNavigation } from "./useKeyboardNavigation";

export const useDropdown = () => {
  const common = useFloatingElement(false);
  const { contentRef, triggerRef, isOpen, close, toggle, open, mergeRefs } =
    common;

  const isMounted = useRef(false);

  const handleKeyDown = useDomNavigation(common.contentRef, {
    close: common.close,
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isOpen) {
      const frameId = requestAnimationFrame(() => {
        const firstEl = contentRef.current?.querySelector("a, button");
        firstEl?.focus();
      });
      return () => cancelAnimationFrame(frameId);
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen, contentRef, triggerRef]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getTriggerProps = useMemo(
    () => (externalRef) => ({
      ref: mergeRefs(triggerRef, externalRef),
      onClick: (e) => {
        e.preventDefault();
        toggle();
      },
      onKeyDown: (e) => {
        if (!isOpen && ["ArrowDown", "Enter", " "].includes(e.key)) {
          e.preventDefault();
          open();
        }
      },
      "aria-expanded": isOpen,
      "aria-haspopup": "menu",
    }),
    [isOpen, open, toggle, mergeRefs, triggerRef]
  );

  const getContentProps = useMemo(
    () => (externalRef) => ({
      ref: mergeRefs(contentRef, externalRef),
      tabIndex: -1,
      onKeyDown: handleKeyDown,
    }),
    [contentRef, handleKeyDown, mergeRefs]
  );

  return {
    isOpen,
    close,
    getTriggerProps,
    getContentProps,
  };
};
