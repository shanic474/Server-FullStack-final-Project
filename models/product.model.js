import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_category: { type: String },
  product_description: { type: String },
  product_image: { type: String },
  stock: { type: Number, default: 0 },
});

export default mongoose.model("Product", productSchema, "products");
