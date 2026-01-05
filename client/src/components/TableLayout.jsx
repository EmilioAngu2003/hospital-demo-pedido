const TableLayout = ({
  title,
  actions,
  children,
  footer,
  headers,
  colSpan = 3,
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
      className={`relative overflow-x-auto bg-neutral-primary-soft shadow-xs border border-default ${roundedClass} `}
    >
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
          {title && (
            <tr>
              <th
                colSpan={colSpan}
                className="px-6 py-4 border-b-neutral-quaternary border-b"
              >
                <div className="flex items-center justify-center">
                  <h3 className="text-heading">{title}</h3>
                </div>
              </th>
            </tr>
          )}
          {actions && (
            <tr>
              <th colSpan={colSpan}>
                <div className="flex flex-col items-center justify-between px-4 py-3 space-y-3 md:flex-row md:space-y-0 md:space-x-4 border-b-neutral-quaternary border-b">
                  {actions}
                </div>
              </th>
            </tr>
          )}
          {headers && <tr>{headers}</tr>}
        </thead>
        <tbody>{children}</tbody>
        {footer && (
          <tfoot>
            <tr>
              <td colSpan="100%">{footer}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default TableLayout;
