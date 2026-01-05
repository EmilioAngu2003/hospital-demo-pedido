const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema({
  template_id: { type: String, required: true },
  template_name: String,
  service_id: { type: String, required: true },
  service_name: String,
  shift_id: { type: String, required: true },
  shift_name: String,
  items: [ItemSchema],
  others: [ItemSchema],
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Pendiente" },
});

module.exports = mongoose.model("Order", OrderSchema);
