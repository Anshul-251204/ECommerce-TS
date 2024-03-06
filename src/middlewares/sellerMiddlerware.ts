import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {  UserType } from "../types/types.js";

const seller = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { accessToken } = req.cookies;

		if (!accessToken) {
			return next(new ApiError(401, "UnAuthorized required !"));
		}

		const decodedToken: any = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET!
		);

		const user: UserType | null = await User.findById(decodedToken._id);

        if(user.role !== "seller"){
            return next(new ApiError(403, "This route is only accessable by Seller."))
        };

		req.user = user;
		next();
	}
);

export default seller;
