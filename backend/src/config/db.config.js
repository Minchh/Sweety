import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
	mongoURI: process.env.MONGO_URI || "",
};

export async function connectDB() {
	try {
		await mongoose.connect(dbConfig.mongoURI);
		console.log("✅ Successfully connected to MongoDB");
	} catch (err) {
		console.error("Error occured, cannot connect to MongoDB\n", err.message);
	}
};
