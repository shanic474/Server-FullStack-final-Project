// product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // must match Category model
  product_description: { type: String },
  product_image: { type: String },
  stock: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  minerals: { type: Number, default: 0 },
  vitamins: { type: Number, default: 0 },
  micronutrients: { type: Number, default: 0 }
});

export default mongoose.model("Product", productSchema, "products");
