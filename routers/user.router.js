import express from "express";
import userController from "../controllers/user.controller.js";
import authController from "../controllers/auth.controller.js";
const { getAllUsers, deleteUser, updateUser, createUser } = userController;
const { verifyCookieToken,verifyAdminToken  } = authController;

const router = express.Router();

// user CRUD routes
router.get("/", getAllUsers);
router.delete("/deleteuser/:id",verifyAdminToken, deleteUser);
router.patch("/updateuser/:id",verifyCookieToken , updateUser);
router.patch("/adminupdateuser/:id" ,verifyAdminToken, updateUser);
router.post("/createUser", verifyAdminToken, createUser);




export default router;