import express from "express";
import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";
const { createUser, tokenCreation, authlogin, adminAuth, verifyCookieToken, googleLogin } = authController;
const { getUser } = userController;



const router = express.Router();

router.post("/signup", createUser, tokenCreation);
router.post("/userlogin", verifyCookieToken, authlogin, tokenCreation);
router.post("/dashboardlogin", authlogin, adminAuth, tokenCreation);
router.post("/google-login",googleLogin)
router.get("/verify-token", verifyCookieToken, adminAuth,getUser);
router.get("/client-verify-token", verifyCookieToken, getUser);

export default router;