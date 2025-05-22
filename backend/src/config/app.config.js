import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
    env: process.env.NODE_ENV || "development",
	port: process.env.PORT || 3000,
    secret: process.env.SECRET || "<put_your_secret_key_in_dot_env>",
};
