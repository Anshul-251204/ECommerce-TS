import { NextFunction, Request, Response } from "express";
import { stripe } from "../index.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const createPayment = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { amount } = req.params;

		const stripeInstance = await stripe.paymentIntents.create({
			amount: Number(amount) * 100,
			currency: "inr",
		});

		res.status(201).json({
			success: true,
			clientSecret: stripeInstance.client_secret,
		});
	}
);
