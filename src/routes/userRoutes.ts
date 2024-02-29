import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(register)
router.route("/login").post(register);

export default router;
