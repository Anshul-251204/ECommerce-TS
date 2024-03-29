import { config } from "dotenv";
config({
    path:"./.env"
})
import { v2 as cloudinary } from "cloudinary";
import app from "./app.js";
import connectDB from "./db/connectDb.js";
import Stripe from "stripe";

const port = process.env.PORT || 5000
const stripeKey = process.env.STRIPE_KEY || "";
export const stripe = new Stripe(stripeKey);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("⚙️  server start at port", port);
        
    })
}).catch((error)=>
console.log("mongo db connection failed ->> ", error))


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

