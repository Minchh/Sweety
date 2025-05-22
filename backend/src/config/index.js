import { appConfig } from "./app.config.js";
import { dbConfig, connectDB } from "./db.config.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail } from "./mailtrap/emails.js";

export {
	appConfig,
	dbConfig,
	sendVerificationEmail,
	sendWelcomeEmail,
	sendPasswordResetEmail,
	connectDB,
};
