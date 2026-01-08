const TablePagination = ({
  currentPage,
  pages,
  start,
  end,
  records,
  onPageChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-3">
      <span className="text-sm font-normal text-body mb-4 md:mb-0 block md:inline md:w-auto">
        Mostrando{" "}
        <span className="font-semibold text-heading">
          {start} - {end}
        </span>{" "}
        de <span className="font-semibold text-heading">{records}</span>
      </span>
      <ul className="flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium font-medium rounded-s-base text-sm px-3 h-9 ${
              currentPage === 1
                ? "opacity-50 focus:outline-none"
                : "cursor-pointer hover:bg-neutral-tertiary-medium hover:text-heading"
            }`}
          >
            Anterior
          </button>
        </li>
        {[...Array(pages)].map((_, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onPageChange(i + 1)}
              disabled={currentPage === i + 1}
              className={`flex items-center justify-center w-9 h-9 border border-default-medium ${
                currentPage === i + 1
                  ? "bg-brand-softer text-fg-brand font-medium text-sm w-9 h-9 focus:outline-none"
                  : "cursor-pointer bg-neutral-secondary-medium text-body hover:bg-neutral-tertiary-medium box-border border border-default-medium hover:text-heading font-medium"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pages || pages === 0}
            className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium font-medium rounded-e-base text-sm px-3 h-9  ${
              currentPage === pages || pages === 0
                ? "opacity-50 focus:outline-none"
                : "cursor-pointer hover:bg-neutral-tertiary-medium hover:text-heading"
            }`}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TablePagination;
