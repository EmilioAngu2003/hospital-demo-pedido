const Status = ({
  status,
  variant = "gray",
  size = "XS",
  bordered = true,
  text,
}) => {
  const statuses = [
    {
      id: "stat-01",
      variant: "gray",
    },
    {
      id: "stat-02",
      variant: "warning",
    },
    {
      id: "stat-03",
      variant: "brand",
    },
    {
      id: "stat-04",
      variant: "success",
    },
    {
      id: "stat-05",
      variant: "danger",
    },
  ];

  const variants = {
    brand: {
      variant: "bg-brand-softer text-fg-brand-strong",
      border: "border border-brand-subtle",
    },
    alternative: {
      variant: "bg-neutral-primary-soft text-heading",
      border: "border border-default",
    },
    gray: {
      variant: "bg-neutral-secondary-medium text-heading",
      border: "border border-default-medium",
    },
    danger: {
      variant: "bg-danger-soft text-fg-danger-strong",
      border: "border border-danger-subtle ",
    },
    success: {
      variant: "bg-success-soft text-fg-success-strong",
      border: "border border-success-subtle ",
    },
    warning: {
      variant: "bg-warning-soft text-fg-warning",
      border: "border border-warning-subtle",
    },
  };

  const sizes = {
    XS: "text-xs px-1.5 py-0.5",
    S: "",
    M: "",
    L: "text-sm px-2 py-1",
    XL: "",
  };

  if (status) {
    const type = statuses.find((stat) => stat.id === status.id);
    variant = type.variant;
    text = status.name;
  }

  return (
    <span
      className={`inline-flex items-center font-medium  rounded ${
        sizes[size]
      } ${variants[variant].variant} ${
        bordered ? variants[variant].border : ""
      }`}
      title={text}
    >
      {text}
    </span>
  );
};

export default Status;
