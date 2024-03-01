import { Request } from "express";
import mongoose from "mongoose";

export type RequestBodyType = {
	Fullname: string;
	email: string;
	password: string;
};

export type LoginRequestBody = {
	email: string;
	password: string;
};

export interface IUser extends Document {
	_id: any;
	name: string;
	email: string;
	password: string;
	avatar?: {
		urL: string;
		public_id: string;
	};
	role?: "user" | "seller";
	gender?: "male" | "female";
	dob?: Date;
	refreshToken: string;
	createdAt: Date;
	updatedAt: Date;
	checkPassword: (Password: string) => {};
	generateAccessToken: () => {};
	generateRefreshToken: () => {};
}

export type UserType = {
	_id: any;
	name: string;
	email: string;
	password: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
	__v: any;
	refreshToken: string;
};

export interface AuthRequestType extends Request {
	user: UserType | null;
}
