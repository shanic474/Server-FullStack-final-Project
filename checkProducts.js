import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/product.model.js";
import CategoryModel from "./models/category.model.js"; // Make sure this import exists!

dotenv.config();

async function checkProducts() {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 2️⃣ Ensure the Category model is registered
    mongoose.model("Category", CategoryModel.schema);

    // 3️⃣ Fetch products and populate the product_category
    const products = await ProductModel.find({}).populate("product_category");

    // 4️⃣ Log products with populated category names
    products.forEach((p) => {
      console.log(
        `${p.product_name} -> ${
          p.product_category ? p.product_category.category_name : "undefined"
        }`
      );
    });

    // 5️⃣ Disconnect
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error checking products:", err);
  }
}

checkProducts();
