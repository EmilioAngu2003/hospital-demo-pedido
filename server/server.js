const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Pedido = require("./models/Pedido");
const Order = require("./models/Order");
const {
  MATERIALS_BASE,
  SERVICES_BASE,
  TEMPLATES,
  STATUSES_BASE,
  SHIFTS_BASE,
} = require("./constants");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

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

const adminAuth = (req, res, next) => {
  const userDni = req.header("x-user-dni");
  const adminWhitelist = process.env.ADMIN_WHITELIST.split(",");
  if (adminWhitelist.includes(userDni)) {
    next();
  } else {
    res.status(403).json({ error: "Acceso no autorizado" });
  }
};

app.post("/api/auth/admin", apiKeyAuth, (req, res) => {
  const { user, password } = req.body;

  console.log("🚀 Credenciales recibidas:", user, password);

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (user === adminUser && password === adminPassword) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_API_KEY, {
      expiresIn: "8h",
    });
    return res.json({ token });
  }

  res.status(401).json({ error: "Credenciales inválidas" });
});

app.patch("/api/pedidos/:id", apiKeyAuth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { estado: estado },
      { new: true }
    );

    if (!pedidoActualizado) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({
      mensaje: "Estado actualizado correctamente",
      pedido: pedidoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.delete("/api/pedidos/:id", apiKeyAuth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await Pedido.findByIdAndDelete(id);
    res.json({ mensaje: "Pedido eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el pedido" });
  }
});

app.get("/api/templates", apiKeyAuth, (req, res) => {
  const data = TEMPLATES.map((template) => {
    const servicio = SERVICES_BASE.find((s) => s.id === template.service_id);

    return {
      id: template.id,
      service_id: template.service_id,
      service: servicio.name,
      items: template.items.map((item) => {
        const material = MATERIALS_BASE.find((m) => m.id === item.material_id);
        return {
          id: item.id,
          material_id: item.material_id,
          material: material.name,
          stock: item.stock,
        };
      }),
    };
  });
  res.json(data);
});

app.get("/api/statuses", apiKeyAuth, (req, res) => {
  try {
    res.json(STATUSES_BASE);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los estados" });
  }
});

app.get("/api/shifts", apiKeyAuth, (req, res) => {
  try {
    res.json(SHIFTS_BASE);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
});

app.get("/api/services", apiKeyAuth, (req, res) => {
  try {
    res.json(SERVICES_BASE);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
});

app.post("/api/order", apiKeyAuth, async (req, res) => {
  console.log("🚀 Payload recibido:", req.body);

  try {
    const { template_id, service_id, shift_id, items, others, comment } =
      req.body;

    if (items.length === 0 && others.length === 0) {
      return res
        .status(400)
        .json({ error: "No puede enviar un pedido sin materiales" });
    }

    const hasInvalidQuantity = others.some((i) => i.quantity <= 0);
    if (hasInvalidQuantity) {
      return res.status(400).json({
        error: "Los otros materiales deben tener una cantidad mayor a 0",
      });
    }

    const template = TEMPLATES.find((t) => t.id === template_id);
    const service = SERVICES_BASE.find((s) => s.id === service_id);
    const shift = SHIFTS_BASE.find((s) => s.id === shift_id);

    if (!template || !service || !shift) {
      return res.status(400).json({ error: "Referencias no encontradas" });
    }

    const namedItems = template.items.map((t_item) => {
      const material = MATERIALS_BASE.find((m) => m.id === t_item.material_id);
      const exist = items.find((i) => i.id === t_item.id);
      const quantity = exist ? exist.quantity : 0;
      return {
        name: material.name,
        quantity: quantity < 0 ? 0 : quantity,
      };
    });

    const initialStatus = STATUSES_BASE.find((s) => s.id === "stat-01");

    const newOrder = new Order({
      template_id,
      template_name: template.name,
      service_id,
      service_name: service.name,
      shift_id,
      shift_name: shift.name,
      items: namedItems,
      others: others || [],
      status: initialStatus,
      comment: comment || "",
    });

    const orderSaved = await newOrder.save();

    console.log("✅ Nuevo pedido guardado en DB:", orderSaved);

    res.status(201).json({
      message: "Pedido registrado con éxito",
      order: orderSaved,
    });
  } catch (error) {
    console.error("🔴 Error al guardar el pedido:", error);
    res.status(500).json({ error: "Error interno al procesar el pedido" });
  }
});

app.post("/api/orders", apiKeyAuth, async (req, res) => {
  try {
    const {
      templates_id,
      services_id,
      shifts_id,
      statuses_id,
      search,
      key = "date",
      direction = "desc",
      date_start,
      date_end,
      step = 10,
      page = 1,
    } = req.body;

    let query = {};

    if (templates_id && templates_id.length > 0)
      query.template_id = { $in: templates_id };
    if (services_id && services_id.length > 0)
      query.service_id = { $in: services_id };
    if (shifts_id && shifts_id.length > 0) query.shift_id = { $in: shifts_id };
    if (statuses_id && statuses_id.length > 0)
      query["status.id"] = { $in: statuses_id };

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { "items.name": searchRegex },
        { "others.name": searchRegex },
      ];
    }

    if (date_start || date_end) {
      query.date = {};
      if (date_start) query.date.$gte = new Date(date_start);
      if (date_end) {
        const end = new Date(date_end);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    const skip = (page - 1) * step;
    const sortDirection = direction === "desc" ? -1 : 1;
    const sortOptions = key ? { [key]: sortDirection } : {};

    const [orders, totalRecords] = await Promise.all([
      Order.find(query).sort(sortOptions).skip(skip).limit(step),
      Order.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalRecords / step);

    res.status(201).json({
      message: "Solicitudes obtenidas con éxito",
      orders,
      start: totalRecords > 0 ? skip + 1 : 0,
      end: skip + orders.length,
      pages: totalPages,
      records: totalRecords,
      config: {
        key,
        direction,
      },
    });
  } catch (error) {
    console.error("🔴 Error al consultar pedidos:", error);
    res.status(500).json({ error: "Error interno al obtener los pedidos" });
  }
});

app.get("/api/order/:id", apiKeyAuth, async (req, res) => {
  const { id } = req.params;

  console.log("🚀 Pedido solicitado:", id);

  try {
    const order = await Order.findById(id).populate("status");

    console.log("🚀 Pedido encontrado:", order);

    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("🔴 Error al consultar pedido:", error);
    res.status(500).json({ error: "Error interno al obtener el pedido" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, process.env.JWT_API_KEY);
    req.admin = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

app.listen(port, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
});
