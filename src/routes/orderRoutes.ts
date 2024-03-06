import { Router } from "express";
import { allOrderOfSeller, myOrder, newOrder } from "../controllers/orderController.js";
import auth from "../middlewares/authMiddleware.js";
import seller from "../middlewares/sellerMiddlerware.js";

const router = Router();

router.route("/").post(auth, newOrder);
router.route("/my-order").get(auth,myOrder);
router.route("/all").get(seller,allOrderOfSeller)


export default router;