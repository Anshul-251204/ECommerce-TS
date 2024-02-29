import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";

const errorMiddleware = (
	err: ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	err.message = err.message ? err.message : "Something Went wrong";
    err.statusCode = err.statusCode ? err.statusCode : 500;

    res.status(err.statusCode).json({
        sucess:false,
        message:err.message,
    });

    next();
};


export default errorMiddleware;