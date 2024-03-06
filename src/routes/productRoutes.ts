import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct, getAllProduct, getCategory, getSingleProduct, latestProduct } from "../controllers/productContorller.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/").get(getAllProduct).post(auth, upload.array("images", 4), auth, addProduct);
router.route("/:productId").delete(auth,deleteProduct);
router.route("/categories").get(getCategory);
router.route("/latest-product").get(latestProduct)
router.route("/:productId").get(getSingleProduct);


export default router;
