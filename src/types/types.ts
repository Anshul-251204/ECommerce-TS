import {  Request, } from "express";
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
		url: string | null;
		public_id: string | null;
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
	password?: string;
	avatar?:{
		url?:string,
		public_id?:string
	}
	role: string;
	createdAt: Date;
	updatedAt: Date;
	__v: any;
	refreshToken: string;
} | any;

export interface AuthRequestType extends Request {
	user:UserType;
}


export type ChangePasswordRequestBody = {
	oldPassword: string;
	newPassword: string;
};