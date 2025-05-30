import brcypt from "bcrypt";
import crypto from "crypto";

import { appConfig } from "../../config/index.js";
import { User, Order } from "../models/index.js";
import {
    generateTokenAndSetCookie,
    generateVerificationToken,
} from "../../utils/index.js";
import {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail,
} from "../../utils/index.js";

// Sign-up
export async function signup(req, res) {
    const { fullName, phoneNumber, email, password, confirmPassword } =
        req.body;

    try {
        if (
            !fullName ||
            !phoneNumber ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            throw new Error("All fields are required");
        }

        if (password !== confirmPassword) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Passwords do not match",
            });
            return;
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

        const newUser = await User.create({
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
        });

        await Order.create({
            amount: 0,
            totalAmount: 0,
            discount: 0,
            orderStatus: "pending",
            address: "Ho Chi Minh City",
            user: newUser,
        });

        // JWT
        generateTokenAndSetCookie(res, newUser._id);

        // Send verification email
        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({
            code: 201,
            status: "success",
            data: {
                user: {
                    ...newUser._doc,
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

// Verify email
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

        await sendWelcomeEmail(user.email, user.fullName);

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

// Sign-in
export async function signin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Email or password is incorrect",
            });
            return;
        }

        const isPasswordValid = await brcypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Email or password is incorrect",
            });
            return;
        }

        // Refresh a new JWT
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Logged in successfully",
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

// Sign-out
export async function signout(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        code: 200,
        status: "success",
        message: "Logged out successfully",
        data: null,
    });
}

// Forgot password
export async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "User not found",
            });
            return;
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpresAt;

        await user.save();

        // Send email
        await sendPasswordResetEmail(
            user.email,
            `${appConfig.clientURL}/password-reset/${resetToken}`
        );

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Password reset link sent to your email",
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Reset password
export async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Invalid or expired reset token",
            });
            return;
        }

        // Update password
        const hashedPassword = await brcypt.hash(newPassword, 12);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Password reset successful",
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Check authentication
export async function checkAuth(req, res) {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        console.log("Error in checkAuth ", err);
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}
