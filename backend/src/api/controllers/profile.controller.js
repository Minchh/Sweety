import { User } from "../models/index.js";

export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).select(
            "-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationTokenExpiresAt"
        );

        if (!user) {
            return res.status(404).json({
                code: 404,
                status: "fail",
                message: "User not found",
            });
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                userProfile: {
                    ...user._doc,
                },
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: false,
            message: "Internal server error",
        });
    }
};

export const updateUserProfile = async (req, res) => {
    const userId = req.userId;
    const { fullName, phoneNumber, address } = req.body;

    try {
        const updates = {};

        if (fullName) {
            updates.fullName = fullName;
        }

        if (phoneNumber) {
            updates.phoneNumber = phoneNumber;
        }

        if (address) {
            updates.address = address;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                code: 400,
                status: "fail",
                message: "No fields provided for update",
            });
        }

        // Check if phone number is already taken by another user
        if (updates.phoneNumber) {
            const existingUser = await User.findOne({
                phoneNumber: updates.phoneNumber,
                _id: { $ne: userId },
            });

            if (existingUser) {
                return res.status(409).json({
                    code: 409,
                    status: "fail",
                    message: "Phone number is already in use",
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        ).select(
            "-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationTokenExpiresAt"
        );

        if (!updatedUser) {
            return res.status(404).json({
                code: 404,
                status: "fail",
                message: "User not found",
            });
        }

        res.status(200).json({
            code: 200,
            success: true,
            message: "Profile updated successfully",
            data: {
                userProfile: {
                    ...updatedUser._doc,
                },
            },
        });
    } catch (err) {
        // Handle mongoose validation errors
        if (err.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                code: 400,
                status: "error",
                message: "Validation failed",
                errors: validationErrors,
            });
        }

        // Handle duplicate key error (phone number)
        if (err.code === 11000) {
            return res.status(409).json({
                code: 409,
                status: "error",
                message: "Phone number is already in use",
            });
        }

        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
};
