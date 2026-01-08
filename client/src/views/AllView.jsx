import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetOrders } from "../hooks/useGetOrders";
import Container from "../components/Container";
import Button from "../components/Button";
import TableLayout from "../components/TableLayout";
import SortButton from "../components/SortButton";
import TagSelect from "../components/TagSelect";
import DateRangePicker from "../components/DateRangePicker";
import TablePagination from "../components/TablePagination";
import Popever from "../components/Popever";
import Status from "../components/Status";
import DropdownMenu from "../components/DropdownMenu";
import SearchInput from "../components/SearchInput";
import LoadingIcon from "../components/LoadingIcon";

const AllView = ({ shifts, statuses, services }) => {
  const navigate = useNavigate();
  const getToday = () => new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    services_id: [],
    shifts_id: [],
    statuses_id: [],
    search: "",
    date_start: getToday(),
    date_end: getToday(),
    page: 1,
    step: 10,
    key: "date",
    direction: "desc",
  });

  const { data, loading, error } = useGetOrders(filters);

  const handleSort = (newKey) => {
    const isSameKey = filters.key === newKey;

    setFilters({
      ...filters,
      key: newKey,
      direction: isSameKey && filters.direction === "desc" ? "asc" : "desc",
      page: 1,
    });
  };

  const handleFilterChange = (key, selectedIds) => {
    setFilters((prev) => ({ ...prev, [key]: selectedIds, page: 1 }));
  };

  const handleDateChange = (start, end) => {
    setFilters((prev) => ({
      ...prev,
      date_start: start,
      date_end: end,
      page: 1,
    }));
  };

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };

  const clearKey = () => {
    setFilters((prev) => ({ ...prev, key: null }));
  };

  const tagSelect = [
    {
      label: "Servicios",
      options: services.map((s) => ({
        label: s.name,
        value: s.id,
      })),
      placeholder: "Selecciona un servicio",
      onChange: (ids) => handleFilterChange("services_id", ids),
    },
    {
      label: "Turnos",
      options: shifts.map((s) => ({
        label: s.name,
        value: s.id,
      })),
      placeholder: "Selecciona un turno",
      onChange: (ids) => handleFilterChange("shifts_id", ids),
    },
    {
      label: "Estados",
      options: statuses.map((s) => ({
        label: s.name,
        value: s.id,
      })),
      placeholder: "Selecciona un estado",
      onChange: (ids) => handleFilterChange("statuses_id", ids),
    },
  ];

  const headers = [
    { label: "ID", key: "id" },
    { label: "Servicio", key: "service_name" },
    { label: "Turno", key: "shift_name" },
    { label: "Fecha", key: "date" },
    { label: "Estado", key: "status" },
  ];

  return (
    <Container>
      <h1 className="text-5xl font-bold text-heading">Todos los Pedidos</h1>

      <div className="py-5 bg-neutral-primary antialiased">
        <Button onClick={() => navigate("/")}>Hacer Pedidos</Button>
      </div>
      <TableLayout
        colSpan={7}
        actions={
          <div className="flex flex-col gap-3 w-full">
            <div>
              <DateRangePicker
                onChange={handleDateChange}
                initialStart={filters.date_start}
                initialEnd={filters.date_end}
              />
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full gap-x-4 gap-y-3">
              {tagSelect.map((ts, i) => (
                <TagSelect
                  key={i}
                  label={ts.label}
                  options={ts.options}
                  placeholder={ts.placeholder}
                  onChange={ts.onChange}
                />
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-y-3">
              <div className="w-full md:w-1/2">
                <SearchInput
                  label="Buscar por un material"
                  value={filters.search}
                  placeholder={"Buscar por un material"}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              {error && (
                <Status text="Hubo un error filtrando" variant="danger" />
              )}
              {loading && (
                <div className="animate-pulse">
                  <Status text="Cargando pedidos" variant="gray" />
                  {/* <LoadingIcon variant="quaternary" /> */}
                </div>
              )}
              <div className="flex flex-col items-stretch justify-between w-full md:w-auto">
                <Button
                  variant="secondary"
                  size="S"
                  type="button"
                  onClick={clearKey}
                >
                  Quitar Orden
                </Button>
              </div>
            </div>
          </div>
        }
        headers={
          <>
            {headers.map((h, i) => (
              <th className="px-6 py-3" key={i}>
                <SortButton
                  label={h.label}
                  isSelected={data.config.key === h.key}
                  onSort={() => handleSort(h.key)}
                  direction={data.config.direction}
                />
              </th>
            ))}
            <th className="px-6 py-3">Observacion</th>
            <th className="px-6 py-3">Acciones</th>
          </>
        }
        footer={
          <TablePagination
            currentPage={filters.page}
            pages={data.pages}
            records={data.records}
            start={data.start}
            end={data.end}
            onPageChange={(newPage) =>
              setFilters({ ...filters, page: newPage })
            }
          />
        }
      >
        {data.orders?.length > 0 ? (
          data.orders.map((order) => (
            <tr key={order._id} className="border-b border-default">
              <td className="px-6 py-4">
                {order._id.substring(order._id.length - 6)}
              </td>
              <td className="px-6 py-4">{order.service_name}</td>
              <td className="px-6 py-4">{order.shift_name}</td>
              <td className="px-6 py-4">
                {new Date(order.date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <Status status={order.status} />
              </td>
              <td className="px-6 py-4">
                <Popever comment={order.comment} />
              </td>
              <td className="px-6 py-4">
                <DropdownMenu
                  options={[
                    {
                      label: "Ver",
                      href: `/order/${order._id}`,
                    },
                  ]}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr className="bg-neutral-primary-soft border-b border-default">
            <td colSpan={7} className="px-6 py-4 text-center">
              No se encontraron pedidos con estos filtros
            </td>
          </tr>
        )}
      </TableLayout>
    </Container>
  );
};

export default AllView;
