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

export const getCartItems = async (req, res) => {
    const userId = req.userId;

    try {
        const activeOrder = await Order.findOne({
            user: userId,
        }).populate({
            path: "cartItems",
            populate: {
                path: "product",
                model: "Product",
            },
        });

        if (!activeOrder) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Active order not found",
            });
            return;
        }

        const cartItems = activeOrder.cartItems.map((item) => {
            return {
                id: item._id,
                product: {
                    ...item.product._doc,
                },
                price: item.price,
                quantity: item.quantity,
            };
        });

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                ...activeOrder._doc,
                cartItems,
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

export const increaseProductQuantity = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;

    try {
        const activeOrder = await Order.findOne({ user: userId, orderStatus: "pending" });
        const product = await Product.findById(productId);

        if (!activeOrder || !product) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Active order or product not found",
            });
            return;
        }

        const cartItem = await CartItem.findOne({
            product: productId,
            order: activeOrder._id,
            user: userId,
        });

        if (!cartItem) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Cart item not found",
            });
            return;
        }

        activeOrder.amount += product.price;
        activeOrder.totalAmount += product.price;

        cartItem.quantity += 1;

        await activeOrder.save();
        await cartItem.save();

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                order: activeOrder,
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

export const decreaseProductQuantity = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;

    try {
        const activeOrder = await Order.findOne({ user: userId, orderStatus: "pending" });
        const product = await Product.findById(productId);

        if (!activeOrder || !product) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Active order or product not found",
            });
            return;
        }

        const cartItem = await CartItem.findOne({
            product: productId,
            order: activeOrder._id,
            user: userId,
        });

        if (!cartItem) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Cart item not found",
            });
            return;
        }

        if (cartItem.quantity === 1) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Cart item quantity cannot be decreased",
            });
            return;
        }

        activeOrder.amount -= product.price;
        activeOrder.totalAmount -= product.price;

        cartItem.quantity -= 1;

        await activeOrder.save();
        await cartItem.save();

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                order: activeOrder,
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

export const deleteProductFromCart = async (req, res) => {
    const userId = req.userId;
    const { cartItemId } = req.params;

    try {
        const activeOrder = await Order.findOne({ user: userId, orderStatus: "pending" });
        const cartItem = await CartItem.findById(cartItemId);

        if (!activeOrder || !cartItem) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Order or Cart Item not found",
            });
            return;
        }

        const index = activeOrder.cartItems.indexOf(cartItemId);
        if (index > -1) {
            activeOrder.cartItems.splice(index, 1);
            await CartItem.findByIdAndDelete(cartItemId);
        } else {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "Cart Item not found in Active Order",
            });
            return;
        }

        activeOrder.amount -= cartItem.price;
        activeOrder.totalAmount -= cartItem.price;

        await activeOrder.save();

        res.status(200).json({
            code: 200,
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
};
