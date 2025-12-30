const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 3001;

dotenv.config({ path: ".env" });

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
    res
      .status(401)
      .json({ error: "Acceso no autorizado: Clave API inválida o faltante." });
  }
};

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando para la demo!");
});

app.post("/api/pedidos", apiKeyAuth, (req, res) => {
  const nuevoPedido = req.body;
  console.log("Pedido Recibido:", nuevoPedido);

  res.status(201).json({
    message: "Pedido registrado con éxito",
    data: nuevoPedido,
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
});
