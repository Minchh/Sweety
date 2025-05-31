import express from "express";
import { productController } from "../controllers/index.js";
import { verifyToken } from "../middlewares/index.js";

const productRouter = express.Router();

// /api/v1/products
productRouter
    .route("/")
    .get(productController.getProducts)
    .post(verifyToken, productController.createProducts);

// /api/v1/products/id
productRouter
    .route("/:id")
    .get(productController.getProduct)
    .patch(verifyToken, productController.updateProduct)
    .delete(verifyToken, productController.deleteProduct);

export default productRouter;
