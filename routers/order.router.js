import express from "express";
import orderController from "../controllers/order.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();
const { verifyAdminToken, verifyCookieToken } = authController;
const {
   getAllOrders,
  getAllUserOrders,
  createOrder,
  deleteOrder,
  updateOrder,
} = orderController;

router.get("/getAllOrders", verifyAdminToken, getAllOrders);
router.get("/getAllUserOrders/:id", getAllUserOrders);
router.post("/createOrder", createOrder);
router.delete("/deleteOrder/:id", verifyCookieToken, deleteOrder);
router.patch("/updateOrder/:id", verifyCookieToken, updateOrder);

export default router;
