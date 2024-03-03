import { NextFunction, Response } from "express";
import {
	AuthRequestType,
	ProductImageType,
	ProductRequestBody,
} from "../types/types.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { MulterError } from "multer";
import Product from "../models/productModel.js";
import ApiResponse from "../utils/ApiResponse.js";

export const addProduct = asyncHandler(
	async (req: AuthRequestType, res: Response, next: NextFunction) => {
		const {
			name,
			price,
			quantity,
			category,
			description,
			highlight,
		}: ProductRequestBody = req.body;

		if (
			[name, price, quantity, category, description, highlight].some(
				(field: string | any): boolean => {
					return String(field).trim() === "";
				}
			)
		) {
			return next(new ApiError(400, "All field are Required !"));
		}

		const imagefiles = req.files as Express.Multer.File[];

		if (!imagefiles) {
			return next(new ApiError(400, "Product Images is Requires"));
		}
		if (Number(imagefiles.length) < 2) {
			return next(
				new ApiError(400, "Product image must 2 or more then 2")
			);
		}

		const imageArray: any[] = imagefiles.map(async (image) => {
			const uploadImage = await uploadOnCloudinary(image.path);

			return {
				url: uploadImage?.url,
				public_id: uploadImage?.public_id,
			};
		});

		const productImage = await Promise.all(imageArray);		

		const product = await Product.create({
			name,
			price,
			quantity,
			category,
			description,
			highlight,
			productImage,
			owner: req.user._id,
		});

		res.status(201).json(
			new ApiResponse(product, "Your product is successfully uploaded.")
		);
	}
);
