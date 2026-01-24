import mongoose from "mongoose";
import dotenv from "dotenv";

import "./models/category.model.js"; // 🔥 REQUIRED
import ProductModel from "./models/product.model.js";

dotenv.config();

async function testPopulate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");

  const product = await ProductModel
    .findOne({ product_name: "test1" })
    .populate("product_category");

  console.log({
    product: product.product_name,
    category: product.product_category?.category_name,
  });

  await mongoose.disconnect();
}

testPopulate();
