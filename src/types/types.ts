import { Request } from "express";
import mongoose from "mongoose";

// REQUREST BODY TYPES //

export type UserRequestBody = {
	name: string;
	email: string;
	password: string;
};

export type LoginRequestBody = {
	email: string;
	password: string;
};

export type ChangePasswordRequestBody = {
	oldPassword: string;
	newPassword: string;
};

export type ProductRequestBody = {
	name: string;
	price: number;
	quantity: number;
	category: string;
	description: string;
	highlight: string;
};

// HELPER TYPES

export type Image = {
	url: string;
	public_id: string;
};

export type UserType =
	| {
			_id: any;
			name: string;
			email: string;
			password?: string;
			avatar?: {
				url?: string;
				public_id?: string;
			};
			role: string;
			createdAt: Date;
			updatedAt: Date;
			__v: any;
			refreshToken: string;
	  }
	| any;

export type ProductImageType = {
	url: string | undefined;
	public_id: string | undefined;
};

export interface AuthRequestType extends Request {
	user: UserType;
}

//  MONGOOSE MODEL INTERFACE //

export interface IUser extends Document {
	_id: any;
	name: string;
	email: string;
	password: string;
	avatar?: Image;
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

export interface IProduct extends Document{
	name: string;
	price: number;
	quantity: number;
	category: string;
	description: string;
	highlight: string;
	productImage: Image[];
	owner: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
	__v: any;
}

export interface IOrder {

}

// REQUEST TYPES //

export type SearchProductQuery = {
	search?: string;
	category?: string;
	price?: string;
	sort?: number | string;
	page?: string;
};

export type BaseQuerySearchProduct = {
	search?: {
		$regex: string;
		$option: string;
	};
	price?: {
		$lte: number;
	};
	category?: string;
};

export type OrderItemsType ={
	name:string;
	image:string;
	price:number;
	quantity:number;
	productId:string;
}
export type ShippingInfoType = {
	address:string;
	city:string;
	state:string;
	pincode:Number;
}
export type OrderRequestBody = {
	shippingInfo: ShippingInfoType;
	user: any;
	subtotal: number;
	shippingCharges: number;
	total: number;
	orderItems: OrderItemsType[];
	status:"Processing" | "Shipped" | "Delivered"
};
