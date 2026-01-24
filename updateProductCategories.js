import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/product.model.js";
import CategoryModel from "./models/category.model.js";

dotenv.config();

async function updateProductCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get all categories
    const categories = await CategoryModel.find({});
    console.log("Categories in DB:", categories.map(c => c.category_name));

    // Map category names to their ObjectIds
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.category_name] = cat._id; // ← THIS IS THE KEY PART
    });

    // Get all products
    const products = await ProductModel.find({});
    console.log("Products found:", products.length);

    // Update products
    for (const product of products) {
      let catName;
      const name = product.product_name.toLowerCase();

      if (name.includes("chicken") || name.includes("salmon") || name.includes("protein")) {
        catName = "Protein";
      } else if (name.includes("rice") || name.includes("quinoa") || name.includes("carb")) {
        catName = "Carbs";
      } else if (name.includes("yogurt") || name.includes("berry") || name.includes("vitamin")) {
        catName = "Vitamins";
      } else {
        catName = "Protein"; // default
      }

      const catId = categoryMap[catName]; // ← USE THE ObjectId, NOT STRING
      if (catId) {
        await ProductModel.findByIdAndUpdate(product._id, {
          product_category: catId, // ← THIS MUST BE ObjectId
        });
        console.log(`Updated ${product.product_name} -> ${catName}`);
      }
    }

    console.log("All products updated!");
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

updateProductCategories();
