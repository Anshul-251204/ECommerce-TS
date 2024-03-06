import { NextFunction } from "express";
import Product from "../models/productModel.js";
import { OrderItemsType } from "../types/types.js";
import ApiError from "./ApiError.js";

const reduceStock = (orderItems: OrderItemsType[], next:NextFunction) =>{
    orderItems.forEach(async function(item:OrderItemsType){
        const product:any = await Product.findById(item.productId);

        if(product) {
            return next(new ApiError(400, "Product not found"));
        }

        product.quantity -= Number(item.quantity);
        product.save();
    
    })
}

export default reduceStock;