import Category from "../models/category.model.js";

export default {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).json({
        message: "Categories fetched successfully",
        categories,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json({
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        message: "Category deleted successfully",
        category,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
