import { useTable } from "../hooks/useTable";
import QuantityCounter from "./QuantityCounter";
import Button from "./Button";
import SortButton from "./SortButton";
import OthersRow from "./OthersRow";
import TablePagination from "./TablePagination";

const MaterialTable = ({
  title,
  items,
  onQuantitiesChange,
  others,
  onOthersChange,
}) => {
  const { displayItems, search, sort, pagination } = useTable(items, {
    searchKeys: ["material"],
    rowsPerPage: 10,
  });

  const othersTable = useTable(others, {
    searchKeys: ["material"],
    rowsPerPage: 100,
  });

  return (
    <>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-t-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th
                colSpan={3}
                className="px-6 py-4 border-b-neutral-quaternary border-b"
              >
                <div className="flex items-center justify-center">
                  <h3 className="text-heading">{title}</h3>
                </div>
              </th>
            </tr>
            <tr>
              <th colSpan={3}>
                <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="simple-search" className="sr-only">
                      Buscar Material
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-body"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        onChange={(e) => {
                          search.setQuery(e.target.value);
                          pagination.change(1);
                        }}
                        className="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                        placeholder="Buscar material..."
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch justify-end shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <Button
                      variant="secondary"
                      size="S"
                      onClick={sort.reset}
                      type="button"
                    >
                      Quitar Orden
                    </Button>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 w-1/2">
                <SortButton
                  label="Material"
                  sortKey="material"
                  config={sort.config}
                  onSort={sort.handleSort}
                />
              </th>
              <th className="px-6 py-3 w-1/4">
                <SortButton
                  label="Stock"
                  sortKey="stock"
                  config={sort.config}
                  onSort={sort.handleSort}
                />
              </th>
              <th className="px-6 py-3 w-1/4">
                <SortButton
                  label="Cantidad"
                  sortKey="quantity"
                  config={sort.config}
                  onSort={sort.handleSort}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item) => (
              <tr
                key={item.id}
                className="bg-neutral-primary-soft border-b border-default"
              >
                <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                  {item.material}
                </td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">
                  <QuantityCounter
                    value={item.quantity || ""}
                    min={0}
                    step={1}
                    placeholder="0"
                    onChange={(val) => onQuantitiesChange(item.id, val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">
                <TablePagination
                  currentPage={pagination.current}
                  pages={pagination.pages}
                  records={pagination.records}
                  start={pagination.start}
                  end={pagination.end}
                  onPageChange={pagination.change}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-b-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th colSpan="3">
                <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="w-full md:w-1/2">
                    <h3 className="text-heading">Otros Materiales</h3>
                  </div>
                  <div className="flex flex-col items-stretch justify-end shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <Button
                      onClick={() => onOthersChange.add()}
                      variant="primary"
                      size="S"
                      type="button"
                    >
                      Añadir Material
                    </Button>
                    <Button
                      variant="secondary"
                      size="S"
                      onClick={othersTable.sort.reset}
                      type="button"
                    >
                      Quitar Orden
                    </Button>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 w-1/2">
                <SortButton
                  label="Material"
                  sortKey="name"
                  config={othersTable.sort.config}
                  onSort={othersTable.sort.handleSort}
                />
              </th>
              <th className="px-6 py-3 w-1/4">
                <SortButton
                  label="Cantidad"
                  sortKey="quantity"
                  config={othersTable.sort.config}
                  onSort={othersTable.sort.handleSort}
                />
              </th>
              <th className="px-6 py-3 w-1/4">
                <div className="flex items-center">Acciones</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {othersTable.displayItems.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-heading">
                  No hay otros materiales
                </td>
              </tr>
            ) : (
              othersTable.displayItems.map((item) => (
                <OthersRow
                  key={item.id}
                  item={item}
                  onUpdate={onOthersChange.update}
                  onRemove={onOthersChange.remove}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MaterialTable;
