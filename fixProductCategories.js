import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/product.model.js";
import CategoryModel from "./models/category.model.js";

dotenv.config();

async function createTestProduct() {
  await mongoose.connect(process.env.MONGO_URI);

  const proteinCategory = await CategoryModel.findOne({ category_name: "Protein" });

  const product = new ProductModel({
    product_name: "Test Chicken Bowl",
    product_price: 9.99,
    product_category: proteinCategory._id, // Must be ObjectId
    product_description: "A test product",
    stock: 10,
  });

  await product.save();
  console.log("Product created!");

  await mongoose.disconnect();
}

createTestProduct();
