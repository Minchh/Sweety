import { Order, User } from "../models/index.js";

export const placeTheOrder = async (req, res) => {
    const userId = req.userId;

    try {
        const activeOrder = await Order.findOne({ user: userId, orderStatus: "pending" }).populate({
            path: "cartItems",
            populate: {
                path: "product",
                model: "Product",
            },
        });

        const user = await User.findById(userId);

        if (!activeOrder || !user) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Active order or User not found",
            });
            return;
        }

        activeOrder.address = user.address;
        activeOrder.orderStatus = "placed";
        activeOrder.placedTime = new Date();
        activeOrder.totalQuantity = activeOrder.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        await activeOrder.save();

        const newOrder = await Order.create({
            amount: 0,
            totalAmount: 0,
            discount: 0,
            orderStatus: "pending",
            address: "",
            user: user,
        });

        res.status(201).json({
            code: 201,
            status: "success",
            data: {
                activeOrder: activeOrder,
                newOrder: newOrder,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
};

export const getOrdersByUser = async (req, res) => {
    const userId = req.userId;

    try {
        const orders = await Order.find({
            user: userId,
            orderStatus: { $in: ["placed", "shipped", "delivered"] },
        }).populate({
            path: "cartItems",
            populate: {
                path: "product",
                model: "Product",
            },
        });

        if (orders.length < 0) {
            res.status(404).json({
                code: 404,
                status: "fail",
                data: "Orders not found",
            });
            return;
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                orders,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
};

// ADMIN
export const getAllOrdersFromUsers = async (req, res) => {
    try {
        const orders = await Order.find({})
            .sort("-placedTime -createdAt")
            .populate({
                path: "cartItems",
                populate: {
                    path: "product",
                    model: "Product",
                },
            });
        
        if (!orders) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "No orders found",
            });
            return;
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                orders,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
};
