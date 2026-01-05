import { useState, useEffect } from "react";
import Button from "../components/Button";
import TableLayout from "../components/TableLayout";
import SortButton from "../components/SortButton";
import MultiSelect from "../components/MultiSelect";
import DateRangePicker from "../components/DateRangePicker";
import TablePagination from "../components/TablePagination";
import Popever from "../components/Popever";
import Status from "../components/Status";
import DropdownMenu from "../components/DropdownMenu";
import SearchInput from "../components/SearchInput";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllView = ({ shifts, statuses, services, navigateTo }) => {
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

  const [data, setData] = useState({
    orders: [],
    records: 0,
    pages: 0,
    start: 0,
    end: 0,
    config: { key: "date", direction: "desc" },
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("🚀 Filtros aplicados:", filters);

        const response = await fetch(`${API_BASE_URL}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": MY_API_KEY,
          },
          body: JSON.stringify(filters),
        });
        const result = await response.json();
        console.log("🚀 Pedidos obtenidos:", result);
        setData(result);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };
    fetchOrders();
  }, [filters]);

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

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-5xl font-bold text-heading">Todos los Pedido</h1>

      <div className="py-5 bg-neutral-primary antialiased">
        <Button onClick={() => navigateTo("/")}>Hacer Pedidos</Button>
      </div>
      <TableLayout
        colSpan={7}
        actions={
          <div className="w-full">
            <div>
              <DateRangePicker
                onChange={handleDateChange}
                initialStart={filters.date_start}
                initialEnd={filters.date_end}
              />
            </div>
            <div className="grid grid-cols-3 w-full gap-4 py-3">
              <MultiSelect
                label="Servicios"
                options={services.map((service) => ({
                  label: service.name,
                  value: service.id,
                }))}
                placeholder="Selecciona un servicio"
                onChange={(ids) => handleFilterChange("services_id", ids)}
              />
              <MultiSelect
                label="Turnos"
                options={shifts.map((shift) => ({
                  label: shift.name,
                  value: shift.id,
                }))}
                placeholder="Selecciona un turno"
                onChange={(ids) => handleFilterChange("shifts_id", ids)}
              />
              <MultiSelect
                label="Estados"
                options={statuses.map((status) => ({
                  label: status.name,
                  value: status.id,
                }))}
                placeholder="Seleccionar un estado"
                onChange={(ids) => handleFilterChange("statuses_id", ids)}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pt-3">
              <div className="w-full md:w-1/2">
                <SearchInput placeholder={"Buscar por un material"} />
              </div>
              <Button variant="secondary" size="S" type="button">
                Quitar Orden
              </Button>
            </div>
          </div>
        }
        headers={
          <>
            <th className="px-6 py-3">
              <SortButton
                label="ID"
                sortKey="id"
                config={data.config}
                onSort={handleSort}
              />
            </th>
            <th className="px-6 py-3">
              <SortButton
                label="Servicio"
                sortKey="service_name"
                config={data.config}
                onSort={handleSort}
              />
            </th>
            <th className="px-6 py-3">
              <SortButton
                label="Turno"
                sortKey="shift_name"
                config={data.config}
                onSort={handleSort}
              />
            </th>
            <th className="px-6 py-3">
              <SortButton
                label="Fecha"
                sortKey="date"
                config={data.config}
                onSort={handleSort}
              />
            </th>
            <th className="px-6 py-3">
              <SortButton
                label="Estado"
                sortKey="status"
                config={data.config}
                onSort={handleSort}
              />
            </th>
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
        {data.orders.length > 0 ? (
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
                      onClick: () => navigateTo(`/order/${order._id}`),
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
    </div>
  );
};

export default AllView;
