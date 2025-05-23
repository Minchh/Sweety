import { generateVerificationToken } from "./generateVerificationToken.js";
import { generateTokenAndSetCookie } from "./generateTokenAndSetCookie.js";
import {
	sendVerificationEmail,
	sendWelcomeEmail,
	sendPasswordResetEmail,
	sendResetSuccessEmail,
} from "./email/emails.js";

export {
	generateTokenAndSetCookie,
	generateVerificationToken,
	sendVerificationEmail,
	sendWelcomeEmail,
	sendPasswordResetEmail,
	sendResetSuccessEmail,
};
