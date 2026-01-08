import { useRef } from "react";
import { useDisclosure } from "./useDisclosure";
import { useOnClickOutside } from "./useOnClickOutside";

export const useFloatingElement = (initialState = false) => {
  const { isOpen, open, close, toggle } = useDisclosure(initialState);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useOnClickOutside([triggerRef, contentRef], close);

  const mergeRefs = (internalRef, externalRef) => (node) => {
    internalRef.current = node;
    if (typeof externalRef === "function") externalRef(node);
    else if (externalRef) externalRef.current = node;
  };

  return { isOpen, open, close, toggle, triggerRef, contentRef, mergeRefs };
};
