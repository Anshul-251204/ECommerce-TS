import { NextFunction, Request, Response } from "express";
import { AuthRequestType, OrderRequestBody } from "../types/types.js";
import asyncHandler from "../utils/AsyncHandler.js";
import Order from "../models/orderModel.js";
import reduceStock from "../utils/ReduceStock.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const newOrder = asyncHandler(
	async (req: AuthRequestType, res: Response, next: NextFunction) => {
		const {
			shippingInfo,
			orderItems,
			subtotal,
			shippingCharges,
			total,
		}: OrderRequestBody = req.body;

		if (
			!shippingInfo ||
			!orderItems ||
			!subtotal ||
			!shippingCharges ||
			!total
		) {
			return next(new ApiError(400, "All fields are required"));
		}

		const order = await Order.create({
			shippingInfo,
			orderItems,
			user:req.user._id,
			subtotal,
			shippingCharges,
			total,
		});

		await reduceStock(orderItems, next);

		res.status(200).json(
			new ApiResponse(order, "your products Ordered successfully")
		);
	}
);
export const myOrder = asyncHandler(
	async (req: AuthRequestType, res: Response, next: NextFunction) => {
		const { userId } = req.params;

		if(userId){
			return next(new ApiError(400, "UserID is required !"))
		}

		const orders = await Order.find({user: userId});

		res.status(200).json(
			new ApiResponse(orders, "You'r All Orders.")
		)
	}
);
