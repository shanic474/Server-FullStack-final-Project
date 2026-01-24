import express from "express";
import productController from "../controllers/product.controller.js";
import authController from "../controllers/auth.controller.js"

const { getAllProducts, createProduct, deleteProduct, updateProduct } = productController;
const { verifyAdminToken  } = authController;

const router = express.Router();

// Sample product data  
router.get("/", getAllProducts);
router.post("/createProduct", verifyAdminToken, createProduct);
router.delete("/deleteProduct/:id",verifyAdminToken, deleteProduct);
router.patch("/updateProduct/:id",verifyAdminToken, updateProduct);


export default router;