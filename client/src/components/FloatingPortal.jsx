import React from "react";
import { createPortal } from "react-dom";
import { useFloating, flip, shift, autoUpdate, hide } from "@floating-ui/react";

const FloatingPortal = ({
  children,
  isOpen,
  getTriggerProps,
  getContentProps,
  middleware = [],
  ...props
}) => {
  const optionsMiddleware = [flip(), shift(), hide(), ...middleware];
  const options = {
    open: isOpen,
    whileElementsMounted: autoUpdate,
    middleware: optionsMiddleware,
    ...props,
  };
  const {
    refs: { setReference, setFloating },
    floatingStyles,
    middlewareData,
  } = useFloating(options);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray[0];
  const content = childrenArray[1];

  const { referenceHidden } = middlewareData.hide || {};

  return (
    <>
      {trigger && getTriggerProps
        ? React.cloneElement(trigger, getTriggerProps(setReference))
        : trigger}
      {isOpen &&
        content &&
        createPortal(
          <div
            {...getContentProps?.(setFloating)}
            style={{
              ...floatingStyles,
              zIndex: 9999,
              visibility: referenceHidden ? "hidden" : "visible",
              pointerEvents: isOpen && !referenceHidden ? "auto" : "none",
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default FloatingPortal;
