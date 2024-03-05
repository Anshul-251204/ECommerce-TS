import { NextFunction, Response } from "express";
import asyncHandle from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { AuthRequestType, ChangePasswordRequestBody, IUser, UserType,  } from "../types/types.js";

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
export const changePassword = asyncHandle(async(req:AuthRequestType, res:Response, next:NextFunction)=>{
	const { oldPassword, newPassword}:ChangePasswordRequestBody = req.body;

	if(!oldPassword || !newPassword) {
		return next(new ApiError(400, "All Fields are required !"));
	}

	const user:UserType = await User.findById(req?.user._id);

	const isMatch = await user?.checkPassword(oldPassword);

	if(!isMatch){
		return next(new ApiError(401, "Incorrect Password !"));
	}

	user.password = newPassword;

	await user?.save();

	res.status(200).json(
		new ApiResponse(null,"Your Password Change Sucessfully")
	)
})

export const changeEmail = asyncHandle(async(req:AuthRequestType, res:Response, next:NextFunction)=> {
	const { email } = req.body;

	if (!email) {
		return next(new ApiError(400, "Email Fields is required !"));
	}

	const user:any = await User.findById(req?.user._id);

	user.email = email;

	await user?.save();

	res.status(200).json(
		new ApiResponse(null, "Your Email Change Sucessfully")
	);
})
