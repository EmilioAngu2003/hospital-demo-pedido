const TableLayout = ({
  title,
  actions,
  children,
  footer,
  headers,
  rounded = "both",
}) => {
  const roundedClass = {
    top: "rounded-t-base",
    bottom: "rounded-b-base mb-4",
    both: "rounded-base mb-4",
    none: "",
  }[rounded];

  return (
    <div
      className={`relative overflow-hidden bg-neutral-primary-soft shadow-xs border border-default ${roundedClass} `}
    >
      <div className="text-sm text-body bg-neutral-secondary-medium">
        {title && (
          <div className="px-6 py-4 border-b border-default-medium flex items-center justify-center">
            <h3 className="text-heading font-semibold">{title}</h3>
          </div>
        )}
        {actions && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 border-b border-default-medium">
            {actions}
          </div>
        )}
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table className="w-full text-sm text-left rtl:text-right text-body border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 shadow-sm text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            {headers && <tr>{headers}</tr>}
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>

      {footer && (
        <div className="border-t border-default-medium p-4 bg-neutral-primary-soft">
          {footer}
        </div>
      )}
    </div>
  );
};

export default TableLayout;
