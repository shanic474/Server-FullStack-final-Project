import ProductModel from "../models/product.model.js";
import "../models/category.model.js"; 


export default {
  getAllProducts: async (req, res) => {
    try {
      const { page = 1, limit = 4, filter = {}, sort = {} } = req.query;
      console.log(sort);
      let filterObject = {};
      if (filter) {
        if (typeof filter === "string") {
          try {
            filterObject = JSON.parse(filter);
          } catch {
            filterObject.product_category = filter;
          }
        } else {
          filterObject = filter; // object from frontend
        }
      }

      const sortObject = typeof sort === "string" ? JSON.parse(sort) : sort;
      console.log(sortObject);

      const skip = (page - 1) * limit;
      const total = await ProductModel.countDocuments(filterObject);

      const products = await ProductModel.find(filterObject)
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      // .populate("product_category");
      
      console.log("Products from DB:", products);

      res.status(200).json({
        message: "Products fetched successfully",
        products,
        total,
        page,
        limit,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "eror fetching products",
        error: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_name,
        product_price,
        product_category,
        product_description,
        product_image,
        stock,
        calories,
        carbs,
        protein,
        fat,
        minerals,
        vitamins,
        micronutrients,
      } = req.body;

      // Convert numeric fields explicitly to Number
      const newProduct = new ProductModel({
        product_name,
        product_price: Number(product_price),
        product_category,
        product_description,
        product_image,
        stock: Number(stock),
        calories: Number(calories),
        carbs: Number(carbs),
        protein: Number(protein),
        fat: Number(fat),
        minerals: Number(minerals),
        vitamins: Number(vitamins),
        micronutrients: Number(micronutrients),
      });
      console.log("Incoming category:", product_category);

      await newProduct.save();

      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error creating product",
        error: error.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("deleteProduct called with", id);
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error deleting product",
        error: error.message,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log("id", id, "and update data", updateData);

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true },
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error updating product",
        error: error.message,
      });
    }
  },
};
