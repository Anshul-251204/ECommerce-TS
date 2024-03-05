import { NextFunction, Request, Response } from "express";
import {
	AuthRequestType,
	ProductImageType,
	ProductRequestBody,
} from "../types/types.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js";
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

export const deleteProduct = asyncHandler(
	async (req: AuthRequestType, res: Response, next: NextFunction) => {
		const { productId } = req.params;

		const product = await Product.findByIdAndDelete(productId);

		product?.productImage.forEach(async (image) => {
			await deleteOnCloudinary(image.public_id);
		});

		res.status(200).json(
			new ApiResponse(null, "Your product successfully delete ! ")
		);
	}
);

export const latestProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const products = await Product.find().sort({ createdAt: -1 }).limit(10);

		res.status(200).json(new ApiResponse(products, "latest Products."));
	}
);

export const getCategory = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const categouries = await Product.distinct("category");

		res.status(200).json(
			new ApiResponse(categouries, "All Product categouries.")
		);
	}
);

export const getSingleProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { productId} = req.params;

		const product = await Product.findById(productId);

		res.status(200).json(
			new ApiResponse(product, "a Single Product.")
		)

	}

);
export const searchProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {}
);
