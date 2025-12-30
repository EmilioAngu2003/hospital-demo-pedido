const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Pedido = require("./models/Pedido");
const OPCIONES_PEDIDO = require("./constants");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("🔴 Error de conexión a MongoDB:", err));

const API_KEY = process.env.API_KEY_SECRET;
if (!API_KEY) {
  console.error("🔴 FATAL ERROR: API_KEY_SECRET no está definida.");
  process.exit(1);
}

const apiKeyAuth = (req, res, next) => {
  const clientApiKey = req.header("x-api-key");
  if (clientApiKey && clientApiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Acceso no autorizado" });
  }
};

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando para la demo!");
});

app.post("/api/pedidos", apiKeyAuth, async (req, res) => {
  try {
    console.log("Pedido Recibido:", req.body);

    const { material, cantidad, urgente, usuario, servicio } = req.body;

    const nuevoPedido = new Pedido({
      material,
      cantidad,
      urgente,
      usuario,
      servicio,
    });

    const pedidoGuardado = await nuevoPedido.save();

    console.log("Pedido guardado:", pedidoGuardado);

    res.status(201).json({
      mensaje: "Pedido registrado con éxito",
      pedido: pedidoGuardado,
    });
  } catch (error) {
    console.error("Error al guardar:", error);
    res.status(400).json({ message: "Error al guardar el pedido" });
  }
});

app.get("/api/pedidos", apiKeyAuth, async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

app.get("/api/config/opciones", apiKeyAuth, (req, res) => {
  res.json(OPCIONES_PEDIDO);
});

app.listen(port, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
});
