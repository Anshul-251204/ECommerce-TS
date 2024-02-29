import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

const asyncHandler = (passedFunction:any) => (req:Request, res:Response, next:NextFunction) => {
	Promise.resolve(passedFunction(req, res, next)).catch((err) => next(err));
};

export default asyncHandler;
