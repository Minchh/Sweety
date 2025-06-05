import express from "express";
import { productController } from "../controllers/index.js";
import { checkAdmin, verifyToken } from "../middlewares/index.js";

const productRouter = express.Router();

// /api/v1/products
productRouter
    .route("/")
    .get(productController.getProducts)
    // .post(verifyToken, checkAdmin, productController.createProducts);
    .post(verifyToken, checkAdmin, productController.createNewProductFromForm);

// /api/v1/products/id
productRouter
    .route("/:id")
    .get(productController.getProduct)
    .patch(verifyToken, checkAdmin, productController.updateProduct)
    .delete(verifyToken, checkAdmin, productController.deleteProduct);

export default productRouter;
