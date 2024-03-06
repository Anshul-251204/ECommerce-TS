import { Router } from "express";
import { myOrder, newOrder } from "../controllers/orderController.js";
import auth from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").post(auth, newOrder);
router.route("/my-order").get(auth,myOrder);


export default router;