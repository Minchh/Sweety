import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema(
    {
        orderDescription: {
            type: String,
            required: false,
        },
        amount: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["pending", "placed", "shipped", "delivered"],
            required: true,
        },
        address: {
            type: String,
            default: "",
        },
        totalAmount: {
            type: Number,
            required: false,
        },
        discount: {
            type: Number,
            required: false,
        },
        trackingId: {
            type: String,
            default: () => uuidv4(),
            immutable: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            immutable: true,
        },
        cartItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CartItem",
                required: true,
            },
        ],
        placedTime: {
            type: Date,
        },
        totalQuantity: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
