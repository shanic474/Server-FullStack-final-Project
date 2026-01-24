import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/product.model.js";
import "./models/category.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const p = await ProductModel.findOne({ product_name: "test1" });
console.log("value:", p.product_category);
console.log("type:", typeof p.product_category);
console.log("isObjectId:", p.product_category instanceof mongoose.Types.ObjectId);

await mongoose.disconnect();
