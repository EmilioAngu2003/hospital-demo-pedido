import { forwardRef } from "react";

const Container = forwardRef(
  ({ children, className = "", withPadding = true, size = "xl" }, ref) => {
    const maxWildcards = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-7xl",
      full: "max-w-full",
    };

    const maxWidth = maxWildcards[size] || maxWildcards.xl;
    const paddingX = withPadding
      ? "px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4"
      : "";

    return (
      <div ref={ref} className={`mx-auto ${maxWidth} ${paddingX} ${className}`}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
