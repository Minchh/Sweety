import brcypt from "bcrypt";

import { User } from "../models/index.js";
import {
	generateTokenAndSetCookie,
	generateVerificationToken,
} from "../../utils/index.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../../config/index.js";

export async function signup(req, res) {
	const { email, password, firstName, lastName } = req.body;

	try {
		if (!email || !password || !firstName || !lastName) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			res.status(400).json({
				code: 400,
				status: "fail",
				message: "User already exists",
			});
			return;
		}

		const hashedPassword = await brcypt.hash(password, 12);
		const verificationToken = generateVerificationToken();

		const user = await User.create({
			email: email,
			password: hashedPassword,
			firstName: firstName,
			lastName: lastName,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
		});

		// JWT
		generateTokenAndSetCookie(res, user._id);

		// Send verification email
		await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			code: 201,
			status: "success",
			data: {
				user: {
					...user._doc,
					password: undefined,
				},
			},
		});
	} catch (err) {
		res.status(500).json({
			code: 500,
			status: "error",
			message: err.message,
		});
	}
}

export async function verifyEmail(req, res) {
	// 6 digits code: 1 2 3 4 5 6
	const { code } = req.body;
    
	try {
		const user = await User.findOne({
            verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			res.status(400).json({
				code: 400,
				status: "fail",
				message: "Invalid or expired verification code",
			});
			return;
		}

        // Set isVerified to true, and "remove" token from user
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.firstName, user.lastName);

		res.status(200).json({
			code: 200,
			status: "success",
			message: "Email verified successfully",
			data: {
				user: {
					...user._doc,
					password: undefined,
				},
			},
		});
	} catch (err) {
		res.status(500).json({
			code: 500,
			status: "error",
			message: err.message,
		});
	}
}

export async function signin(req, res) {}

export async function signout(req, res) {}
