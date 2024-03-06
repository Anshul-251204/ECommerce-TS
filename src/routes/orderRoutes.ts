import { Router } from "express";
import { newOrder } from "../controllers/orderController.js";
import auth from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").post(auth, newOrder);


export default router;