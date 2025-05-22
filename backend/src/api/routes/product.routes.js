import express from "express";
import { productController } from "../controllers/index.js";

const productRouter = express.Router();

// /api/v1/products
productRouter.route("/")
    .get(productController.getProducts)
    .post(productController.createProducts);

// /api/v1/products/id
productRouter
	.route("/:id")
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

export default productRouter;
