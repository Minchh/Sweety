import express from "express";
import { verifyToken } from "../middlewares/index.js";
import { cartController } from "../controllers/index.js";

const cartRouter = express.Router();

cartRouter.route("/:productId").post(verifyToken, cartController.addProductToCart);

export default cartRouter;
