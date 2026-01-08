import TableLayout from "./TableLayout";
import TablePagination from "./TablePagination";
import SearchInput from "./SearchInput";
import Button from "./Button";

const DataTable = ({
  table,
  headers,
  renderRow,
  title,
  rounded,
  actions,
  footer,
  empty,
  colspan,
}) => {
  const { items, search, sort, pagination } = table;

  const headerComponent = headers({
    key: sort.config.key,
    direction: sort.config.direction,
    sort: sort.handleSort,
  });

  const autoColSpan =
    headerComponent.props?.children?.filter(Boolean).length || 1;

  const colspanValue = colspan ?? autoColSpan;

  const defaultActions = (
    <>
      <div className="w-full md:w-1/2">
        <SearchInput
          value={search.query}
          onChange={(e) => search.setQuery(e.target.value)}
          placeholder="Buscar..."
        />
      </div>
      <div className="flex flex-col items-stretch justify-end shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
        <Button variant="secondary" size="S" type="button" onClick={sort.reset}>
          Quitar Orden
        </Button>
      </div>
    </>
  );

  const defaultFooter = (
    <TablePagination
      currentPage={pagination.current}
      pages={pagination.pages}
      records={pagination.records}
      start={pagination.start}
      end={pagination.end}
      onPageChange={pagination.change}
    />
  );

  const defaultEmpty = (
    <tr className="bg-neutral-primary-soft border-b border-default">
      <td colSpan={colspanValue} className="px-6 py-4 text-center">
        No se hay resultados
      </td>
    </tr>
  );

  const actionComponent = actions ?? defaultActions;
  const footerComponent = footer ?? defaultFooter;
  const emptyComponent = empty ?? defaultEmpty;

  return (
    <TableLayout
      title={title}
      rounded={rounded}
      actions={actionComponent}
      footer={footerComponent}
      headers={headerComponent}
    >
      {items.length > 0
        ? items.map((item, index) => renderRow(item, index))
        : emptyComponent}
    </TableLayout>
  );
};

export default DataTable;
