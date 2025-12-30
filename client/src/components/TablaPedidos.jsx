const TablaPedidos = ({ pedidos }) => (
  <div className="w-full overflow-x-auto rounded-lg border border-gray">
    <table className="w-full text-left text-sm md:text-base border-collapse">
      <thead className="bg-primary text-white">
        <tr className="*:p-3">
          <th>ID</th>
          <th>Departamento</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Urgente</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.length === 0 ? (
          <tr>
            <td colSpan="6" className="p-8 text-center border-gray border">
              No hay pedidos enviados.
            </td>
          </tr>
        ) : (
          pedidos.map((p) => (
            <tr
              key={p.id}
              className={`border-b border-gray transition-colors hover:bg-gray/5`}
            >
              <td className="p-3 border-r border-gray/10">#{p.id % 1000}</td>
              <td className="p-3 border-r border-gray/10">{p.departamento}</td>
              <td className="p-3 border-r border-gray/10 font-medium">
                {p.producto}
              </td>
              <td className="p-3 border-r border-gray/10 text-center">
                {p.cantidad}
              </td>
              <td className="p-3 border-r border-gray/10">
                {p.urgente ? (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-sm text-xs">
                    🚨 SÍ
                  </span>
                ) : (
                  <span className="text-gray/50 italic">No</span>
                )}
              </td>
              <td className="p-3 capitalize">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {p.estado}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default TablaPedidos;
