import { useMemo } from "react";
import { useFloatingElement } from "./useFloatingElement";
import { useHover } from "./useHover";
import { useFocus } from "./useFocus";

export const usePopover = () => {
  const common = useFloatingElement(false);
  const { isOpen, open, close, toggle, triggerRef, contentRef, mergeRefs } =
    common;

  const hoverProps = useHover(open, close);
  const { onFocus, onBlur } = useFocus(open, close);

  const getTriggerProps = useMemo(
    () => (externalRef) => ({
      ref: mergeRefs(triggerRef, externalRef),
      onClick: toggle,
      onFocus,
      onBlur: (e) => onBlur(e, contentRef),
      "aria-expanded": isOpen,
      ...hoverProps,
    }),
    [
      isOpen,
      toggle,
      onFocus,
      onBlur,
      hoverProps,
      mergeRefs,
      triggerRef,
      contentRef,
    ]
  );

  const getContentProps = useMemo(
    () => (externalRef) => ({
      ref: mergeRefs(contentRef, externalRef),
      tabIndex: -1,
      onBlur: (e) => onBlur(e, triggerRef),
      ...hoverProps,
    }),
    [mergeRefs, contentRef, triggerRef, onBlur, hoverProps]
  );

  return { isOpen, getTriggerProps, getContentProps };
};
