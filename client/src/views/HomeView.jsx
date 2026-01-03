import Tabs from "../components/Tabs";
import Button from "../components/Button";

const HomeView = ({ templates, shifts, navigateTo }) => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-5xl font-bold text-heading">Realizar Pedido</h1>

      <div className="py-5 bg-neutral-primary antialiased">
        <Button onClick={() => navigateTo("/all")}>Ver Pedidos</Button>
      </div>

      <Tabs templates={templates} shifts={shifts} />
    </div>
  );
};

export default HomeView;
