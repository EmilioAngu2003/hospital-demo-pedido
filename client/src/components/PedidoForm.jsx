const PedidoForm = ({
  handleSubmit,
  handleChange,
  pedido,
  departamentos,
  materiales,
}) => (
  <form className="flex flex-col gap-3 text-base" onSubmit={handleSubmit}>
    <div className="flex flex-col gap-2">
      <label className="font-bold">Departamento</label>
      <select
        name="departamento"
        value={pedido.departamento}
        onChange={handleChange}
        className="p-2 border border-gray rounded cursor-pointer"
      >
        {departamentos.map((d) => (
          <option className="bg-base-100" key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-bold">Material</label>
      <select
        name="producto"
        value={pedido.producto}
        onChange={handleChange}
        className="block w-full p-2 border border-gray rounded cursor-pointer"
      >
        {materiales.map((m) => (
          <option className="bg-base-100" key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-bold">Cantidad</label>
      <input
        type="number"
        name="cantidad"
        value={pedido.cantidad}
        onChange={handleChange}
        min="1"
        className="block w-full p-2 border border-gray rounded"
      />
    </div>
    <div className="flex items-center gap-2">
      <input
        id="urgente"
        type="checkbox"
        name="urgente"
        checked={pedido.urgente}
        onChange={handleChange}
        className="cursor-pointer"
      />
      <label className="font-bold cursor-pointer" for="urgente">
        Pedido Urgente
      </label>
    </div>

    <button
      type="submit"
      className="block w-full bg-primary text-white text-base rounded-lg p-2.5 cursor-pointer hover:opacity-90 transition-opacity"
    >
      Enviar Pedido
    </button>
  </form>
);

export default PedidoForm;
