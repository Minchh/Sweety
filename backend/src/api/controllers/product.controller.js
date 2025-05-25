import mongoose, { mongo } from "mongoose";
import qs from "qs";
import { Product } from "../models/index.js";

/* CRUD - Product API */

function getFilteredQuery(query) {
    const schemaPath = Object.keys(Product.schema.paths);
    let filteredQuery = {};

    for (let key in query) {
        if (schemaPath.includes(key)) {
            filteredQuery[key] = query[key];
        }
    }
    filteredQuery = JSON.stringify(filteredQuery);
    filteredQuery = filteredQuery.replace(
        /\bgte|gt|lte|le\b/g,
        (match) => `$${match}`
    );
    filteredQuery = JSON.parse(filteredQuery);
    return filteredQuery;
}

// Get many products
export async function getProducts(req, res) {
    try {
        const query = qs.parse(req.query);

        // Filter
        const filteredQuery = getFilteredQuery(query);
        let mongoQuery = Product.find(filteredQuery);

        // Sort
        if (query.sort) {
            mongoQuery = mongoQuery.sort({ ...query.sort, _id: "asc" });
        } else {
            mongoQuery = mongoQuery.sort({ name: "asc", _id: "asc" });
        }

        // Paginate
        const page = +query.page || 1;
        const limit = +query.limit || 10;
        const skip = (page - 1) * limit;
        mongoQuery = mongoQuery.skip(skip).limit(limit);

        const products = await mongoQuery;

        res.status(200).json({
            code: 200,
            status: "success",
            length: products.length,
            data: {
                products,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Get single product by Id
export async function getProduct(req, res) {
    try {
        const productId = req.params.id;
        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: `Invalid product id`,
            });
            return;
        }

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: `No such product with id ${productId}`,
            });
            return;
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                product,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "success",
            message: err.message,
        });
    }
}

// Create new product(s)
export async function createProducts(req, res) {
    try {
        const isBodyArray = Array.isArray(req.body);
        const body = isBodyArray ? req.body : { ...req.body };
        const newProducts = await Product.create(body);

        if (!isBodyArray) {
            res.status(201).json({
                code: 201,
                status: "success",
                data: {
                    product: newProducts,
                },
            });
        } else {
            res.status(201).json({
                code: 201,
                status: "success",
                length: newProducts.length,
                data: {
                    product: newProducts,
                },
            });
        }
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Update product by Id
export async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Invalid product id",
            });
            return;
        }

        const body = { ...req.body };

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            body,
            { new: true }
        );
        if (!updatedProduct) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: `No such product with id ${productId}`,
            });
            return;
        }

        res.status(201).json({
            code: 201,
            status: "success",
            data: {
                product: updatedProduct,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Delete product by Id
export async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Invalid product id",
            });
            return;
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: `No such product with id ${productId}`,
            });
            return;
        }

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
}
