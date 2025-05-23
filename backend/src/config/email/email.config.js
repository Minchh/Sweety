import dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config();

export const emailConfig = {
	email: process.env.GOOGLE_EMAIL,
	appPassword: process.env.GOOGLE_APP_PASSWORD,
};

export const transporter = nodeMailer.createTransport({
	service: "gmail",
	host: "stmp.gmail.com",
	port: 587,
	auth: {
		user: emailConfig.email,
		pass: emailConfig.appPassword,
	},
});
