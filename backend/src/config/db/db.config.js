import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
	mongodbURI: process.env.MONGODB_URI || "",
};

export async function connectDB() {
	try {
		await mongoose.connect(dbConfig.mongodbURI);
		console.log("✅ Successfully connected to MongoDB");
	} catch (err) {
		console.error("Error occured, cannot connect to MongoDB\n", err.message);
		process.exit(-1);
	}
};
