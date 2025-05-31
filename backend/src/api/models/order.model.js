import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema(
    {
        orderNote: {
            type: String,
            required: false,
        },
        amount: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["pending", "placed", "shipped", "delivered"],
            required: true,
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
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cartItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CartItem",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
