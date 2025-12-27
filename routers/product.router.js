import express from "express";
import productController from "../controllers/product.controller.js";

const { getAllProducts, createProduct, deleteProduct, updateProduct } = productController;

const router = express.Router();

// Sample product data  
router.get("/", getAllProducts);
router.post("/createProduct", createProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.patch("/updateProduct/:id", updateProduct);


export default router;