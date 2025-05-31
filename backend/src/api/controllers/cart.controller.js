import { CartItem, Product, User, Order } from "../models/index.js";

export const addProductToCart = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;

    try {
        const activeOrder = await Order.findOne({
            user: userId,
            orderStatus: "pending",
        }).populate("cartItems");

        if (!activeOrder) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Active order not found",
            });
            return;
        }

        if (activeOrder.cartItems.some((item) => item.product.toString() === productId)) {
            res.status(409).json({
                code: 409,
                status: "fail",
                message: "Product already exist in cart",
            });
            return;
        }

        const [product, user] = await Promise.all([Product.findById(productId), User.findById(userId)]);

        if (!product || !user) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Product or User not found",
            });
        }

        const savedCartItem = await CartItem.create({
            product: product._id,
            user: user._id,
            price: product.price,
            quantity: 1,
            order: activeOrder._id,
        });

        Object.assign(activeOrder, {
            totalAmount: activeOrder.totalAmount + product.price,
            amount: activeOrder.amount + product.price,
            cartItems: [...activeOrder.cartItems, savedCartItem],
        });

        await activeOrder.save();

        res.status(201).json({
            code: 201,
            status: "success",
            data: {
                cartItem: savedCartItem,
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
