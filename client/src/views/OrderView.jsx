import { useNavigate, useParams } from "react-router-dom";
import { useTable } from "../hooks/useTable";
import { useGetOrder } from "../hooks/useGetOrder";
import Container from "../components/Container";
import SortButton from "../components/SortButton";
import Button from "../components/Button";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import DataTable from "../components/DataTable";

const OrderView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, loading, error } = useGetOrder(id);

  const itemsTable = useTable(order?.items, {
    initialSortKey: "quantity",
    initialSortDirection: "desc",
    searchKeys: ["name"],
    rowsPerPage: 10,
  });

  const othersTable = useTable(order?.others, {
    rowsPerPage: 100,
  });

  if (loading) return <LoadingView />;
  if (error)
    return (
      <ErrorView
        title="Error al cargar el pedido"
        message={error}
        buttonText="Volver"
        onClick={() => navigate("/all")}
      />
    );

  if (!order) return null;

  const itemsHeaders = [
    { name: "Material", key: "name" },
    { name: "Cantidad", key: "quantity" },
  ];
  const othersHeaders = [
    { name: "Material", key: "name" },
    { name: "Cantidad", key: "quantity" },
  ];
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
    <Container>
      <h1 className="text-5xl font-bold text-heading">{order.service_name} </h1>
      <div className="py-5 bg-neutral-primary antialiased">
        <Button onClick={() => navigate("/all")}>Volver</Button>
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
      <DataTable
        title="Materiales Principales"
        items={order.items}
        table={itemsTable}
        rounded="top"
        headers={({ sort, key, direction }) => (
          <>
            {itemsHeaders.map((header, index) => (
              <th key={index} className="px-6 py-3 w-1/2">
                <SortButton
                  label={header.name}
                  isSelected={key === header.key}
                  onSort={() => sort(header.key)}
                  direction={direction}
                />
              </th>
            ))}
          </>
        )}
        renderRow={(item, index) => (
          <tr
            key={index}
            className="bg-neutral-primary-soft border-b border-default"
          >
            <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
              {item.name}
            </td>
            <td className="px-6 py-4">{item.quantity}</td>
          </tr>
        )}
      ></DataTable>
      <DataTable
        table={othersTable}
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
        headers={({ sort, key, direction }) => (
          <>
            {othersHeaders.map((header, index) => (
              <th key={index} className="px-6 py-3 w-1/2">
                <SortButton
                  label={header.name}
                  isSelected={key === header.key}
                  onSort={() => sort(header.key)}
                  direction={direction}
                />
              </th>
            ))}
          </>
        )}
        renderRow={(item, index) => (
          <tr
            key={index}
            className="bg-neutral-primary-soft border-b border-default"
          >
            <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
              {item.name}
            </td>
            <td className="px-6 py-4">{item.quantity}</td>
          </tr>
        )}
        empty={
          <tr>
            <td colSpan="3" className="px-6 py-4 text-center text-heading">
              No hay otros materiales
            </td>
          </tr>
        }
        footer={false}
      ></DataTable>
    </Container>
  );
};

export default OrderView;
