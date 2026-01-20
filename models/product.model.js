import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_category: { ref: "Categories", type: mongoose.Schema.Types.ObjectId },
  product_description: { type: String },
  product_image: { type: String },
  stock: { type: Number, default: 0 },
  calories: { type: Number, default: null },
  carbs: { type: Number, default: null },
  protein: { type: Number, default: null },
  fat: { type: Number, default: null },
  minerals: { type: Map, of: Number, default: {} },
  vitamins: { type: Map, of: Number, default: {} },
  micronutrients: { type: Map, of: Number, default: {} }

});

export default mongoose.model("Product", productSchema, "products");
