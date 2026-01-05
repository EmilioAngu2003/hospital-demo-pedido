const TablaPedidos = ({ pedidos, canEdit, onEdit, onDelete, onViewUser }) => (
  <div className="w-full overflow-x-auto rounded-lg border border-gray">
    <table className="w-full text-left text-sm md:text-base border-collapse">
      <thead className="bg-primary text-white">
        <tr className="*:p-3">
          <th>ID</th>
          <th>Servicio</th>
          <th>Material</th>
          <th>Cantidad</th>
          <th>Urgente</th>
          <th>Estado</th>
          {canEdit && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {pedidos.length === 0 ? (
          <tr>
            <td
              colSpan={canEdit ? 7 : 6}
              className="p-8 text-center border-gray border"
            >
              No hay pedidos enviados.
            </td>
          </tr>
        ) : (
          pedidos.map((p) => (
            <tr
              key={p.id}
              className={`border-b border-gray transition-colors hover:bg-gray/5`}
            >
              <td className="p-3 border-r border-gray/20">
                ...{p.id.slice(-6).toUpperCase()}
              </td>
              <td className="p-3 border-r border-gray/20">{p.servicio}</td>
              <td className="p-3 border-r border-gray/20 font-medium">
                {p.material}
              </td>
              <td className="p-3 border-r border-gray/20">{p.cantidad}</td>
              <td className="p-3 border-r border-gray/20">
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
              {canEdit && (
                <td className="p-3 border-l border-gray/20 flex gap-2">
                  <button
                    className="text-white bg-primary p-1 rounded cursor-pointer hover:opacity-80"
                    onClick={() => onEdit(p)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-edit"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button
                    className="text-white bg-gray p-1 rounded cursor-pointer hover:opacity-80"
                    onClick={() => onViewUser(p)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>
                  <button
                    className="text-white bg-danger p-1 rounded cursor-pointer hover:opacity-80"
                    onClick={() => onDelete(p)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-trash"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default TablaPedidos;
