import express from "express";
import categoryController from "../controllers/category.controller.js";
import authController from "../controllers/auth.controller.js";
const { getAllCategories, deleteCategory, updateCategory } = categoryController;
const { verifyCookieToken,verifyAdminToken  } = authController;

const router = express.Router();

// category CRUD routes
router.get("/", getAllCategories);
router.delete("/deletecategory/:id",verifyAdminToken, deleteCategory);
router.patch("/updatecategory/:id",verifyCookieToken , updateCategory);
router.patch("/adminupdatecategory/:id" ,verifyAdminToken, updateCategory);



export default router;