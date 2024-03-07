import { Router } from "express";
import { allOrderOfSeller, changeStatus, myOrder, newOrder } from "../controllers/orderController.js";
import auth from "../middlewares/authMiddleware.js";
import seller from "../middlewares/sellerMiddlerware.js";
import { createPayment } from "../controllers/paymentController.js";

const router = Router();

router.route("/").post(auth, newOrder);
router.route("/my-order").get(auth,myOrder);
router.route("/all").get(seller,allOrderOfSeller);
router.route('/status/:orderId').put(seller,changeStatus);
router.route("/payment/:amount").post(auth,createPayment);

export default router;