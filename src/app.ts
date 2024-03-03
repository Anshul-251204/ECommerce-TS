import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// app.use();


app.get("/health-check",(req,res)=>res.send("Working fine ⚙️🔥"))

// IMPORTING ROUTERS -->>>>
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";


app.use("/api/v1/users", userRouter);
app.use("/api/v1/products",productRouter);




export default app

app.use(errorMiddleware);