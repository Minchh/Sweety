import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
    env: process.env.NODE_ENV || "development",
	port: process.env.PORT || 3000,
};
