const mongoose = require("mongoose");
const { materiales, servicios, estados } = require("../constants");

const pedidoSchema = new mongoose.Schema(
  {
    material: { type: String, required: true, enum: materiales },
    cantidad: { type: Number, required: true },
    urgente: { type: Boolean, default: false },
    usuario: {
      nombre: { type: String, required: true },
      dni: { type: String, required: true },
    },
    servicio: { type: String, required: true, enum: servicios, index: true },
    estado: {
      type: String,
      enum: estados,
      default: "Pendiente",
    },
    fecha: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("Pedido", pedidoSchema);
