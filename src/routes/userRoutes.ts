import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import auth from "../middlewares/authMiddleware.js";
import { changeAvatar } from "../controllers/userController.js";
import upload from "../middlewares/multermiddleware.js";

const router = express.Router();

router.route("/").post(register)
router.route("/login").post(login);
router.route("/logout").post(auth, logout);
router.route("/avatar").put(upload.single("avatar"), auth, changeAvatar);

export default router;
