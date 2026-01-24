import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    category_description: String,
    category_image: String,
    status: { type: String, default: "Active" },
  },
  {
    collection: "categories", // 🔒 locked
  }
);

export default mongoose.model("Category", categorySchema);
