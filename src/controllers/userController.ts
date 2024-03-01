import { NextFunction, Response } from "express";
import asyncHandle from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { AuthRequestType,  } from "../types/types.js";

export const changeAvatar = asyncHandle(
	async (req: AuthRequestType, res: Response, next: NextFunction) => {
		const avatarFilePath = req?.file?.path;

		if (!avatarFilePath) {
			return next(
				new ApiError(400, "SomeThing wrong while upload file 🥲")
			);
		}

		const avatar: any = await uploadOnCloudinary(avatarFilePath!);

		if (!avatar) {
			return next(
				new ApiError(
					500,
					"Something went wrong in server while upload file"
				)
			);
		}

		const user = await User.findByIdAndUpdate(req.user._id, {
			avatar: {
				url: avatar.url,
				public_id: avatar.public_id,
			},
		});

		await user?.save();

		res.status(200).json(
			new ApiResponse(null, "Avatar is Changed Successfully 🫅")
		);
	}
);
