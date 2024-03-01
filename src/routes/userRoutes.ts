import express from "express";
import { login, logout, register } from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(register)
router.route("/login").post(login);
router.route("/logout").post(auth, logout);

export default router;
