import categoriesModel from "../models/categories.model.js";
import ProductModel from "../models/product.model.js";

export default {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoriesModel.find({});
      console.log("Categories from DB:", categories);

      res.status(200).json({
        message: "Categories fetched successfully",
        categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "eror fetching categories",
        error: error.message,
      });
    }
  },
  createCategory: async (req, res) => {
    try {
      const {
        category_name,
        category_description,
        category_image,
        status,
      } = req.body;
      const newCategory = new categoriesModel({
        category_name,
        category_description,
        category_image,
        status,
      });
      await newCategory.save();
      res.status(201).json({
        message: "Category created successfully",
        category: newCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error creating category",
        error: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("deleteCategory called with", id);
      const deletedCategory = await categoriesModel.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({
        message: "Category deleted successfully",
        category: deletedCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error deleting category",
        error: error.message,
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log("id", id, "and update data", updateData);

      const updatedCategory = await categoriesModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error updating category",
        error: error.message,
      });
    }
  },
};
