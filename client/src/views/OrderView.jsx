import { useState, useEffect } from "react";
import { useTable } from "../hooks/useTable";
import TableLayout from "../components/TableLayout";
import TablePagination from "../components/TablePagination";
import SearchInput from "../components/SearchInput";
import SortButton from "../components/SortButton";
import Button from "../components/Button";
import Status from "../components/Status";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderView = ({ id, navigateTo }) => {
  const [order, setOrder] = useState({
    id: "",
    status: { id: null, name: "" },
    template_id: "",
    service_id: "",
    service_name: "",
    shift_id: "",
    shift_name: "",
    items: [],
    others: [],
    comment: "",
    date: "",
  });
  const { displayItems, search, sort, pagination } = useTable(order.items, {
    searchKeys: ["name"],
    rowsPerPage: 10,
  });

  const othersTable = useTable(order.others, {
    searchKeys: ["name"],
    rowsPerPage: 100,
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/order/${id}`, {
          headers: {
            "x-api-key": MY_API_KEY,
          },
        });
        const data = await response.json();

        data.items = data.items.map((item) => ({
          ...item,
          id: crypto.randomUUID(),
        }));
        data.others = data.others.map((item) => ({
          ...item,
          id: crypto.randomUUID(),
        }));
        console.log("🚀 Pedido cargado desde el servidor:", data);
        setOrder(data);
      } catch (error) {
        console.error("❌ Error al cargar pedido:", error);
      }
    };

    fetchOrders();
  }, [id]);

  const info = [
    { label: "Servicio", value: order.service_name },
    { label: "Turno", value: order.shift_name },
    {
      label: "Fecha",
      value: new Date(order.date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    },
    {
      label: "Hora",
      value: new Date(order.date).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      label: "Estado",
      value: order.status.name,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-5xl font-bold text-heading">{order.service_name} </h1>
      <div className="py-5 bg-neutral-primary antialiased">
        <Button onClick={() => navigateTo("/all")}>Volver</Button>
      </div>
      <div className="py-5 text-base">
        {info.map((item, index) => (
          <div key={index}>
            <div className={"flex justify-between items-center "}>
              <span className="text-heading font-medium">{item.label}</span>
              <span className="text-body font-semibold">{item.value}</span>
            </div>
            <hr className="h-px my-2 bg-neutral-quaternary border-0"></hr>
          </div>
        ))}
        <div className="py-2">
          <h2 className="text-2xl mb-2 text-heading">Observacion del Pedido</h2>
          <p className="text-body">{order.comment || "No hay observacion"}</p>
        </div>
      </div>
      <TableLayout
        title={order.service_name}
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
                sortKey="name"
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
        {displayItems.map((item, index) => (
          <tr
            key={index}
            className="bg-neutral-primary-soft border-b border-default"
          >
            <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
              {item.name}
            </td>
            <td className="px-6 py-4">{item.quantity}</td>
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
          othersTable.displayItems.map((item, index) => (
            <tr
              key={index}
              className="bg-neutral-primary-soft border-b border-default"
            >
              <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {item.name}
              </td>
              <td className="px-6 py-4">{item.quantity}</td>
            </tr>
          ))
        )}
      </TableLayout>
    </div>
  );
};

export default OrderView;
