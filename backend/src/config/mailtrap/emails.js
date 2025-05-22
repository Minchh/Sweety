import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export async function sendVerificationEmail(email, verificationToken) {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "[Sweety] Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationCode}",
				verificationToken
			),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (err) {
		console.error(`Error sending 'verification email'`, err);
		throw new Error(`Error sending 'verification email': ${err}`);
	}
}

export async function sendWelcomeEmail(email, firstName, lastName) {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "585fc2fc-5ec0-4142-bade-c8095f4a886a",
			template_variables: {
				company_info_name: "Sweety",
				name: `${firstName} ${lastName}`,
			},
		});

		console.log("Welcome email sent successfully", response);
	} catch (err) {
		console.error(`Error sending 'welcome email'`, err);
		throw new Error(`Error sending 'welcome email': ${err}`);
	}
}

export async function sendPasswordResetEmail(email, resetURL) {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "[Sweety] Reset Password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
				"{resetURL}",
				resetURL
			),
			category: "Password Reset",
		});

		console.log("Reset password email sent successfully", response);
	} catch (err) {
		console.log("Error sending 'password reset email'", err);

		throw new Error(`Error sending 'password reset email': ${err}`);
	}
}

export async function sendResetSuccessEmail(email) {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log(
			"Reset password successfully email sent successfully",
			response
		);
	} catch (err) {
		console.log("Error sending 'Reset password successfully email'", err);

		throw new Error(
			`Error sending 'Reset password successfully email': ${err}`
		);
	}
}
