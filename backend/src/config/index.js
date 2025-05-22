import { appConfig } from "./app.config.js";
import { dbConfig, connectDB } from "./db.config.js";
import { sendVerificationEmail, sendWelcomeEmail } from "./mailtrap/emails.js";

export {
	appConfig,
	dbConfig,
	sendVerificationEmail,
	sendWelcomeEmail,
	connectDB,
};
