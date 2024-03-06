import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		shippingInfo: {
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			pincode: {
				type: Number,
				required: true,
			},
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		subtotal: {
			type: Number,
			required: true,
		},
		shippingCharges: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["Processing", "Shipped", "Delivered"],
			default: "Processing",
		},
        orderItems:[
            {
                name:String,
                image:String,
                price:Number,
                qunatity:Number,
                productId:{
                    type:mongoose.Types.ObjectId,
                    ref:"Product"
                }
            }
        ]
	},
	{ timestamps: true }
);


const Order = mongoose.model("Order",orderSchema);

export default Order


