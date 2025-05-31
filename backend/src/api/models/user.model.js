import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: (props) => `${props.value} is not a valid email!`,
            },
            required: [true, "User email required"],
            index: true,
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: function (v) {
                    return validator.isMobilePhone(v, "any", {
                        strictMode: false,
                    });
                },
                message: (props) =>
                    `${props.value} is not a valid phone number!`,
            },
            required: [true, "User phone number required"],
        },
        fullName: {
            type: String,
            trim: true,
            minlength: [2, "Full name must be at least 2 characters"],
            maxlength: [50, "Full name cannot exceed 50 characters"],
            required: [true, "User full name required"],
        },
        password: {
            type: String,
            required: [true, "User password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            validate: {
                validator: function (password) {
                    const hasUpper = /[A-Z]/.test(password);
                    const hasLower = /[a-z]/.test(password);
                    const hasNumber = /\d/.test(password);
                    const hasSpecial = /[^A-Za-z0-9]/.test(password);

                    return hasUpper && hasLower && hasNumber && hasSpecial;
                },
                message:
                    "Password must contain uppercase, lowercase, number, and special character",
            },
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
            required: [true, "User needs a role"],
        },
        address: {
            type: String,
            default: "",
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
