import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct, getCategory } from "../controllers/productContorller.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/").post(auth, upload.array("images", 4), auth, addProduct);
router.route("/").delete(auth,deleteProduct);
router.route("/categories").get(getCategory);


export default router;
