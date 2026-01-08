import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Tabs from "../components/Tabs";
import Button from "../components/Button";

const HomeView = ({ templates, shifts }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 className="text-5xl font-bold text-heading">Realizar Pedido</h1>

      <div className="py-5 bg-neutral-primary antialiased">
        <Button onClick={() => navigate("/all")}>Ver Pedidos</Button>
      </div>

      <Tabs templates={templates} shifts={shifts} />
    </Container>
  );
};

export default HomeView;
