import { useTable } from "../hooks/useTable";
import TableLayout from "./TableLayout";
import QuantityCounter from "./QuantityCounter";
import Button from "./Button";
import SortButton from "./SortButton";
import OthersRow from "./OthersRow";
import TablePagination from "./TablePagination";
import SearchInput from "./SearchInput";

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
      <TableLayout
        title={title}
        rounded="top"
        actions={
          <>
            <div className="w-full md:w-1/2">
              <SearchInput
                onChange={(val) => {
                  search.setQuery(val);
                  pagination.change(1);
                }}
                placeholder={"Buscar un Material"}
              />
            </div>
            <Button
              variant="secondary"
              size="S"
              onClick={sort.reset}
              type="button"
            >
              Quitar Orden
            </Button>
          </>
        }
        headers={
          <>
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
          </>
        }
        footer={
          <TablePagination
            currentPage={pagination.current}
            pages={pagination.pages}
            records={pagination.records}
            start={pagination.start}
            end={pagination.end}
            onPageChange={pagination.change}
          />
        }
      >
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
      </TableLayout>
      <TableLayout
        rounded="bottom"
        actions={
          <>
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
          </>
        }
        headers={
          <>
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
          </>
        }
      >
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
      </TableLayout>
    </>
  );
};

export default MaterialTable;
