import mongoose from "mongoose";

async function connectDB() {
	try {
		const { connection } = await mongoose.connect(process.env.MONGO_URI!);
		console.log("mongo db is connected on host ->> ", connection.host);
	} catch (error) {
		console.log("mongo db connection failed ->> ", error);
	}
}

export default connectDB
