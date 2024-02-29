import { NextFunction, Request, Response } from "express";
import asyncHandle from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";

//importing typesss here

const generateAccessAndRefreshToken = async (user: any) => {
	const accessToken = await user.generateAccessToken();
	const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save();

	return { accessToken, refreshToken };
};

export const register = asyncHandle(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return next(new ApiError(400, "All Field is required !"));
		}

		if (!email.includes("@")) {
			return next(new ApiError(400, "Email is invalid !"));
		}

		const existUser = await User.findOne({ email });

		if (existUser) {
			return next(
				new ApiError(409, "User already exists With This Email !")
			);
		}

		const registerUser = await User.create({
			name,
			email,
			password,
		});

		const user = await User.findById(registerUser._id).select(
			"-password  -refreshToken"
		);

		const { accessToken, refreshToken } =
			await generateAccessAndRefreshToken(user);

		const accessTokenOptions = {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
		};
		const refreshTokenOptions = {
			maxAge: 15 + (24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: true,
		};

		res.status(201)
			.cookie("accessToken", accessToken, accessTokenOptions)
			.cookie("refreshToken", refreshToken, refreshTokenOptions)
			.json(new ApiResponse(user, "User is Register Successfully ."));
	}
);
