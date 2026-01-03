const Button = ({
  href,
  variant = "primary",
  size = "M",
  className = "",
  children,
  ...rest
}) => {
  const Tag = href ? "a" : "button";
  const variants = {
    primary:
      "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-brand-medium shadow-xs",
    secondary:
      "text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-neutral-tertiary shadow-xs",
    tertiary:
      "text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-neutral-tertiary-soft shadow-xs",
    success:
      "text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-success-medium shadow-xs",
    danger:
      "text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-danger-medium shadow-xs",
    warning:
      "text-white bg-warning box-border border border-transparent hover:bg-warning-strong focus:ring-warning-medium shadow-xs",
    dark: "text-white bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-neutral-tertiary shadow-xs",
    ghost:
      "text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-neutral-tertiary",
  };

  const sizes = {
    XS: "font-medium leading-5 rounded-base text-xs px-3 py-1.5 focus:outline-none",
    S: "font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none",
    M: "font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none",
    L: "font-medium rounded-base text-base px-5 py-3 focus:outline-none",
    XL: "font-medium rounded-base text-base px-6 py-3.5 focus:outline-none",
  };

  const baseStyles = "cursor-pointer";

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <Tag href={href} className={combinedClasses} {...rest}>
      {children}
    </Tag>
  );
};

export default Button;
