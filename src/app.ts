import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// app.use();


// IMPORTING ROUTERS -->>>>
import userRouter from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

app.use("/api/v1/users", userRouter);




export default app

app.use(errorMiddleware);