import express from "express";
import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";
const { createUser, tokenCreation, authlogin, adminAuth, verifyCookieToken } = authController;
const { getUser } = userController;



const router = express.Router();

router.post("/signup", createUser);
router.post("/userlogin", verifyCookieToken, authlogin, tokenCreation);
router.post("/dashboardlogin", authlogin, adminAuth, tokenCreation);
router.get("/verify-token", verifyCookieToken, adminAuth,getUser);
export default router;