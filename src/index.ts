import { config } from "dotenv";
config({
    path:"./.env"
})
import app from "./app.js";
import connectDB from "./db/connectDb.js";

const port = process.env.PORT || 5000

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("⚙️  server start at port", port);
        
    })
}).catch((error)=>
console.log("mongo db connection failed ->> ", error))