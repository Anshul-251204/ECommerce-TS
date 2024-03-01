import { NextFunction, Request, Response } from "express";
import asyncHandle from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import { accessTokenOptions, refreshTokenOptions } from "../constant.js";

//importing typesss here
import { LoginRequestBody } from "../types/types.js";

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

		res.status(201)
			.cookie("accessToken", accessToken, accessTokenOptions)
			.cookie("refreshToken", refreshToken, refreshTokenOptions)
			.json(new ApiResponse(user, "User is Register Successfully ."));
	}
);

export const login = asyncHandle(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password }: LoginRequestBody = req.body;

		if (!email || !password) {
			return next(new ApiError(400, "Email and Password are required !"));
		}

		if (!email.includes("@")) {
			return next(new ApiError(400, "Please enter a valid email !"));
		}

		const user = await User.findOne({ email }).select(
			" -refreshToken "
		);

		if (!user) {
			return next(new ApiError(403, "User not exists with this Email !"));
		}

		const isMatch = await user.checkPassword(password);

		if(!isMatch) {
			return next(new ApiError(400, "Invalid Password or Email !"));
		}

		const { accessToken, refreshToken } =
			await generateAccessAndRefreshToken(user);

		res.status(201)
			.cookie("accessToken", accessToken, accessTokenOptions)
			.cookie("refreshToken", refreshToken, refreshTokenOptions)
			.json(new ApiResponse(user, "User is Register Successfully ."));
	}
);

export const logout = asyncHandle(
	async (req: Request, res: Response, next: NextFunction) => {
		
		const cookieOption = accessTokenOptions;

		cookieOption.expires = new Date(Date.now());

		res.status(200)
		.clearCookie("accessToken",cookieOption)
		.clearCookie("refreshToken",cookieOption)
		.json(
			new ApiResponse(null,"User logout Successfully. ")
		);
	}
);
