import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types/types.js";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter Name"],
		},
		email: {
			type: String,
			unique: true,
			index: true, // Mark the email field for indexing
			required: [true, "Please enter Email"],
		},
		password: {
			type: String,
			trim: true,
			required: [true, "Please enter Password"],
		},
		avatar: {
			url: String,
			public_id: String,
		},
		role: {
			type: String,
			enum: ["user", "seller"],
			default: "user",
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			// required: [true, "Please enter Gender"],
		},
		dob: {
			type: Date,
			// required: [true, "Please enter Date of birth"],
		},
		refreshToken: {
			type: String,
			
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save",async function(next) {
	if(this.isModified("password")){
		this.password = await bcrypt.hash(this.password, 10);
	}
	next()
})
userSchema.methods.checkPassword = async function(password:string){
	return  bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY!
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY!
        }
    )
}

const User = mongoose.model<IUser & Document >("User", userSchema);

export default User