import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct, getAllProduct, getCategory, getSingleProduct, latestProduct } from "../controllers/productContorller.js";
import upload from "../middlewares/multerMiddleware.js";
import seller from "../middlewares/sellerMiddlerware.js";

const router = Router();

router.route("/").get(getAllProduct).post(seller, upload.array("images", 4), auth, addProduct);
router.route("/:productId").delete(seller,deleteProduct);
router.route("/categories").get(getCategory);
router.route("/latest-product").get(latestProduct);
router.route("/:productId").get(getSingleProduct);


export default router;
