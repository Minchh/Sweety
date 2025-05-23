import { transporter, emailConfig } from "../../config/index.js";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export async function sendVerificationEmail(email, verificationToken) {
	try {
		const info = await transporter.sendMail({
			from: emailConfig.email,
			to: email,
			subject: "[Sweety] Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationCode}",
				verificationToken
			),
		});

		console.log("Email sent successfully: ", info.messageId);
	} catch (err) {
		console.error(`Error sending 'verification email'`, err);
		throw new Error(`Error sending 'verification email': ${err}`);
	}
}

export async function sendWelcomeEmail(email, firstName, lastName) {
	try {
		const info = await transporter.sendMail({
			from: emailConfig.email,
			to: email,
			subject: "[Sweety] Welcome to Sweety",
			html: WELCOME_EMAIL_TEMPLATE.replace(
				"{firstName} {lastName}",
				`${firstName} ${lastName}`
			),
		});

		console.log("Welcome email sent successfully: ", info.messageId);
	} catch (err) {
		console.error(`Error sending 'welcome email'`, err);
		throw new Error(`Error sending 'welcome email': ${err}`);
	}
}

export async function sendPasswordResetEmail(email, resetURL) {
	try {
		const info = await transporter.sendMail({
			from: emailConfig.email,
			to: email,
			subject: "[Sweety] Reset Password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
				"{resetURL}",
				resetURL
			),
		});

		console.log("Reset password email sent successfully: ", info.messageId);
	} catch (err) {
		console.log("Error sending 'password reset email'", err);

		throw new Error(`Error sending 'password reset email': ${err}`);
	}
}

export async function sendResetSuccessEmail(email) {
	try {
		const info = await transporter.sendMail({
			from: emailConfig.email,
			to: email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		});

		console.log(
			"Reset password successfully email sent successfully: ",
			info.messageId
		);
	} catch (err) {
		console.log("Error sending 'Reset password successfully email'", err);

		throw new Error(
			`Error sending 'Reset password successfully email': ${err}`
		);
	}
}
