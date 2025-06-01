import express from "express";
import { verifyToken } from "../middlewares/index.js";
import { cartController } from "../controllers/index.js";

const cartRouter = express.Router();

cartRouter.route("/").get(verifyToken, cartController.getCartItems);

cartRouter.route("/:productId").post(verifyToken, cartController.addProductToCart);

cartRouter.route("/increase/:productId").post(verifyToken, cartController.increaseProductQuantity);

cartRouter.route("/decrease/:productId").post(verifyToken, cartController.decreaseProductQuantity);

cartRouter.route("/:cartItemId").delete(verifyToken, cartController.deleteProductFromCart);

export default cartRouter;
