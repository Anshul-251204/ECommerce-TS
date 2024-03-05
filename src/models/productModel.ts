import mongoose, { Document } from "mongoose";
import { IProduct } from "../types/types.js";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Product name is Required !"],
	},
	price: {
		type: Number,
		required: [true, "Product pricing is Required !"],
	},
	quantity: {
		type: Number,
		required: [true, "Product Quantity is Required !"],
	},
	category: {
		type: String,
		required: [true, "Product category is Required !"],
	},
	description: {
		type: String,
		required: [true, "Product description is Required !"],
	},
	highlight: {
		type: String,
	},
	productImage: [
		{
			url: {
				type: String,
				// required:[true,"Product image is Required !"]
			},
			public_id: {
				type: String,
			},
		},
	],
	owner: {
		type: String,
		required: [true, "Product owner is required"],
	},
});

const Product = mongoose.model<IProduct & Document>("Product",productSchema);

export default Product;
