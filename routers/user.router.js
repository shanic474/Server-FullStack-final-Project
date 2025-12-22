import express from "express";
import userController from "../controllers/user.controller.js";
import authController from "../controllers/auth.controller.js";
const { getAllUsers, deleteUser, updateUser } = userController;
const { verifyCookieToken } = authController;

const router = express.Router();

// user CRUD routes
router.get("/", getAllUsers);
// router.get("/getUser", getUser);
router.delete("/deleteuser/:id", deleteUser);
router.patch("/updateuser/:id",verifyCookieToken , updateUser);



export default router;