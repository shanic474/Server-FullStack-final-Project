import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  shippment_address: {},
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "shipped", "deliverd", "cancelled"],
  },
  total_price: { type: Number, required: true },
  user_id: { ref: "Users", type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  items: [
    {
      product_id: {
        ref: "Products",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
    },
  ],
});
/** @type {import('mongoose').Model} */
export default mongoose.model("Orders", ordersSchema, "orders");
