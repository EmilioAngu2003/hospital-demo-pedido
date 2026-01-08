import { useState, useCallback, useRef, useEffect } from "react";

export const useDisclosure = (initialState = false, callbacks = {}) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const timeoutRef = useRef(null);

  const callbacksRef = useRef(callbacks);
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
    callbacksRef.current.onOpen?.();
  }, []);

  const close = useCallback((delay = 0) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const executeClose = () => {
      setIsOpen(false);
      callbacksRef.current.onClose?.();
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(executeClose, delay);
    } else {
      executeClose();
    }
  }, []);

  const toggle = useCallback(() => {
    isOpen ? close() : open();
  }, [isOpen, open, close]);

  return { isOpen, open, close, toggle, setIsOpen };
};
