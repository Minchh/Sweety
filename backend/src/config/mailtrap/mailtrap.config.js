import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();

export const mailtrapConfig = {
	token: process.env.MAILTRAP_TOKEN,
	endpoint: process.env.MAILTRAP_ENDPOINT,
};

export const mailtrapClient = new MailtrapClient({
	token: mailtrapConfig.token,
});

export const sender = {
	email: "hello@sweety.bakery.io",
	name: "Sweety",
};
